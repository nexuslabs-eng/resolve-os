import { z } from "zod";
import { HypothesisStatusSchema } from "../common/enums.js";
import { DateTimeSchema, IdSchema, ScoreSchema } from "../common/primitives.js";

export const HypothesisSchema = z.object({
    id: IdSchema,
    reference: z.string().trim().regex(/^H\d+$/),
    investigationId: IdSchema,
    statement: z.string(),
    status: HypothesisStatusSchema,
    supportStrength: ScoreSchema,
    contradictionPressure: ScoreSchema,
    independentEvidenceGroups: z.number().int().min(0),
    unresolvedContradictions: z.number().int().min(0),
    rank: z.number().int().min(1),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema,
});

export type Hypothesis = z.infer<typeof HypothesisSchema>;
