import { z } from "zod";
import { DateTimeSchema, IdSchema } from "../common/primitives.js";
import { paginatedResponseSchema } from "../common/pagination.schema.js";

export const TeamSchema = z.object({
  id: IdSchema,
  organizationId: IdSchema,
  name: z.string(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const CreateTeamRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
});

export const UpdateTeamRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
});

export const TeamListResponseSchema = paginatedResponseSchema(TeamSchema);

export const DeleteTeamResponseSchema = z.object({
  deleted: z.literal(true),
});

export type Team = z.infer<typeof TeamSchema>;
export type CreateTeamRequest = z.infer<typeof CreateTeamRequestSchema>;
export type UpdateTeamRequest = z.infer<typeof UpdateTeamRequestSchema>;
export type TeamListResponse = z.infer<typeof TeamListResponseSchema>;
export type DeleteTeamResponse = z.infer<typeof DeleteTeamResponseSchema>;
