import type { JobRole, PrimaryResponsibility, TeamSize } from "contracts";

export const JOB_ROLES: Array<{ value: JobRole; label: string }> = [
    { value: "SOFTWARE_ENGINEER", label: "Software Engineer" },
    { value: "SITE_RELIABILITY_ENGINEER", label: "Site Reliability Engineer" },
    { value: "DEVOPS_PLATFORM_ENGINEER", label: "DevOps / Platform Engineer" },
    { value: "ENGINEERING_MANAGER", label: "Engineering Manager" },
    { value: "INCIDENT_COMMANDER", label: "Incident Commander" },
    { value: "OTHER", label: "Other" },
];

export const TEAM_SIZES: Array<{ value: TeamSize; label: string }> = [
    { value: "ONE_TO_FIVE", label: "1-5 people" },
    { value: "SIX_TO_TWENTY", label: "6-20 people" },
    { value: "TWENTY_ONE_TO_FIFTY", label: "21-50 people" },
    { value: "FIFTY_ONE_TO_TWO_HUNDRED", label: "51-200 people" },
    { value: "TWO_HUNDRED_PLUS", label: "More than 200 people" },
];

export const RESPONSIBILITIES: Array<{ value: PrimaryResponsibility; label: string; }> = [
    { value: "APPLICATION_ENGINEERING", label: "Application engineering" },
    { value: "RELIABILITY_SRE", label: "Reliability / SRE" },
    { value: "PLATFORM_ENGINEERING", label: "Platform engineering" },
    { value: "INFRASTRUCTURE", label: "Infrastructure" },
    { value: "ENGINEERING_LEADERSHIP", label: "Engineering leadership" },
    { value: "OTHER", label: "Other" },
];