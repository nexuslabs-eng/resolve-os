"""Tests for the AI service health endpoint."""

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


def test_health_returns_ok() -> None:
    settings = Settings(
        _env_file=None,
        app_env="test",
        docs_enabled=False,
    )

    with TestClient(create_app(settings)) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.parametrize("enabled", [True, False])
def test_documentation_follows_configuration(enabled: bool) -> None:
    settings = Settings(
        _env_file=None,
        app_env="test",
        docs_enabled=enabled,
    )

    with TestClient(create_app(settings)) as client:
        docs_response = client.get("/docs")
        schema_response = client.get("/openapi.json")

    expected_status = 200 if enabled else 404
    assert docs_response.status_code == expected_status
    assert schema_response.status_code == expected_status
