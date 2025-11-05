import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Protectedroute() {
  const isAuth = localStorage.getItem("token") && localStorage.getItem("role") == "user"

  if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
