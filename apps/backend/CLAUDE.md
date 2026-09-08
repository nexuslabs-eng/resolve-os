# CLAUDE.md — apps/backend

Engineering standards for working in this app. Read alongside the
[root README](../../README.md) and the
[engineering playbook](../../docs/engineering/playbook.md) — this file
is the enforcement layer for what those documents already decide, not
a replacement for them.

## Non-negotiables

- **Tenant isolation is not best-effort.** Every query against an
  org-owned table must be scoped by `organizationId`. Never rely on a
  record's own id alone to authorize access to it.
- **AI recommends, humans authorize.** The AI/LangGraph service may
  only ever produce a `Recommendation`. Remediation execution requires
  a separate, explicit human approval step. Do not add a path — even
  for a "quick MVP" — where AI output triggers remediation directly.
- **RBAC checks happen before business logic runs**, not after, and
  not as an afterthought bolted onto a controller that already did
  work.
- Every state transition relevant to audit (approvals, degradation
  level changes, remediation, verification) must be written to
  `AuditLogs`. This is not optional or "add later" — it's part of the
  MVP definition of done (playbook §16).

## Structure and conventions

- Use the shared client: `import { prisma } from '@resolve-os/database'`.
  Never instantiate a second `PrismaClient` or connection pool in this
  app.
- Request/response shapes come from `@resolve-os/contracts`. Don't
  redefine a type locally that already exists there — import it.
- New domain work gets its own `modules/<domain>/` folder
  (`<domain>.controller.ts` + `<domain>.routes.ts` co-located), not a
  new top-level folder off `src/`.
- Route handlers go through `infrastructure/tryCatchWrapper.ts`; don't
  let an async handler reject unhandled.
- Errors flow through `middleware/error.middleware.ts` into the
  response envelope in `infrastructure/responseHandler.ts`. Don't
  `res.json()` errors ad hoc from a controller.
- Validate every request body/query/params against a Zod schema via
  `middleware/formValidate.middleware.ts` before it reaches a
  controller.

## Code quality

- Strict TypeScript is on. Fix the type; don't cast around it with
  `any` or `as unknown as`.
- Don't add abstraction, config options, or "just in case" flexibility
  beyond what the current task needs. Three similar lines beat a
  premature helper.
- Don't add error handling or fallbacks for states that can't occur
  given the code's own guarantees — validate at the boundary (request
  input, external API responses), trust internal code past that.

## Testing

Vitest + Supertest. RBAC, tenant-isolation, and remediation/approval
policy logic are the enforcement points the product's whole safety
model rests on — these need real unit tests, not just happy-path
coverage. Integration tests exercise Express + PostgreSQL + Prisma
directly (playbook §15), not mocked persistence.
