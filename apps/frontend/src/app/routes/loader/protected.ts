import type { OnboardingStep } from "contracts";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { refreshAuthSession } from "@/features/auth/queries/auth-session-query-options";

const onboardingRoutes: Record<OnboardingStep, string> = {
    VERIFY_EMAIL: "/signup/verify-email",
    CREATE_WORKSPACE: "/signup/workspace",
    PROFILE: "/signup/profile",
    COMPLETE: "/signup/complete",
};

export const protectedRouteLoader = async ({
    request,
}: LoaderFunctionArgs) => {
    const session = await refreshAuthSession();
    const pathname = new URL(request.url).pathname;

    if (!session.authenticated) {
        return redirect("/login");
    }

    const nextRoute = onboardingRoutes[session.onboarding.nextStep];

    if (session.onboarding.status === "COMPLETED") {
        if (pathname.startsWith("/signup") && pathname !== "/signup/complete") {
            return redirect("/signup/complete");
        }

        return null;
    }

    if (
        pathname.startsWith("/signup/verify-email") && 
        session.onboarding.emailVerified
    ) {
        return redirect(nextRoute);
    }

    if (
        pathname === "/signup/workspace" &&
        !session.onboarding.emailVerified
    ) {
        return redirect(nextRoute);
    }

    if (
        pathname === "/signup/profile" &&
        !session.onboarding.workspaceCreated
    ) {
        return redirect(nextRoute)
    }

    if (pathname === "/signup/complete") {
        return redirect(nextRoute);
    }

    if (!pathname.startsWith("/signup/")) {
        return redirect(nextRoute);
    }

    return null;
};