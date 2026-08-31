import { z } from "zod";
import { DateTimeSchema, IdSchema } from "../common/primitives";

export const TeamSchema = z.object({
    id: IdSchema,
    organizationId: IdSchema,
    name: z.string(),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema,
});

export const CreateTeamRequestSchema = z.object({
    name: z.string().trim().min(2).max(100)
});

export type Team = z.infer<typeof TeamSchema>;
export type CreateTeamRequest = z.infer<typeof CreateTeamRequestSchema>;
