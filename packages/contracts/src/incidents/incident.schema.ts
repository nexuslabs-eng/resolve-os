import { z } from "zod";
import { IncidentSeveritySchema, IncidentStatusSchema } from "../common/enums";
import { DateTimeSchema, IdSchema } from "../common/primitives";

export const IncidentSchema = z.object({
    id: IdSchema,
    organizationId: IdSchema,
    serviceId: IdSchema,
    title: z.string(),
    description: z.string().nullable(),
    severity: IncidentSeveritySchema,
    status: IncidentStatusSchema,
    commanderId: IdSchema.nullable(),
    startedAt: DateTimeSchema,
    acknowledgedAt: DateTimeSchema.nullable(),
    resolvedAt: DateTimeSchema.nullable(),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema,
});

export const CreateIncidentRequestSchema = z.object({
    serviceId: IdSchema,
    title: z.string().trim().min(3).max(200),
    description: z.string().trim().max(2000).optional(),
    severity: IncidentSeveritySchema,
});

export type Incident = z.infer<typeof IncidentSchema>;
export type CreateIncidentRequest = z.infer<typeof CreateIncidentRequestSchema>
