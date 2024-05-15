import React from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Button } from "./Button";
import SearchIcon from "@mui/icons-material/Search";

function Table() {
  const columns = [
    {
      name: "Tracking No.",
      selector: (row) => row.tracking,
      sortable: true,
    },
    {
      name: "Phone No.",
      selector: (row) => row.phone,
    },
    {
      name: "Network",
      selector: (row) => row.network,
    },
    {
      name: "Data Unit",
      selector: (row) => row.data,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          title={"Mark"}
          onClick={() => handleMarkAsProcessed(row.tracking)}
        />
      ),
    },
  ];

  const data = [
    {
      tracking: "1234567890",
      phone: "1234567890",
      network: "MTN",
      data: "1GB",
      amount: "GH¢10",
    },
    {
      tracking: "1234567891",
      phone: "1234567890",
      network: "MTN",
      data: "10GB",
      amount: "GH¢100",
    },
    {
      tracking: "1234567892",
      phone: "1234567892",
      network: "AT",
      data: "5GB",
      amount: "GH¢50",
    },
    {
      tracking: "1234567897",
      phone: "1234567896",
      network: "TELECEL",
      data: "20GB",
      amount: "GH¢500",
    },
    {
      tracking: "1234567898",
      phone: "1234567890",
      network: "MTN",
      data: "2GB",
      amount: "GH¢5",
    },
  ];

  const [records, setRecords] = useState(data);

  const handleFilter = (e) => {
    const searchNumber = e.target.value;
    const newFilter = records.filter((row) => {
      return row.tracking.includes(searchNumber);
    });

    setRecords(newFilter);
  };

  const handleMarkAsProcessed = (trackingNumber) => {
    // Handle marking the order as processed here
    console.log(
      `Order with tracking number ${trackingNumber} marked as processed`
    );
  };

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
