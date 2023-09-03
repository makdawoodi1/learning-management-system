import React, { useContext } from "react";
import AuthContext from "@/context/context";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireToken = () => {
  const { shortToken } = useContext(AuthContext);
  const location = useLocation();

  return shortToken || location.pathname === 'reset-password' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireToken;
