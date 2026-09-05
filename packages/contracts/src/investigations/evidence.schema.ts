import { z } from "zod";
import { EvidenceSourceTypeSchema } from "../common/enums";
import { DateTimeSchema, IdSchema, ScoreSchema } from "../common/primitives";

export const EvidenceProvenanceSchema = z.object({
    tool: z.string().nullable(),
    reference: z.string().nullable(),
    capturedAt: DateTimeSchema,
});

export const EvidenceSchema = z.object({
    id: IdSchema,
    reference: z.string().trim().regex(/^EV-\d+$/),
    investigationId: IdSchema,
    source: z.string(),
    sourceType: EvidenceSourceTypeSchema,
    observation: z.string(),
    reliability: ScoreSchema,
    specificity: ScoreSchema,
    directness: ScoreSchema,
    freshness: ScoreSchema,
    temporalRelevance: ScoreSchema,
    independenceGroup: z.string(),
    provenance: EvidenceProvenanceSchema,
    createdAt: DateTimeSchema,
});

export type Evidence = z.infer<typeof EvidenceSchema>;
