import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { IdSchema } from "../common/primitives.js";
import { InvitationTokenSchema } from "./invitation-preview.schema.js";

export const AcceptInvitationRequestSchema = z.object({
    token: InvitationTokenSchema,
});

export const AcceptInvitationResponseSchema = z.object({
    accepted: z.literal(true),
    organizationId: IdSchema,
    membership: z.object({
        role: RoleSchema,
    }),
});

export type AcceptInvitationRequest = z.infer<typeof AcceptInvitationRequestSchema>;
export type AcceptInvitationResponse = z.infer<typeof AcceptInvitationResponseSchema>;