import React from "react";
import { AdminNav } from "./AdminNav";
import { Dashboard } from "./Dashboard";
import { Outlet } from "react-router-dom";

function AdminArea() {
  return (
    <div>
      <AdminNav />

      <Outlet />
    </div>
  );
}

export { AdminArea };
