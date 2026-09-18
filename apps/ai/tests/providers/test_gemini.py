"""Deterministic tests that never contact Gemini."""

import asyncio
from types import SimpleNamespace
from unittest.mock import AsyncMock

import httpx
import pytest
from google.genai import errors

from app.core.config import Settings
from app.core.exceptions import ProviderConfigurationError, ProviderError
from app.providers.gemini import GeminiProvider, open_gemini_provider


def make_client(
    text: str | None = "OK",
    error: Exception | None = None,
) -> SimpleNamespace:
    generate = AsyncMock(
        return_value=SimpleNamespace(text=text),
        side_effect=error,
    )
    return SimpleNamespace(
        models=SimpleNamespace(generate_content=generate),
        aclose=AsyncMock(),
    )


def test_generate_uses_configured_model_and_extracts_text() -> None:
    client = make_client(text="  OK\n")
    provider = GeminiProvider(client, "test-model")

    result = asyncio.run(provider.generate("Hello"))

    assert result == "OK"
    client.models.generate_content.assert_awaited_once_with(
        model="test-model",
        contents="Hello",
    )


@pytest.mark.parametrize("text", [None, "", " \n"])
def test_empty_response_is_rejected(text: str | None) -> None:
    provider = GeminiProvider(make_client(text=text), "test-model")

    with pytest.raises(ProviderError) as error:
        asyncio.run(provider.generate("Hello"))

    assert error.value.kind == "response"


@pytest.mark.parametrize(
    ("status", "kind"),
    [
        (401, "authentication"),
        (403, "authentication"),
        (429, "rate_limit"),
        (504, "timeout"),
        (503, "unavailable"),
        (404, "request"),
    ],
)
def test_api_failures_are_translated(status: int, kind: str) -> None:
    sdk_error = errors.APIError(
        status,
        {"error": {"message": "Provider-specific detail"}},
    )
    provider = GeminiProvider(
        make_client(error=sdk_error),
        "test-model",
    )

    with pytest.raises(ProviderError) as error:
        asyncio.run(provider.generate("Hello"))

    assert error.value.kind == kind
    assert "Provider-specific detail" not in str(error.value)


@pytest.mark.parametrize(
    ("failure", "kind"),
    [
        (httpx.ReadTimeout("timeout"), "timeout"),
        (httpx.ConnectError("network"), "network"),
        (RuntimeError("unexpected"), "internal"),
    ],
)
def test_transport_and_internal_failures(
    failure: Exception,
    kind: str,
) -> None:
    provider = GeminiProvider(make_client(error=failure), "test-model")

    with pytest.raises(ProviderError) as error:
        asyncio.run(provider.generate("Hello"))

    assert error.value.kind == kind


def test_blank_prompt_does_not_call_sdk() -> None:
    client = make_client()
    provider = GeminiProvider(client, "test-model")

    with pytest.raises(ValueError):
        asyncio.run(provider.generate(" "))

    client.models.generate_content.assert_not_awaited()


@pytest.mark.parametrize(
    ("key", "model"),
    [
        (None, "test-model"),
        (" ", "test-model"),
        ("fake-key", ""),
    ],
)
def test_missing_configuration_fails_before_client_creation(
    monkeypatch: pytest.MonkeyPatch,
    key: str | None,
    model: str,
) -> None:
    def unexpected_client(**kwargs: object) -> None:
        pytest.fail("SDK client should not be created")

    monkeypatch.setattr(
        "app.providers.gemini.genai.Client",
        unexpected_client,
    )
    settings = Settings(
        _env_file=None,
        gemini_api_key=key,
        gemini_model=model,
        gemini_timeout_seconds=60,
    )

    async def run() -> None:
        async with open_gemini_provider(settings):
            pytest.fail("Provider should not open")

    with pytest.raises(ProviderConfigurationError):
        asyncio.run(run())


def test_factory_configures_and_closes_client_on_failure(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    client = make_client(error=httpx.ConnectError("network"))
    captured = {}

    def create_client(**kwargs: object) -> SimpleNamespace:
        captured.update(kwargs)
        return SimpleNamespace(aio=client)

    monkeypatch.setattr(
        "app.providers.gemini.genai.Client",
        create_client,
    )
    settings = Settings(
        _env_file=None,
        gemini_api_key="fake-key",
        gemini_model="configured-model",
        gemini_timeout_seconds=10,
    )

    async def run() -> None:
        async with open_gemini_provider(settings) as provider:
            await provider.generate("Hello")

    with pytest.raises(ProviderError):
        asyncio.run(run())

    assert captured["api_key"] == "fake-key"
    assert captured["http_options"].timeout == 10_000
    assert captured["http_options"].retry_options.attempts == 1
    client.models.generate_content.assert_awaited_once_with(
        model="configured-model",
        contents="Hello",
    )
    client.aclose.assert_awaited_once()
