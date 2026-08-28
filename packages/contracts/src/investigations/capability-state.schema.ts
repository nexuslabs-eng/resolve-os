import  { z } from "zod";
import { CapabilityNameSchema, CapabilityStatusSchema } from "@/common/enums";
import { DateTimeSchema, ScoreSchema } from "@/common/primitives";

export const CapabilityStateSchema = z.object({
    capability: CapabilityNameSchema,
    status: CapabilityStatusSchema,
    freshness: ScoreSchema.nullable(),
    reason: z.string().nullable(),
    updatedAt: DateTimeSchema,
});

export type CapabilityState = z.infer<typeof CapabilityStateSchema>;