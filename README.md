# ResolveOS

ResolveOS is an evidence-aware incident investigation and response
platform for engineering teams. It is built for complex failures where
signals conflict, evidence quality varies, and critical diagnostic
capabilities may degrade during an incident.

Instead of treating AI confidence as the final answer, ResolveOS
maintains competing hypotheses, evaluates supporting and contradictory
evidence, tracks investigation integrity, and requires human
authorization before consequential remediation.

> **AI recommends. Humans authorize. ResolveOS enforces.**

## Core Workflow

``` text
Incident
  ↓
Investigation
  ↓
Competing Hypotheses
  ↓
Evidence Collection
  ↓
Contradiction Analysis
  ↓
Investigation Integrity
  ↓
Recommendation
  ↓
RBAC + Human Approval
  ↓
Remediation
  ↓
Verification
  ↓
Resolution + Postmortem
```

ResolveOS also uses **progressive degradation** so an investigation can
continue safely when evidence sources, AI services, or automation
capabilities become unavailable.

## Key Capabilities

-   Incident lifecycle and timeline management
-   AI-assisted investigation with LangGraph
-   Competing root-cause hypotheses
-   Asymmetric evidence contradiction analysis
-   Evidence provenance and independence tracking
-   Investigation integrity and evidence coverage
-   Progressive degradation during tool or service failures
-   RBAC and human-controlled remediation
-   Recovery verification
-   Postmortem generation and audit history
-   Real-time investigation updates through SSE
-   Installable React PWA

## Architecture

ResolveOS is developed as three independently testable domains connected
through explicit contracts.

``` text
React + TypeScript PWA
        │
     REST / SSE
        │
        ▼
Node.js + Express API
        │
        ├── PostgreSQL + Prisma ORM
        │
        ▼
Python + FastAPI + LangGraph
```

### Frontend

React, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, Radix
UI, Zustand, TanStack Query, Axios, Zod, React Hook Form, Recharts,
vite-plugin-pwa, Vitest, React Testing Library, Playwright, and MSW.

### Backend

Node.js, Express, TypeScript, PostgreSQL, Prisma ORM, Zod, server-side
RBAC, tenant isolation, and Server-Sent Events.

### AI Service

Python, FastAPI, LangGraph, Pydantic, and Gemini through a provider
abstraction.

## MVP

The MVP uses deterministic simulated operational data so the complete
incident workflow can be developed and tested end to end.

The flagship scenario intentionally begins with a misleading deployment
hypothesis. Strong contradictory evidence causes ResolveOS to revise its
reasoning toward an external provider failure. A diagnostic tool then
fails, triggering progressive degradation and stricter remediation
approval before recovery is verified.

## Repository

``` text
resolve-os/
├── apps/
│   ├── frontend/
│   ├── backend/
│   └── ai/
├── docs/
├── packages/
│   └── contracts/

└── e2e/
```

## Documentation

Project documentation lives in [`/docs`](./docs).

-   [`docs/product/prd.md`](./docs/product/prd.md) contains the product
    requirements and MVP behavior.
-   [`docs/engineering/playbook.md`](./docs/engineering/playbook.md)
    defines the architecture, domain boundaries, development workflow,
    data model, AI investigation flow, and testing strategy.

## Team

-   **[Samuel](https://github.com/socode-dev)**: Frontend and AI
    Engineering
-   **[Adejare](https://github.com/jar-andreas)**: Backend and Platform
    Engineering

## Status

ResolveOS is under active development. The current focus is the MVP
investigation workflow, shared contracts, product interface, AI
reasoning system, and backend foundation.
