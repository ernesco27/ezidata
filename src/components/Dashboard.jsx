import React, { useContext, useEffect, useState } from "react";
import { Table } from "./DataTable";
import { Chart } from "./Chart";
import { Analytics } from "./Analytics";
import { networkContext } from "./App";

function Dashboard() {
  const {
    records,
    processedRecords,
    handleMarkAsProcessed,
    handleProcessedFilter,
    getWeeklyOrderCount,
    loggedUser,
  } = useContext(networkContext);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    //calculate sales from records

    const totalAmount = records.reduce(
      (total, record) => total + Number(record.price),
      0
    );

    setTotalSales(totalAmount);
  }, [records]);

  const storedUsername = localStorage.getItem("username");

  return (
    <div>
      <p className="mt-20 ml-8 text-lg  sm:text-2xl font-semibold">
        Welcome, {loggedUser || storedUsername}!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 mt-15">
        <div className="pl-7 bg-cyan-400 h-36 rounded-md shadow-md">
          <Analytics
            title="New Orders"
            count={processedRecords.length}
            percentage={5}
            extra="60"
            isLoss
            color="warning"
          />
        </div>
        <div className="pl-7 bg-lime-500 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Sales"
            unit="GH¢"
            count={totalSales}
            percentage={6.5}
            extra="GH¢100"
          />
        </div>
        <div className="pl-7 bg-pink-400 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Orders"
            count={records.length}
            percentage={10}
            extra="60"
          />
        </div>
        <div className="pl-7 bg-fuchsia-500 h-36 rounded-md shadow-md">
          <Analytics
            title="Total Site Visits"
            count={500}
            percentage={22}
            extra="160"
          />
        </div>
        <div className="md:col-span-3  ">
          <p className="text-center font-medium">Recent Orders</p>
          <div>
            <Table
              records={processedRecords}
              handleFilter={handleProcessedFilter}
              handleMarkAsProcessed={handleMarkAsProcessed}
            />
          </div>
        </div>
        <div className="bg-cyan-200 bg-teal-500 rounded-md ">
          <Chart orderCount={getWeeklyOrderCount()} />
        </div>
      </div>
    </div>
  );
}

export { Dashboard };
