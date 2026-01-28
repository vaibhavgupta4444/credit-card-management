import {
  createBrowserRouter,
} from "react-router";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import NotFoundPage from "./pages/NotFound";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
import Transactions from "./pages/transactions";
import CardControlsSecurity from "./pages/CardControlsSecurity";
import BillingPayments from "./pages/BillingPayments";
import RewardsCashback from "./pages/RewardsCashback";

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
          { path: "/transactions", Component: Transactions },
          { path: "/controls", Component: CardControlsSecurity },
          { path: "/billing", Component: BillingPayments },
          { path: "/rewards", Component: RewardsCashback },
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