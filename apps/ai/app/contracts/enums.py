"""Validation enums shared by internal AI boundary models."""

from typing import Literal

IncidentSeverity = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]

CapabilityName = Literal[
    "SERVICE_TOPOLOGY",
    "METRICS",
    "LOG_SEARCH",
    "TRACE_SEARCH",
    "DEPLOYMENTS",
    "CHANGE_HISTORY",
    "RUNTIME_STATE",
    "ALERTS",
    "INCIDENT_HISTORY",
    "RUNBOOKS",
    "AI_REASONING",
    "REMEDIATION_AUTOMATION",
]

TechnicalRisk = Literal["LOW", "MEDIUM", "HIGH"]

CapabilityStatus = Literal["AVAILABLE", "PARTIAL", "STALE", "UNAVAILABLE", "FAILED"]

HypothesisStatus = Literal[
    "CANDIDATE", "PLAUSIBLE", "LEADING", "WEAKENED", "INVALIDATED", "CONFIRMED"
]

EvidenceSourceType = Literal[
    "METRIC",
    "LOG",
    "TRACE",
    "DEPLOYMENT",
    "CHANGE",
    "RUNTIME_STATE",
    "ALERT",
    "TOPOLOGY",
    "INCIDENT_HISTORY",
    "RUNBOOK",
    "HUMAN_OBSERVATION",
]

ContradictionSeverity = Literal["WEAK", "MODERATE", "STRONG", "INVALIDATING"]

IntegrityLevel = Literal["HIGH", "MODERATE", "DEGRADED", "LOW"]

RecommendationActionType = Literal[
    "ROLLBACK",
    "RESTART_SERVICE",
    "TRAFFIC_SHIFT",
    "MANUAL_PROCEDURE",
    "NO_ACTION",
]
