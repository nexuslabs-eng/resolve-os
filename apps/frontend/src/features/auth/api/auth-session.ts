import { AnonymousAuthSessionSchema, AuthSessionSchema, type AnonymousAuthSession, type AuthSession } from "contracts";
import { axiosClient } from "@/lib/api/axios-client";

export const getAuthSession = async (): Promise<AuthSession> => {
    const response = await axiosClient.get<unknown, unknown>("/auth/session");

    return AuthSessionSchema.parse(response);
};

export const logout = async (): Promise<AnonymousAuthSession> => {
    const response = await axiosClient.post<unknown, unknown>("/auth/logout");

    return AnonymousAuthSessionSchema.parse(response);
};