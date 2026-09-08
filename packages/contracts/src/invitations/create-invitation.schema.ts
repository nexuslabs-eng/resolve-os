import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { InvitationSchema } from "./invitation.schema.js";

export const CreateInvitationRequestSchema = z.object({
    email: z.email(),
    role: RoleSchema,
});

export const CreateInvitationResponseSchema = z.object({
    invitation: InvitationSchema,
});

export type CreateInvitationRequest = z.infer<typeof CreateInvitationRequestSchema>;
export type CreateInvitationResponse = z.infer<typeof CreateInvitationResponseSchema>;