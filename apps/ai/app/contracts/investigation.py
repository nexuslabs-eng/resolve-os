"""Mirror packages/contracts/src/interrnal-ai and its dependent schemas."""

from typing import Literal

from app.contracts.base import (
    BoundaryModel,
    Count,
    DateTime,
    DegradationLevel,
    EvidenceReference,
    HypothesisReference,
    Id,
    Rank,
    Score,
)
from app.contracts.enums import (
    CapabilityName,
    CapabilityStatus,
    ContradictionSeverity,
    EvidenceQuality,
    EvidenceRelationType,
    EvidenceSourceType,
    HypothesisStatus,
    IncidentSeverity,
    IntegrityLevel,
    RecommendationActionType,
)

TechnicalRisk = Literal["LOW", "MEDIUM", "HIGH"]


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


class Hypothesis(BoundaryModel):
    id: Id
    reference: HypothesisReference
    investigation_id: Id
    statement: str
    status: HypothesisStatus
    support_strength: Score
    contradiction_pressure: Score
    evidence_quality: EvidenceQuality
    independent_evidence_groups: Count
    unresolved_contradictions: Count
    rank: Rank
    created_at: DateTime
    updated_at: DateTime


class EvidenceProvenance(BoundaryModel):
    tool: str | None
    reference: str | None
    captured_at: DateTime


class Evidence(BoundaryModel):
    id: Id
    reference: EvidenceReference
    investigation_id: Id
    source: str
    source_type: EvidenceSourceType
    observation: str
    reliability: Score
    specificity: Score
    directness: Score
    freshness: Score
    temporal_relevance: Score
    independence_group: str
    provenance: EvidenceProvenance
    created_at: DateTime


class EvidenceHypothesisRelation(BoundaryModel):
    id: Id
    evidence_id: Id
    hypothesis_id: Id
    relation: EvidenceRelationType
    contradiction_severity: ContradictionSeverity | None
    weight: Score
    reasoning: str


class InvestigationIntegrity(BoundaryModel):
    level: IntegrityLevel
    evidence_coverage: Score
    available_sources: Count
    degraded_sources: Count
    unavailable_sources: Count
    independent_evidence_groups: Count
    unresolved_contradictions: Count
    degradation_level: DegradationLevel
    reasons: list[str]


class AIRecommendation(BoundaryModel):
    action_type: RecommendationActionType
    summary: str
    reasoning: str
    technical_risk: TechnicalRisk
    supporting_evidence_ids: list[Id]
    contradicting_evidence_ids: list[Id]
    investigation_integrity: IntegrityLevel


class AIInvestigationResult(BoundaryModel):
    investigation_id: Id
    status: Literal["COMPLETED", "DEGRADED", "FAILED"]
    hypotheses: list[Hypothesis]
    evidence: list[Evidence]
    relations: list[EvidenceHypothesisRelation]
    integrity: InvestigationIntegrity
    leading_hypothesis_id: Id | None
    recommendation: AIRecommendation | None
    error: str | None
