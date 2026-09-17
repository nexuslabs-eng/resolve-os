import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import HomePage from "@/features/marketing/pages/HomePage";
import MarketingLayout from "@/layouts/MarketingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { AppLoading } from "@/components/loading/AppLoading";
import RouteErrorBoundary from "@/features/errors/pages/RouteErrorBoundary";
import { publicAuthRoutes, protectedOnboardingRoutes } from "@/app/router/auth";
import { PublicRoute } from "@/app/routes/PublicRoute";
import { publicRouteLoader } from "@/app/routes/loader/public";
import { ProtectedRoute } from "@/app/routes/ProtectedRoute";
import { protectedRouteLoader } from "@/app/routes/loader/protected";

const CommandCenterDataFlowTest = lazy(() =>
  import("@/features/command-center/components/command-center-data-flow-test").then(
    (module) => ({ default: module.CommandCenterDataFlowTest }),
  ),
);
const NotFound = lazy(() => import("@/features/errors/pages/NotFound"));

export const router = createBrowserRouter([
  {
    id: "root",
    HydrateFallback: AppLoading,
    ErrorBoundary: RouteErrorBoundary,
    Component: App,
    children: [
      {
        Component: MarketingLayout,
        children: [{ index: true, Component: HomePage }],
      },

      {
        Component: AuthLayout,
        children: [
          {
            Component: PublicRoute,
            loader: publicRouteLoader,
            children: publicAuthRoutes
          },
          {
            Component: ProtectedRoute,
            children: protectedOnboardingRoutes
          }
        ]
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "data-flow-test/:incidentId",
            loader: protectedRouteLoader,
            Component: CommandCenterDataFlowTest,
          }
        ]
      },
      {
        path: "*",
        Component: NotFound
      }
    ],
  },
]);
