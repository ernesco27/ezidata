import React from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Button } from "./Button";

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
          title={"Process"}
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

  return (
    <div>
      <div className="text-end">
        <input type="number" onChange={handleFilter} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        // selectableRows
        fixedHeader
        pagination
      />
    </div>
  );
}

export { Table };
