import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utilities";

const PrivateRoute = () => {
  const authenticated = isTokenValid();

  return authenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
