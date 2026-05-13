import React from "react";
import { Route } from "react-router-dom";
import DashLayout from "../layouts/DashLayout";
import Dashboard from "../pages/protected/Dashboard";

const ProtectedRoute = ({ children }) => {
  return (
    <Route path="/dashboard" element={<DashLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
  );
};

export default ProtectedRoute;
