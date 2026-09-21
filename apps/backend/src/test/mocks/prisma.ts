import type { PrismaClient } from "@resolve-os/database";
import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";

// A fully mocked Prisma client, standing in for the real Postgres-backed
// one everywhere `@resolve-os/database` is imported. Keeps `Prisma` (used
// for `instanceof` checks in error.middleware.ts) and every other real
// export intact — only `prisma` itself is replaced.
export const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

vi.mock("@resolve-os/database", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@resolve-os/database")>();
  return {
    ...actual,
    prisma: prismaMock,
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});
