import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { NonEmptyStringSchema, IdSchema } from "../common/primitives.js";
import  { OnboardingStateSchema } from "../onboarding/onboarding-state.schema.js";
import { WorkspaceSlugSchema } from "../onboarding/workspace-setup.schema.js";

export const AuthenticatedUserSchema = z.object({
    id: IdSchema,
    fullName: NonEmptyStringSchema,
    email: z.email(),
    emailVerified: z.boolean(),
});

export const AnonymousAuthSessionSchema = z.object({
    authenticated: z.literal(false),
});

export const AuthenticatedAuthSessionSchema = z.object({
    authenticated: z.literal(true),
    user: AuthenticatedUserSchema,
    activeWorkspace: z.object({
        organizationId: IdSchema,
        name: NonEmptyStringSchema,
        slug: WorkspaceSlugSchema,
    }).nullable(),
    membership: z.object({
        role: RoleSchema,
    }).nullable(),
    onboarding: OnboardingStateSchema,
});

export const AuthSessionSchema = z.discriminatedUnion(
    "authenticated",
    [
        AnonymousAuthSessionSchema,
        AuthenticatedAuthSessionSchema,
    ],
);

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;
export type AnonymousAuthSession = z.infer<typeof AnonymousAuthSessionSchema>;
export type AuthenticatedAuthSession = z.infer<typeof AuthenticatedAuthSessionSchema>;
export type AuthSession = z.infer<typeof AuthSessionSchema>;