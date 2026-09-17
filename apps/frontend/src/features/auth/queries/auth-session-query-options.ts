import { queryOptions } from "@tanstack/react-query";
import { getAuthSession } from "@/features/auth/api/auth-session";
import { queryClient } from "@/lib/query-client";

export const authSessionQueryKey = ["auth", "session"] as const;

export const authSessionQueryOptions = () =>
    queryOptions({
        queryKey: authSessionQueryKey,
        queryFn: getAuthSession,
        retry: false,
    });

export const refreshAuthSession = () =>
    queryClient.query({
        ...authSessionQueryOptions(),
        staleTime: 0
    });