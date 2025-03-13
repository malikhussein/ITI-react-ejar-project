import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../Store/Auth";

const ProtectedRoute = () => {
  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
