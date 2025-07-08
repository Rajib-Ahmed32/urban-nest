import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminDashboardLayout;
