import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function Table({ records, handleFilter, handleMarkAsProcessed }) {
  const [loadingIds, setLoadingIds] = useState([]); // Track loading states for each order

  const markAsProcessed = async (reference) => {
    // Add the reference to the loadingIds array to show the spinner
    setLoadingIds((prev) => [...prev, reference]);
    setTimeout(async () => {
      await handleMarkAsProcessed(reference);
      // Remove the reference from the loadingIds array
      setLoadingIds((prev) => prev.filter((id) => id !== reference));
    }, 800); // 2 seconds delay
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Order Date",
      "Tracking No.",
      "Phone No.",
      "Network",
      "Data Unit",
      "Amount (GH¢)",
    ];
    const tableRows = [];

    records.forEach((record) => {
      const recordData = [
        record.date,
        record.reference,
        record.phoneNumber,
        record.network,
        `${record.volume} ${record.unit}`,
        record.price,
      ];
      tableRows.push(recordData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table.pdf");
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add header row
    worksheet.addRow([
      "Order Date",
      "Tracking No.",
      "Phone No.",
      "Network",
      "Data Unit",
      "Amount (GH¢)",
    ]);

    // Add data rows
    records.forEach((record) => {
      worksheet.addRow([
        record.date,
        record.reference,
        record.phoneNumber,
        record.network,
        `${record.volume} ${record.unit}`,
        record.price,
      ]);
    });

    // Generate Excel file buffer and save it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "table.xlsx");
  };

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
          title={
            loadingIds.includes(row.reference) ? (
              <CircularProgress size={24} />
            ) : row.processed ? (
              "Sent"
            ) : (
              "Mark"
            )
          }
          onClick={() => markAsProcessed(row.reference)}
          disabled={loadingIds.includes(row.reference)} // Disable button while loading
        />
      ),
    },
  ];

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
      <div className="flex justify-end mb-2">
        <button
          onClick={handleDownloadPDF}
          className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Excel
        </button>
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
