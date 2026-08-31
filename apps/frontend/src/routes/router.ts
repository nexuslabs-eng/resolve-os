import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { CommandCenterDataFlowTest } from "@/features/command-center/components/command-center-data-flow-test";
import LandingPage from "@/features/landing/LandingPage";

export const router = createBrowserRouter([
  {
    id: "root",
    Component: App,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "data-flow-test/:incidentId",
        Component: CommandCenterDataFlowTest,
      },
    ],
  },
]);
