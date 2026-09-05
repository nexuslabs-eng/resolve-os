export const TOOLS = [
    { 
        name: "getServiceHealth", 
        args: "checkout-api", 
        result: "checkout degraded; database pool normal"
    },
    { 
        name: "getRecentDeployments", 
        args: "window 30m", 
        result: "current and prior versions fail identically"
    },
    { 
        name: "searchLogs", 
        args: "POST /v1/payments 5xx", 
        result: "failed: provider timeout"
    },
    { 
        name: "getMetrics", 
        args: "provider_latency, p95",
        result: "provider p95 latency reached 2.8s"
    },
    { 
        name: "getPreviousIncidents", 
        args: "checkout-api", 
        result: "provider degradation pattern found"
    },
    { 
        name: "getRunbook", 
        args: "payment-failures", 
        result: "secondary provider traffic shift"
    },
];

export const POINTS = [
  "Every call is a declared tool with a typed contract, not shell access.",
  "The AI reads scoped operational data. It never touches infrastructure or production databases directly.",
  "Each result is stored as evidence, attributable and reviewable after the fact.",
];
