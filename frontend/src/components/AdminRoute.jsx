import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem("adminLoggedIn");

  if (isAdminLoggedIn !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;