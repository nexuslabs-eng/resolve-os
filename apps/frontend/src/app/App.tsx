import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppLoading } from "@/components/loading/AppLoading";
import { RouteLoading } from "@/components/loading/RouteLoading";
import { ScrollToTop } from "@/layouts/ScrollToTop";

const App = () => {
  const { pathname } = useLocation();
  const enteringWorkspace = pathname.startsWith("/data-flow-test/");

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      
      <Suspense
        key={pathname}
        fallback={
          enteringWorkspace
            ? <AppLoading />
            : <RouteLoading className="min-h-screen" />
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
