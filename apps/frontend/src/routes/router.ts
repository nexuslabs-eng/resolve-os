import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import MarketingPage from "@/features/marketing/MarketingPage";
import { CommandCenterDataFlowTest } from "@/features/command-center/components/command-center-data-flow-test";

export const router = createBrowserRouter([
  {
    id: "root",
    Component: App,
    children: [
      {
        index: true,
        Component: MarketingPage,
      },
      {
        path: "data-flow-test/:incidentId",
        Component: CommandCenterDataFlowTest,
      },
    ],
  },
]);
