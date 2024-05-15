import React from "react";
import { TempDrawer } from "./Drawer";
import { Table } from "./DataTable";
import { Chart } from "./Chart";

import { Analytics } from "./Analytics";

function AdminDashboard() {
  return (
    <div>
      <TempDrawer />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6">
        <div className="pl-7 bg-cyan-400 h-36 rounded-md shadow-md">
          <Analytics
            title="New Orders"
            count="50"
            percentage={5}
            extra="60"
            isLoss
            color="warning"
          />
        </div>
        <div className="pl-7 bg-lime-500 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Sales"
            count="GH¢500"
            percentage={6.5}
            extra="GH¢100"
          />
        </div>
        <div className="pl-7 bg-pink-400 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Orders"
            count="150"
            percentage={10}
            extra="60"
          />
        </div>
        <div className="pl-7 bg-fuchsia-500 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Site Visits"
            count="500"
            percentage={22}
            extra="160"
          />
        </div>
        <div className="md:col-span-3  ">
          <p className="text-center font-medium">Recent Orders</p>
          <div>
            <Table />
          </div>
        </div>
        <div className="bg-cyan-200 bg-teal-500 rounded-md ">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export { AdminDashboard };
