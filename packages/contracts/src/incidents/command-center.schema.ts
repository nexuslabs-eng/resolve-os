import { z } from "zod";
import { IncidentSchema } from "./incident.schema";
import { InvestigationSchema } from "@/investigations/investigation.schema";
import { HypothesisSchema } from "@/investigations/hypothesis.schema";
import { EvidenceSchema } from "@/investigations/evidence.schema";
import { EvidenceHypothesisRelationSchema } from "@/investigations/evidence-relation.schema";
import { InvestigationIntegritySchema } from "@/investigations/investigation-integrity.schema";
import { CapabilityStateSchema } from "@/investigations/capability-state.schema";
import { RecommendationSchema } from "@/recommendations/recommendation.schema";
import { ApprovalPolicySchema } from "@/recommendations/approval-policy.schema";
import { RemediationSchema } from "@/recommendations/remediation.schema";
import { VerificationSchema } from "@/recommendations/verification.schema";

export const IncidentCommandCenterSchema = z.object({
    incident: IncidentSchema,
    investigation: InvestigationSchema.nullable(),
    hypotheses: z.array(HypothesisSchema),
    evidences: z.array(EvidenceSchema),
    relations: z.array(EvidenceHypothesisRelationSchema),
    capabilities: z.array(CapabilityStateSchema),
    integrity: InvestigationIntegritySchema.nullable(),
    recommendation: RecommendationSchema.nullable(),
    approvalPolicy: ApprovalPolicySchema.nullable(),
    remediation: RemediationSchema.nullable(),
    verification: VerificationSchema.nullable(),
});

export type IncidentCommandCenter = z.infer<typeof IncidentCommandCenterSchema>;