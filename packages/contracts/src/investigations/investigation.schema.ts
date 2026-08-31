import { z } from "zod";
import { IntegrityLevelSchema, InvestigationStatusSchema } from "../common/enums";
import { DateTimeSchema, IdSchema, ScoreSchema } from "../common/primitives";

export const InvestigationSchema = z.object({
    id: IdSchema,
    incidentId: IdSchema,
    status: InvestigationStatusSchema,
    integrity: IntegrityLevelSchema,
    evidenceCoverage: ScoreSchema,
    degradationLevel: z.number().int().min(0).max(5),
    leadingHypothesisId: IdSchema.nullable(),
    startedAt: DateTimeSchema,
    completedAt: DateTimeSchema.nullable(),
});

export type Investigation = z.infer<typeof InvestigationSchema>;
