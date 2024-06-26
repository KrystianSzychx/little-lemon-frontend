import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/hooks/AuthProvider";


const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/SignIn" />;
  return <Outlet />;
};

export default PrivateRoute;