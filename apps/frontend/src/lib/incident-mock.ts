export interface InvestigationStep {
  id: string;
  label: string;
  detail: string;
}

export interface EvidenceItem {
  id: string;
  source: string;
  title: string;
  detail: string;
  tone: "info" | "high" | "critical";
}

export const INCIDENT = {
  id: "INC-1042",
  title: "Checkout payment failures",
  severity: "CRITICAL" as const,
  state: "INVESTIGATING" as const,
  service: "checkout-api",
  opened: "4m ago",
  responders: ["AD", "MK", "SO"],
};

export const INVESTIGATION_STEPS: InvestigationStep[] = [
  { id: "health", label: "Service health checked", detail: "checkout-api · 3 regions" },
  { id: "deploy", label: "Recent deployment analyzed", detail: "2 releases in window" },
  { id: "logs", label: "Logs correlated", detail: "12,480 events scanned" },
  { id: "hypothesis", label: "Hypothesis formed", detail: "ranked 4 candidates" },
];

export const EVIDENCE: EvidenceItem[] = [
  {
    id: "ev-1",
    source: "deploys",
    title: "v2.8.4 deployed 6m before incident",
    detail: "checkout-api · commit 4b19ac2 · author m.kaur",
    tone: "high",
  },
  {
    id: "ev-2",
    source: "metrics",
    title: "Error rate increased +18.4%",
    detail: "5xx on POST /v1/payments · p95 latency 1.9s",
    tone: "critical",
  },
];

export const HYPOTHESIS = {
  statement: "Checkout v2.8.4 is the likely cause",
  confidence: 87,
  rationale: "Error onset aligns with rollout window across all three regions.",
};

export const RECOMMENDATION = {
  action: "Roll back to v2.8.3",
  risk: "MEDIUM" as const,
  blastRadius: "checkout-api · 3 regions",
  requiresApproval: true,
};
