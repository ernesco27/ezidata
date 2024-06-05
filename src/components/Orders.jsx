import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Table } from "./DataTable";

import { networkContext } from "./App";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const {
    records,
    processedRecords,
    filteredRecords,
    handleMarkAsProcessed,
    handleAllFilter,
    handleProcessedFilter,
  } = useContext(networkContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="New Orders" {...a11yProps(0)} />
          <Tab label="All Orders" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Table
          records={processedRecords}
          handleFilter={handleProcessedFilter}
          handleMarkAsProcessed={handleMarkAsProcessed}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Table
          records={records}
          handleFilter={handleAllFilter}
          handleMarkAsProcessed={handleMarkAsProcessed}
        />
      </CustomTabPanel>
    </Box>
  );
}
