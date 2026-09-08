import { z } from "zod";
import { RoleSchema } from "../common/enums.js";
import { IdSchema } from "../common/primitives.js";

export const ApprovalPolicySchema = z.object({
    recommendationId: IdSchema,
    requiredApprovals: z.number().int().min(0),
    requiredRoles: z.array(RoleSchema),
    policyReasons: z.array(z.string()),
    currentApprovals: z.number().int().min(0),
    satisfied: z.boolean(),
});

export type ApprovalPolicy = z.infer<typeof ApprovalPolicySchema>;
