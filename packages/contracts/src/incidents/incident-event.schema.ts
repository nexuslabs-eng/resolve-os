import { z } from "zod";
import { DateTimeSchema, IdSchema } from "@/common/primitives";

export const ActorTypeSchema = z.enum(["USER", "AI", "SYSTEM"]);

export const IncidentEventSchema = z.object({
    id: IdSchema,
    incidentId: IdSchema,
    actorType: ActorTypeSchema,
    actorId: IdSchema.nullable(),
    type: z.string(),
    message: z.string(),
    metadata: z.record(z.string(), z.unknown()).nullable(),
    createdAt: DateTimeSchema,
});

export type IncidentEvent = z.infer<typeof IncidentEventSchema>;