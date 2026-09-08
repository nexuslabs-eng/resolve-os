import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { NonEmptyStringSchema, IdSchema } from "../common/primitives.js";
import { JobRoleSchema, PrimaryResponsibilitySchema, TeamSizeSchema } from "./onboarding.enums.js";
import { WorkspaceSlugSchema } from "./workspace-setup.schema.js";

export const SignupCompletionSchema = z.object({
    user: z.object({
        id: IdSchema,
        fullName: NonEmptyStringSchema,
        email: z.email(),
    }),
    workspace: z.object({
        organizationId: IdSchema,
        name: NonEmptyStringSchema,
        slug: WorkspaceSlugSchema,
    }),
    profile: z.object({
        jobRole: JobRoleSchema,
        teamSize: TeamSizeSchema,
        primaryResponsibility: PrimaryResponsibilitySchema.optional(),
    }),
    membership: z.object({
        role: RoleSchema
    }),
});

export type SignupCompletion = z.infer<typeof SignupCompletionSchema>;