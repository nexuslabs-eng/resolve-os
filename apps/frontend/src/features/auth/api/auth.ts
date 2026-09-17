import {
    SignupRequestSchema,
    SignupResponseSchema,
    LoginRequestSchema,
    LoginResponseSchema,
    VerifyEmailOtpRequestSchema,
    VerifyEmailOtpResponseSchema,
    ResendVerificationOtpResponseSchema,
    type SignupRequest,
    type SignupResponse,
    type LoginRequest,
    type LoginResponse,
    type VerifyEmailOtpRequest,
    type VerifyEmailOtpResponse,
    type ResendVerificationOtpResponse,
} from "contracts";
import { axiosClient } from "@/lib/api/axios-client";

export const login = async (input: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post<unknown, unknown>("/auth/login", LoginRequestSchema.parse(input));

    return LoginResponseSchema.parse(response);
};

export const signupAccount = async (
    input: SignupRequest,
): Promise<SignupResponse> => {
    const payload = SignupRequestSchema.parse(input);
    const response = await axiosClient.post<unknown, unknown>("/auth/signup", payload);

    return SignupResponseSchema.parse(response);
};

export const verifyEmailOtp = async (
    input: VerifyEmailOtpRequest,
): Promise<VerifyEmailOtpResponse> => {
    const payload = VerifyEmailOtpRequestSchema.parse(input);
    const response = await axiosClient.post<unknown, unknown>("/auth/verify-email", payload);

    return VerifyEmailOtpResponseSchema.parse(response);
};

export const resendVerificationOtp = 
    async (): Promise<ResendVerificationOtpResponse> => {
    const response = await axiosClient.post<unknown, unknown>("/auth/resend-verification-otp");

    return ResendVerificationOtpResponseSchema.parse(response);
};