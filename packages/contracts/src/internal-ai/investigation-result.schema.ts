import { z } from "zod";
import { 
    IntegrityLevelSchema,
    RecommendationActionTypeSchema,
    TechnicalRiskSchema
} from "../common/enums.js";
import { IdSchema } from "../common/primitives.js";
import { HypothesisSchema } from "../investigations/hypothesis.schema.js";
import { EvidenceSchema } from "../investigations/evidence.schema.js";
import { EvidenceHypothesisRelationSchema } from "../investigations/evidence-relation.schema.js";
import { InvestigationIntegritySchema } from "../investigations/investigation-integrity.schema.js";

export const AIRecommendationSchema = z.object({
    actionType: RecommendationActionTypeSchema,
    summary: z.string(),
    reasoning: z.string(),
    technicalRisk: TechnicalRiskSchema,
    supportingEvidenceIds: z.array(IdSchema),
    contradictingEvidenceIds: z.array(IdSchema),
    investigationIntegrity: IntegrityLevelSchema,
});

export const AIInvestigationResultSchema = z.object({
    investigationId: IdSchema,
    status: z.enum(["COMPLETED", "DEGRADED", "FAILED"]),
    hypotheses: z.array(HypothesisSchema),
    evidence: z.array(EvidenceSchema),
    relations: z.array(EvidenceHypothesisRelationSchema),
    integrity: InvestigationIntegritySchema,
    leadingHypothesisId: IdSchema.nullable(),
    recommendation: AIRecommendationSchema.nullable(),
    error: z.string().nullable(),
});

export type AIInvestigationResult = z.infer<typeof AIInvestigationResultSchema>;
