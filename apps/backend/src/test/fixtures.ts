import type { Membership, Organization, Team, User } from "@resolve-os/database";

export const MOCK_USER_ID = "99999999-9999-4999-8999-999999999999";
export const MOCK_ORGANIZATION_ID = "88888888-8888-4888-8888-888888888888";
export const MOCK_MEMBERSHIP_ID = "77777777-7777-4777-8777-777777777777";
export const MOCK_TEAM_ID = "66666666-6666-4666-8666-666666666666";

export const buildFakeUser = (overrides: Partial<User> = {}): User => ({
  id: MOCK_USER_ID,
  fullName: "John Doe",
  email: "johndoe@example.com",
  passwordHash: "hashed-password",
  authProvider: "PASSWORD",
  emailVerified: false,
  jobRole: null,
  teamSize: null,
  primaryResponsibility: null,
  onboardingCompletedAt: null,
  verificationCode: "hashed-otp",
  verificationAttempts: 0,
  verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
  passwordResetTokenHash: null,
  passwordResetTokenExpires: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const buildFakeOrganization = (
  overrides: Partial<Organization> = {},
): Organization => ({
  id: MOCK_ORGANIZATION_ID,
  name: "Acme Engineering",
  slug: "acme-engineering",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const buildFakeMembership = (
  overrides: Partial<Membership> = {},
): Membership => ({
  id: MOCK_MEMBERSHIP_ID,
  userId: MOCK_USER_ID,
  organizationId: MOCK_ORGANIZATION_ID,
  role: "ADMIN",
  createdAt: new Date(),
  ...overrides,
});

export const buildFakeTeam = (overrides: Partial<Team> = {}): Team => ({
  id: MOCK_TEAM_ID,
  organizationId: MOCK_ORGANIZATION_ID,
  name: "Platform Team",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
