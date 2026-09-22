"""Mirror the shared internal AI request and result contracts."""

from typing import Literal

from app.contracts.base import (
    BoundaryModel,
    DateTime,
    HypothesisReference,
    Id,
    NonEmptyString,
    Score,
)
from app.contracts.enums import (
    CapabilityName,
    CapabilityStatus,
    IncidentSeverity,
    RecommendationActionType,
    TechnicalRisk,
)


class IncidentInput(BoundaryModel):
    id: Id
    title: str
    description: str | None
    severity: IncidentSeverity


class ServiceInput(BoundaryModel):
    id: Id
    name: str
    environment: str
    current_version: str | None


class CapabilityState(BoundaryModel):
    capability: CapabilityName
    status: CapabilityStatus
    freshness: Score | None
    reason: str | None
    updated_at: DateTime


class StartAIInvestigationRequest(BoundaryModel):
    investigation_id: Id
    incident: IncidentInput
    service: ServiceInput
    capability_states: list[CapabilityState]


class AIHypothesisProposal(BoundaryModel):
    reference: HypothesisReference
    statement: NonEmptyString


class AIEvidenceInterpretation(BoundaryModel):
    evidence_id: Id
    hypothesis_reference: HypothesisReference
    relation: Literal["SUPPORTS", "CONTRADICTS", "NEUTRAL"]
    reasoning: NonEmptyString


class AIRecommendationProposal(BoundaryModel):
    action_type: RecommendationActionType
    summary: NonEmptyString
    reasoning: NonEmptyString
    technical_risk: TechnicalRisk
    supporting_evidence_ids: list[Id]
    contradicting_evidence_ids: list[Id]


class AIInvestigationResult(BoundaryModel):
    investigation_id: Id
    status: Literal["COMPLETED", "DEGRADED", "FAILED"]
    hypothesis_proposals: list[AIHypothesisProposal]
    evidence_interpretations: list[AIEvidenceInterpretation]
    recommendation_proposal: AIRecommendationProposal | None
    error: str | None
