"""Validation enums shared by internal AI boundary models."""

from typing import Literal

IncidentSeverity = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]

CapabilityName = Literal[
    "SERVICE_HEALTH",
    "DEPLOYMENTS",
    "LOG_SEARCH",
    "METRICS",
    "INCIDENT_HISTORY",
    "RUNBOOKS",
    "AI_REASONING",
    "REMEDIATION_AUTOMATION",
]

CapabilityStatus = Literal["AVAILABLE", "PARTIAL", "STALE", "UNAVAILABLE", "FAILED"]

HypothesisStatus = Literal[
    "CANDIDATE", "PLAUSIBLE", "LEADING", "WEAKENED", "INVALIDATED", "CONFIRMED"
]

EvidenceQuality = Literal["LOW", "MODERATE", "HIGH"]

EvidenceSourceType = Literal[
    "METRIC",
    "LOG",
    "DEPLOYMENT",
    "SERVICE_HEALTH",
    "INCIDENT_HISTORY",
    "RUNBOOK",
    "HUMAN_OBSERVATION",
]

EvidenceRelationType = Literal["SUPPORTS", "CONTRADICTS", "NEUTRAL", "INVALIDATES"]

ContradictionSeverity = Literal["WEAK", "MODERATE", "STRONG", "INVALIDATING"]

IntegrityLevel = Literal["HIGH", "MODERATE", "DEGRADED", "LOW"]

RecommendationActionType = Literal[
    "ROLLBACK",
    "RESTART_SERVICE",
    "TRAFFIC_SHIFT",
    "MANUAL_PROCEDURE",
    "NO_ACTION",
]
