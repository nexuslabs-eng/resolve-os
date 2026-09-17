import { ForgotPasswordRequestSchema, ForgotPasswordResponseSchema, ResetPasswordRequestSchema, ResetPasswordResponseSchema } from "contracts";
import { http, HttpResponse } from "msw";
import { apiError, RESET_PASSWORD_TOKEN } from "@/mocks/utils";
import { apiEndpoint } from "@/lib/api/api-config";

let resetExpiresAt = 0;

export const forgotPassword = http.post(
    apiEndpoint("/auth/forgot-password"), 
    async ({ request }) => {
        const result = ForgotPasswordRequestSchema.safeParse(await request.json());
        
        if (!result.success) 
            return HttpResponse.json(
                apiError(
                    "INVALID_REQUEST", 
                    "Enter a valid email."
                ), 
                { status: 422 }
            );

        resetExpiresAt = Date.now() + 15 * 60_000;
        
        return HttpResponse.json(ForgotPasswordResponseSchema.parse({ accepted: true }));
    }
);

export const resetPassword = http.post(
    apiEndpoint("/auth/reset-password"), 
    async ({ request }) => {
        const result = ResetPasswordRequestSchema.safeParse(await request.json());
                
        if (
                !result.success || 
                result.data.token !== RESET_PASSWORD_TOKEN || 
                Date.now() >= resetExpiresAt
            )
                return HttpResponse.json(
                    apiError(
                        "PASSWORD_RESET_TOKEN_INVALID", 
                        "Request a new reset link."
                    ), 
                    { status: 400 }
                );

        resetExpiresAt = 0;
    
        return HttpResponse.json(
            ResetPasswordResponseSchema.parse({ 
                reset: true, 
                completedAt: new Date().toISOString() 
            })
        );
    }
);