import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import SearchIcon from "@mui/icons-material/Search";

function Table({ records, handleFilter, handleMarkAsProcessed }) {
  const columns = [
    {
      name: "Order Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Tracking No.",
      selector: (row) => row.reference,
    },
    {
      name: "Phone No.",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Network",
      selector: (row) => row.network,
    },
    {
      name: "Data Unit",
      selector: (row) => `${row.volume} ${row.unit}`,
    },
    {
      name: "Amount (GH¢)",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          title={row.processed ? "Sent" : "Mark"}
          onClick={() => handleMarkAsProcessed(row.reference)}
        />
      ),
    },
  ];

  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/orders");
  //       console.log("Orders retrieved successfully:", response.data);
  //       setRecords(response.data);
  //     } catch (error) {
  //       console.error("Error retrieving orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // const handleFilter = (e) => {
  //   const searchNumber = e.target.value;
  //   const newFilter = records.filter((row) => {
  //     return row.reference.includes(searchNumber);
  //   });

  //   setRecords(newFilter);
  // };

  // const handleMarkAsProcessed = (trackingNumber) => {
  //   // Handle marking the order as processed here
  //   console.log(
  //     `Order with tracking number ${trackingNumber} marked as processed`
  //   );
  // };

  const conditionalRowStyles = [
    {
      when: (row) => records.indexOf(row) % 2 === 1, // Apply the style to even rows
      style: {
        backgroundColor: "#bbf7d0", // Set background color for even rows
      },
    },
  ];

  return (
    <div>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <SearchIcon />
            </span>
          </div>
          <input
            type="number"
            className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2.5"
            placeholder="search tracking number"
            onChange={handleFilter}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={records}
        // selectableRows
        fixedHeader
        pagination
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}

export { Table };
