import { 
    ForgotPasswordRequestSchema,
    ForgotPasswordResponseSchema,
    ResetPasswordRequestSchema, 
    ResetPasswordResponseSchema, 
    type ForgotPasswordRequest,
    type ForgotPasswordResponse,
    type ResetPasswordResponse,
    type ResetPasswordRequest 
} from "contracts";
import { axiosClient } from "@/lib/api/axios-client";

export const forgotPassword = async (
    input: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
    const response = await axiosClient.post<unknown, unknown>(
        "/auth/forgot-password",
        ForgotPasswordRequestSchema.parse(input),
    );

    return ForgotPasswordResponseSchema.parse(response);
};

export const resetPassword = async (
    input: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
    const response = await axiosClient.post<unknown, unknown>(
        "/auth/reset-password",
        ResetPasswordRequestSchema.parse(input),
    );

    return ResetPasswordResponseSchema.parse(response);
};
