import type { User } from "@resolve-os/database";

export const MOCK_USER_ID = "99999999-9999-4999-8999-999999999999";

export const buildFakeUser = (overrides: Partial<User> = {}): User => ({
  id: MOCK_USER_ID,
  fullName: "John Doe",
  email: "johndoe@example.com",
  passwordHash: "hashed-password",
  authProvider: "PASSWORD",
  emailVerified: false,
  verificationCode: "hashed-otp",
  verificationAttempts: 0,
  verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
  passwordResetTokenHash: null,
  passwordResetTokenExpires: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
