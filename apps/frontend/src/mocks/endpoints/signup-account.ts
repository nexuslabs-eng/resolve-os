import { SignupRequestSchema, SignupResponseSchema } from "contracts";
import { http, HttpResponse } from "msw";
import { apiError, MOCK_USER_ID, resetMockProfile, setAuthSession } from "@/mocks/utils";
import { apiEndpoint } from "@/lib/api/api-config";

export const signupAccount = http.post(
    apiEndpoint("/auth/signup"), 
    async ({ request }) => {
        const result = SignupRequestSchema.safeParse(await request.json());

        if (!result.success)
            return HttpResponse.json(
                apiError("INVALID_SIGNUP_REQUEST", "Check your account details."),
                { status: 422 },
            );

        resetMockProfile();

        setAuthSession({
            authenticated: true,
            user: {
                id: MOCK_USER_ID,
                fullName: result.data.fullName,
                email: result.data.email,
                emailVerified: false,
            },
            activeWorkspace: null,
            membership: null,
            onboarding: {
                status: "IN_PROGRESS",
                nextStep: "VERIFY_EMAIL",
                emailVerified: false,
                workspaceCreated: false,
                profileCompleted: false,
                completedAt: null,
            }
        })

        const response = SignupResponseSchema.parse({
        userId: MOCK_USER_ID,
        email: result.data.email,
        emailVerified: false,
        nextStep: "VERIFY_EMAIL",
        });

        return HttpResponse.json(response, { status: 201 });
    }
);