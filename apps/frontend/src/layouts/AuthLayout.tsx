import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RouteLoading } from "@/components/loading/RouteLoading";
import { AuthShell } from "@/features/auth/components/AuthShell";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <AuthShell>
      <Suspense key={pathname} fallback={<RouteLoading />}>
        <Outlet />
      </Suspense>
    </AuthShell>
  );
};

export default AuthLayout;
