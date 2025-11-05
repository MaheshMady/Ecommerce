import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedroute() {
  const isAuth = localStorage.getItem("token") && localStorage.getItem("role") == "admin"

  if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
