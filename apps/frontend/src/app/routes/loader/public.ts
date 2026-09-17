import type { OnboardingStep } from "contracts";
import { redirect } from "react-router-dom";
import { MOCK_AUTH_DESTINATION } from "@/features/auth/fixtures/auth.constant";
import { refreshAuthSession } from "@/features/auth/queries/auth-session-query-options";

const onboardingRoutes: Record<OnboardingStep, string> = {
    VERIFY_EMAIL: "/signup/verify-email",
    CREATE_WORKSPACE: "/signup/workspace",
    PROFILE: "/signup/profile",
    COMPLETE: "/signup/complete",
};

export const publicRouteLoader = async () => {
    const session = await refreshAuthSession();

    if (!session.authenticated) {
        return null;
    }

    if (session.onboarding.status === "COMPLETED") {
        return redirect(MOCK_AUTH_DESTINATION);
    }

    return redirect(
        onboardingRoutes[session.onboarding.nextStep],
    );
};