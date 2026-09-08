import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { DateTimeSchema, NonEmptyStringSchema, IdSchema } from "../common/primitives.js";
import { InvitationStatusSchema } from "./invitation.enums.js";

export const InvitationSchema = z.object({
    id: IdSchema,
    organizationId: IdSchema,
    email: z.email(),
    role: RoleSchema,
    status: InvitationStatusSchema,
    invitedBy: z.object({
        id: IdSchema,
        fullName: NonEmptyStringSchema,
    }),
    createdAt: DateTimeSchema,
    expiresAt: DateTimeSchema,
    acceptedAt: DateTimeSchema.nullable(),
    revokedAt: DateTimeSchema.nullable(),
});

export type Invitation = z.infer<typeof InvitationSchema>;