import type { ReactNode } from "react";

import { AppLoading } from "@/components/loading/AppLoading";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";

interface AuthSessionBoundaryProps {
    children: ReactNode;
}

export const AuthSessionBoundary = ({
    children,
}: AuthSessionBoundaryProps) => {
    const session = useAuthSession();

    if (session.isPending) {
        return <AppLoading />;
    }

    if (session.isError) {
        return (
            <AppLoading
                failed
                onRetry={() => void session.refetch()}
            />
        );
    }

    return children;
};