import { z } from "zod";
import { DateTimeSchema, IdSchema } from "../common/primitives";
import { ServiceHealthStatusSchema } from "../common/enums";

export const ServiceSchema = z.object({
    id: IdSchema,
    organizationId: IdSchema,
    teamId: IdSchema.nullable(),
    name: z.string(),
    environment: z.string(),
    healthStatus: ServiceHealthStatusSchema,
    currentVersion: z.string().nullable(),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema,
});

export const CreateServiceRequestSchema = z.object({
    name: z.string().trim().min(2).max(120),
    environment: z.string().trim().min(1).max(50),
    teamId: IdSchema.optional(),
});

export type Service = z.infer<typeof ServiceSchema>;
export type CreateServiceRequest = z.infer<typeof CreateServiceRequestSchema>;
