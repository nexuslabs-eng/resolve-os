import { AppLoading } from "@/components/loading/AppLoading";
import { MOCK_AUTH_DESTINATION } from "@/features/auth/fixtures/auth.constant";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onboardingRoutes, recoveryRoutes } from "@/app/routes/constants";

export const PublicRoute = () => {
    const location = useLocation();
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

    if (!session.data?.authenticated) {
        return <Outlet />;
    }

    const authSession = session.data;
    const pathname = location.pathname;

    if (recoveryRoutes.has(pathname)) {
        return <Outlet />;
    }

    if (authSession.onboarding.status === "COMPLETED") {
        return (
            <Navigate to={MOCK_AUTH_DESTINATION} replace />
        );
    }

    if (pathname === "/signup/account") {
        return <Outlet />;
    }

    return (
        <Navigate
            to={onboardingRoutes[authSession.onboarding.nextStep]}
            replace
        />
    )
};