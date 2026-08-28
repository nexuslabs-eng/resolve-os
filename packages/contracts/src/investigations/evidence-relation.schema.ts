import { z } from "zod";
import { ContradictionSeveritySchema, EvidenceRelationTypeSchema } from "@/common/enums";
import { IdSchema, ScoreSchema } from "@/common/primitives";

export const EvidenceHypothesisRelationSchema = z.object({
    id: IdSchema,
    evidenceId: IdSchema,
    hypothesisId: IdSchema,
    relation: EvidenceRelationTypeSchema,
    contradictionSeverity: ContradictionSeveritySchema.nullable(),
    weight: ScoreSchema,
    reasoning: z.string(),
});

export type EvidenceHypothesisRelation = z.infer<typeof EvidenceHypothesisRelationSchema>;