import { z } from "zod";

export const RoleSchema = z.enum(["OBSERVER", "ENGINEER", "INCIDENT_COMMANDER", "ADMIN"]);

export const IncidentSeveritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const IncidentStatusSchema = z.enum([
    "DETECTED",
    "ACKNOWLEDGED",
    "INVESTIGATING",
    "MITIGATING",
    "MONITORING",
    "RESOLVED"
]);

export const InvestigationStatusSchema = z.enum([
    "PENDING",
    "RUNNING",
    "COMPLETED",
    "DEGRADED",
    "FAILED"
]);

export const HypothesisStatusSchema = z.enum([
    "CANDIDATE",
    "PLAUSIBLE",
    "LEADING",
    "WEAKENED",
    "INVALIDATED",
    "CONFIRMED"
]);

export const EvidenceRelationTypeSchema = z.enum([
    "SUPPORTS", 
    "CONTRADICTS", 
    "NEUTRAL", 
    "INVALIDATES"
]);

export const ContradictionSeveritySchema = z.enum([
    "WEAK", 
    "MODERATE", 
    "STRONG", 
    "INVALIDATING"
]);

export const EvidenceQualitySchema = z.enum([
    "LOW", 
    "MODERATE", 
    "HIGH"
]);

export const IntegrityLevelSchema = z.enum([
    "HIGH",
    "MODERATE",
    "DEGRADED",
    "LOW"
]);

export const CapabilityStatusSchema = z.enum([
    "AVAILABLE",
    "PARTIAL",
    "STALE",
    "UNAVAILABLE",
    "FAILED"
]);

export const EvidenceSourceTypeSchema = z.enum([
    "METRIC",
    "LOG",
    "DEPLOYMENT",
    "SERVICE_HEALTH",
    "INCIDENT_HISTORY",
    "RUNBOOK",
    "HUMAN_OBSERVATION"
]);

export const RecommendationActionTypeSchema = z.enum([
    "ROLLBACK",
    "RESTART_SERVICE",
    "TRAFFIC_SHIFT",
    "MANUAL_PROCEDURE",
    "NO_ACTION"
]);

export const TechnicalRiskSchema = z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
]);

export const BlastRadiusSchema = z.enum([
    "SERVICE",
    "MULTI_SERVICE",
    "REGION",
    "MULTI_REGION"
]);

export const ApprovalDecisionSchema = z.enum(["APPROVED", "REJECTED"]);

export const RemediationStatusSchema = z.enum([
    "PENDING",
    "APPROVED",
    "EXECUTING",
    "SUCCEEDED",
    "FAILED"
]);

export const RemediationExecutionModeSchema = z.enum([
    "SIMULATED",
    "MANUAL",
    "AUTOMATED"
]);

export const VerificationStatusSchema = z.enum([
    "PENDING",
    "RUNNING",
    "PASSED",
    "FAILED"
]);

export const VerificationCheckStatusSchema = z.enum([
    "PASSED",
    "FAILED",
    "UNKNOWN"
]);

export const CapabilityNameSchema = z.enum([
    "SERVICE_HEALTH",
    "DEPLOYMENTS",
    "LOG_SEARCH",
    "METRICS",
    "INCIDENT_HISTORY",
    "RUNBOOKS",
    "AI_REASONING",
    "REMEDIATION_AUTOMATION"
]);

export const ServiceHealthStatusSchema = z.enum([
    "HEALTHY",
    "DEGRADED",
    "UNAVAILABLE",
    "UNKNOWN"
]);

export type Role = z.infer<typeof RoleSchema>;
export type IncidentSeverity = z.infer<typeof IncidentSeveritySchema>;
export type IncidentStatus = z.infer<typeof IncidentStatusSchema>;
export type InvestigationStatus = z.infer<typeof InvestigationStatusSchema>;
export type HypothesisStatus = z.infer<typeof HypothesisStatusSchema>;
export type EvidenceRelationType = z.infer<typeof EvidenceRelationTypeSchema>;
export type ContradictionSeverity = z.infer<typeof ContradictionSeveritySchema>;
export type EvidenceQuality = z.infer<typeof EvidenceQualitySchema>;
export type IntegrityLevel = z.infer<typeof IntegrityLevelSchema>;
export type CapabilityStatus = z.infer<typeof CapabilityStatusSchema>;