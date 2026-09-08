import { z } from "zod";
import { IntegrityLevelSchema } from "../common/enums.js";
import { ScoreSchema } from "../common/primitives.js";

export const InvestigationIntegritySchema = z.object({
    level: IntegrityLevelSchema,
    evidenceCoverage: ScoreSchema,
    availableSources: z.number().int().min(0),
    degradedSources: z.number().int().min(0),
    unavailableSources: z.number().int().min(0),
    independentEvidenceGroups: z.number().int().min(0),
    unresolvedContradictions: z.number().int().min(0),
    degradationLevel: z.number().int().min(0).max(5),
    reasons: z.array(z.string()),
});

export type InvestigationIntegrity = z.infer<typeof InvestigationIntegritySchema>;
