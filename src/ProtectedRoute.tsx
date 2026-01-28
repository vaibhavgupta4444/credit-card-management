import { Navigate, Outlet } from "react-router";
import type { FC } from "react";

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("access_token"));
};

export const ProtectedRoute: FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export const PublicRoute: FC = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};
