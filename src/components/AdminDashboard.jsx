import React from "react";
import { TempDrawer } from "./Drawer";
import { Table } from "./DataTable";

function AdminDashboard() {
  return (
    <div>
      <TempDrawer />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-4">
        <div className=" bg-cyan-400 h-36 rounded-md shadow-md">New Orders</div>
        <div className=" bg-lime-500 h-36 rounded-md shadow-md">
          Total sales
        </div>
        <div className=" bg-pink-400 h-36 rounded-md shadow-md">
          Total Order
        </div>
        <div className=" bg-fuchsia-500 h-36 rounded-md shadow-md">
          Total traffic
        </div>
        <div className=" bg-cyan-200 ">
          <p>Recent Orders</p>
          <div>
            <Table />
          </div>
        </div>
        <div className="bg-cyan-200 bg-teal-500 ">income overview</div>
      </div>
    </div>
  );
}

export { AdminDashboard };
