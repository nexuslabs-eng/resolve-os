import { z } from "zod";

export const OnboardingStepSchema = z.enum([
    "VERIFY_EMAIL",
    "CREATE_WORKSPACE",
    "PROFILE",
    "COMPLETE",
]);

export const OnboardingStatusSchema = z.enum([
    "IN_PROGRESS",
    "COMPLETED",
]);

export const JobRoleSchema = z.enum([
    "SOFTWARE_ENGINEER",
    "SITE_RELIABILITY_ENGINEER",
    "DEVOPS_PLATFORM_ENGINEER",
    "ENGINEERING_MANAGER",
    "INCIDENT_COMMANDER",
    "OTHER",
]);

export const TeamSizeSchema = z.enum([
    "ONE_TO_FIVE",
    "SIX_TO_TWENTY",
    "TWENTY_ONE_TO_FIFTY",
    "FIFTY_ONE_TO_TWO_HUNDRED",
    "TWO_HUNDRED_PLUS",
]);

export const PrimaryResponsibilitySchema = z.enum([
    "APPLICATION_ENGINEERING",
    "RELIABILITY_SRE",
    "PLATFORM_ENGINEERING",
    "INFRASTRUCTURE",
    "ENGINEERING_LEADERSHIP",
    "OTHER",
]);

export type OnboardingStep = z.infer<typeof OnboardingStepSchema>;
export type OnboardingStatus = z.infer<typeof OnboardingStatusSchema>;
export type JobRole = z.infer<typeof JobRoleSchema>;
export type TeamSize = z.infer<typeof TeamSizeSchema>;
export type PrimaryResponsibility = z.infer<typeof PrimaryResponsibilitySchema>;