import {
  createBrowserRouter,
} from "react-router";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFound";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
// import Transactions from "./pages/Transactions";
// import Billing from "./pages/Billing";
// import Rewards from "./pages/Rewards";
// import CardControls from "./pages/CardControls";
// import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/signin",
    Component: PublicRoute,
    children: [
      { index: true, Component: Signin },
    ],
  },
  {
    path: "/signup",
    Component: PublicRoute,
    children: [
      { index: true, Component: Signup },
    ],
  },
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          { index: true, Component: Dashboard },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
export default router;