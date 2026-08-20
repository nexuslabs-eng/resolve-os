# ResolveOS

An upcoming AI-driven incident investigation, response, and automated remediation platform simulation. 

ResolveOS is a collaborative B2B engineering project designed to bridge the gap between probabilistic AI diagnosis and deterministic business safeguards. The platform will feature a stateful AI agent that executes isolated diagnostic tools, drafts incident hypotheses, and requests human-in-the-loop authorization before executing remediation within a simulated infrastructure environment.

---

## Planned System Architecture & Data Flow

ResolveOS will be built as an event-driven Monorepo divided across three completely decoupled layers:

```text
  ┌──────────────────────────────────────────────────────────┐
  │               1. FRONTEND APP (React / PWA)              │
  │ • Zustand (UI State)      • TanStack Query (Server state)│
  └───────────────────────────┬──────────────────────────────┘
                              │ REST / SSE Data Streams
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │             2. PLATFORM GATEWAY (Node.js)              │
  │ • Multi-Tenant RBAC Security • Lifecycle State Machine │
  └─────────────────────┬────────────────====┬─────────────┘
                        │                    │
                        ▼                    ▼
                 ┌─────────────┐      ┌──────────────┐
                 │   MongoDB   │      │ Python App   │
                 │ (Data Vault)│      │ (LangGraph)  │
                 └─────────────┘      └──────────────┘
```

### Core Workflow Target
1. **Detect:** A simulated cluster failure triggers an incident ticket (e.g., latency spikes).
2. **Investigate:** A stateful **LangGraph** engine runs isolated diagnostic tools (`searchLogs`, `getMetrics`).
3. **Recommend:** The AI produces a structured schema hypothesis with a confidence score.
4. **Authorize:** High-risk actions freeze and request explicit human approval based on server-side RBAC rules.
5. **Remediate & Verify:** The system executes approved changes (e.g., rollback) and monitors telemetry to verify full recovery.

---

## The Blueprint & Technology Stack

### Frontend (`/apps/frontend`)
* **React + TypeScript + Vite:** Fast, strictly-typed UI shell compilation.
* **TanStack Query (React Query):** For asynchronous server state caching, background polling, and mutations.
* **Zustand:** Lightweight global storage restricted strictly to temporary client UI states (active tabs, view filters).
* **Vite PWA Plugin:** To enable standalone desktop app installation and native OS push notifications for critical page responses.

### Backend API (`/apps/backend`)
* **Node.js + Express:** Handling of core platform workflows, route authentication, and API endpoints.
* **MongoDB + Mongoose:** Document data mapping strictly partitioned to enforce secure multi-tenant data isolation.
* **Server-Sent Events (SSE):** Streaming incremental, live AI node updates directly to the client without polling overhead.

### AI Service (`/apps/ai`)
* **Python + LangGraph:** Orchestrating stateful, cyclic graphs with explicit retry/error handling nodes.
* **Google Gemini API:** Selected via LangChain to provide high-quality multi-step reasoning capabilities.
* **Pydantic:** Validating and structurally marshaling free-form model outputs before data persistence.

---

## The Development Team & Division of Labor

This project is co-engineered by:

* **[Samuel](https://github.com/socode-dev)** (Frontend & AI Engineering)
  * Responsible for the Vite React PWA shell, Zustand/TanStack Query lifecycles, Python service structure, and LangGraph agent logic.
* **[Adejare](https://github.com/jar-andreas)** (Backend & Platform Engineering)
  * Responsible for the Node.js Express API architecture, server-side multi-tenant data isolation logic, RBAC layers, and database schemas.

---

##  Roadmap & Current Status
This repository is currently a freshly initialized project workspace skeleton containing our core directory layout. Our active building milestones will follow this sequence:

* [x] Initialize **NexusLabs Engineering** Organization & Monorepo Framework
* [ ] **Milestone 1:** Authentication, Multi-tenant schemas, & RBAC Gateway setup
* [ ] **Milestone 2:** Incident State Machine & Event Timeline architecture
* [ ] **Milestone 3:** Local infrastructure environment log/metric simulator
* [ ] **Milestone 4:** LangGraph diagnostic agent implementation
* [ ] **Milestone 5:** Human-in-the-loop remediation controls & verification loops
* [ ] **Milestone 6:** Real-time UI updates (SSE), metrics dashboards, and PWA polish

---

## 🔒 Project Scope Constraints
* **Simulated Environment:** To maintain a focused development scope, logs, telemetry metrics, and deployments are generated deterministically as ordinary MongoDB records, eliminating live dependencies on real cloud infrastructure.
* **Strict AI Safety:** The AI agent operates purely within restricted tools and can never bypass system authorization or self-approve its own operational playbooks.
