"""Scaffold endpoint proving the investigation HTTP boundary."""

from fastapi import APIRouter

from app.contracts.investigation import (
    AIInvestigationResult,
    StartAIInvestigationRequest,
)

router = APIRouter()


def build_scaffold_result(
    request: StartAIInvestigationRequest,
) -> AIInvestigationResult:
    return AIInvestigationResult.model_validate(
        {
            "investigationId": request.investigation_id,
            "status": "FAILED",
            "hypothesisProposals": [],
            "evidenceInterpretations": [],
            "recommendationProposal": None,
            "error": "Investigation execution is not implemented.",
        }
    )


@router.post(
    "/investigations/run",
    response_model=AIInvestigationResult,
    response_model_by_alias=True,
)
async def run_investigation(
    request: StartAIInvestigationRequest,
) -> AIInvestigationResult:
    return build_scaffold_result(request)
