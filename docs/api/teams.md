# Teams API

Base path: `/organizations/:organizationId/teams`. Request/response shapes
are defined in `packages/contracts/src/teams/team.schema.ts`.

Every route here requires an authenticated session (`401 UNAUTHENTICATED`
otherwise), **and** that the user has a `Membership` in the organization
named by `:organizationId` (`404 ORGANIZATION_NOT_FOUND` otherwise —
deliberately a bare 404, not 403: tenant isolation means never confirming
an organization exists to someone who has no business knowing about it).
Creating, renaming, and deleting a team additionally require the `ADMIN`
role (`403 FORBIDDEN` otherwise); viewing is open to any member regardless
of role.

---

## POST /organizations/:organizationId/teams

**Role required:** `ADMIN`

**Request body** (`CreateTeamRequestSchema`): `{ name: string }` — 2–100 chars.

**Success — `201`**

```json
{
  "id": "...",
  "organizationId": "...",
  "name": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors**

| Status | Code              | Meaning                                                 |
| ------ | ----------------- | ------------------------------------------------------- |
| 400    | (validation)      | malformed body                                          |
| 409    | `TEAM_NAME_TAKEN` | another team in this organization already has this name |

---

## GET /organizations/:organizationId/teams

**Role required:** none beyond membership — any role can list.

**Query:** `?page=1&limit=10` (`PaginationQuerySchema` — `page` defaults to
1, `limit` defaults to 10, max 100).

**Success — `200`**

```json
{
  "items": [
    {
      "id": "...",
      "organizationId": "...",
      "name": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "page": 1,
  "limit": 10,
  "totalCount": 1,
  "totalPages": 1
}
```

**Errors**

| Status | Code              | Meaning                         |
| ------ | ----------------- | ------------------------------- |
| 400    | `INVALID_REQUEST` | malformed pagination parameters |

---

## GET /organizations/:organizationId/teams/:teamId

**Role required:** none beyond membership — any role can view.

**Success — `200`**: same shape as a single item from the list response above.

**Errors**

| Status | Code             | Meaning                                                                                                                       |
| ------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 404    | `TEAM_NOT_FOUND` | no team with this ID exists in this organization (also returned if the team exists but belongs to a _different_ organization) |

---

## PATCH /organizations/:organizationId/teams/:teamId

**Role required:** `ADMIN`

**Request body** (`UpdateTeamRequestSchema`): `{ name: string }` — same validation as create.

**Success — `200`**: the updated team, same shape as `GET`.

**Errors:** same as `POST` (`TEAM_NAME_TAKEN`) plus `404 TEAM_NOT_FOUND` (same meaning as `GET`).

---

## DELETE /organizations/:organizationId/teams/:teamId

**Role required:** `ADMIN`

**Success — `200`**: `{ "deleted": true }`

**Errors**

| Status | Code             | Meaning               |
| ------ | ---------------- | --------------------- |
| 404    | `TEAM_NOT_FOUND` | same meaning as `GET` |
