"""Contract fixtures checked independently by Python and TypeScript."""

import json
from copy import deepcopy
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.contracts.investigation import (
    AIInvestigationResult,
    StartAIInvestigationRequest,
)
from app.core.config import Settings
from app.main import create_app

REPO_ROOT = Path(__file__).resolve().parents[4]
FIXTURES = REPO_ROOT / "packages/contracts/fixtures/internal-ai"
BOUNDARY = json.loads((FIXTURES / "boundary.json").read_text(encoding="utf-8"))
INVALID = json.loads((FIXTURES / "invalid.json").read_text(encoding="utf8"))
MODELS = {"request": StartAIInvestigationRequest, "result": AIInvestigationResult}


@pytest.mark.parametrize("name", ["request", "result"])
def test_shared_fixture_round_trip(name: str) -> None:
    model = MODELS[name].model_validate(BOUNDARY[name])

    assert model.model_dump(mode="json", by_alias=True) == BOUNDARY[name]


@pytest.mark.parametrize("case", INVALID)
def test_shared_invalid_cases(case: dict) -> None:
    value = deepcopy(BOUNDARY[case["model"]])
    parent = value
    for segment in case["path"][:-1]:
        parent = parent[segment]

    key = case["path"][-1]

    if case.get("remove"):
        del parent[key]
    else:
        parent[key] = case["value"]

    with pytest.raises(ValidationError):
        MODELS[case["model"]].model_validate(value)


def test_snake_case_cannot_replace_required_json_name() -> None:
    value = deepcopy(BOUNDARY["request"])
    value["investigation_id"] = value.pop("investigationId")

    with pytest.raises(ValidationError):
        StartAIInvestigationRequest.model_validate(value)


def test_unknown_properties_are_stripped() -> None:
    value = deepcopy(BOUNDARY["request"])
    value["unexpected"] = "ignored"

    model = StartAIInvestigationRequest.model_validate(value)

    assert model.model_dump(mode="json") == BOUNDARY["request"]


def test_reference_whitespace_is_trimmed() -> None:
    value = deepcopy(BOUNDARY["result"])
    value["hypotheses"][0]["reference"] = " H1 "
    value["evidence"][0]["reference"] = " EV-1 "

    model = AIInvestigationResult.model_validate(value)

    assert model.hypotheses[0].reference == "H1"
    assert model.evidence[0].reference == "EV-1"


def test_endpoint_returns_deterministic_scaffold_result() -> None:
    settings = Settings(_env_file=None, app_env="test", docs_enabled=False)

    with TestClient(create_app(settings)) as client:
        first = client.post("/investigations/run", json=BOUNDARY["request"])
        second = client.post("/investigations/run", json=BOUNDARY["request"])

    assert first.status_code == 200
    assert first.json() == second.json()

    result = AIInvestigationResult.model_validate(first.json())
    assert result.investigation_id == BOUNDARY["request"]["investigationId"]
    assert result.status == "FAILED"
    assert result.hypotheses == []
    assert result.evidence == []
    assert result.relations == []
    assert result.recommendation is None
    assert result.error == "Investigation execution is not implemented."


def test_endpoint_rejects_invalid_request() -> None:
    settings = Settings(_env_file=None, app_env="test", docs_enabled=False)
    value = deepcopy(BOUNDARY["request"])
    del value["incident"]["description"]

    with TestClient(create_app(settings)) as client:
        response = client.post("/investigations/run", json=value)

    assert response.status_code == 422
