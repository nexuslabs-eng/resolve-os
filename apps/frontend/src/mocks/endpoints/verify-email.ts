import { VerifyEmailOtpRequestSchema, VerifyEmailOtpResponseSchema } from "contracts";
import { http, HttpResponse } from "msw";
import { apiError, authSession, MOCK_EMAIL_OTP, setAuthSession } from "@/mocks/utils";
import { apiEndpoint } from "@/lib/api/api-config";

export const verifyEmail = http.post(
    apiEndpoint("/auth/verify-email"), 
    async ({ request }) => {
        const result = VerifyEmailOtpRequestSchema.safeParse(
        await request.json(),
        );

        if (!result.success || result.data.otp !== MOCK_EMAIL_OTP)
            return HttpResponse.json(
                apiError(
                "INVALID_VERIFICATION_CODE",
                "Enter the valid 6-digit verification code.",
                ),
                { status: 400 },
            );

        if (!authSession.authenticated) {
            return HttpResponse.json(
                apiError(
                    "ONBOARDING_STEP_NOT_ALLOWED",
                    "Start signup before verifying an email.",
                ),
                { status: 409 },
            );
        }

        setAuthSession({
            ...authSession,
            user: {
                ...authSession.user,
                emailVerified: true,
            },
            onboarding: {
                ...authSession.onboarding,
                nextStep: "CREATE_WORKSPACE",
                emailVerified: true,
                emailVerifiedAt: new Date().toISOString(),
            }
        })

        const response = VerifyEmailOtpResponseSchema.parse({
        verified: true,
        verifiedAt: new Date().toISOString(),
        nextStep: "CREATE_WORKSPACE",
        });

        return HttpResponse.json(response);
    }
);