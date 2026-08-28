import { z } from "zod";
import { IncidentSeveritySchema } from "@/common/enums";
import { IdSchema } from "@/common/primitives";
import { CapabilityStateSchema } from "@/investigations/capability-state.schema";

export const StartAIInvestigationRequestSchema = z.object({
    investigationId: IdSchema,
    incident: z.object({
        id: IdSchema,
        title: z.string(),
        description: z.string().nullable(),
        severity: IncidentSeveritySchema,
    }),
    service: z.object({
        id: IdSchema,
        name: z.string(),
        environment: z.string(),
        currentVersion: z.string().nullable(),
    }),
    capabilityStates: z.array(CapabilityStateSchema),
});

export type StartAIInvestigationRequest = z.infer<typeof StartAIInvestigationRequestSchema>;