import React, { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { AdminNav } from "./AdminNav";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";
import axios from "axios";

const networkContext = createContext({
  network: [],
  addNetwork: () => {},
  addPackage: () => {},
  sendOrder: () => {},
});

function App() {
  const [adminLog, setAdminLog] = useState(true);

  const availableNetworks = [
    {
      networkName: "MTN",
      imageUrl: "/src/assets/mtn.jpg",
      description: "Click to view all MTN packages",
      id: 1,
    },
    {
      networkName: "AirtelTigo",
      imageUrl: "/src/assets/airteltigo.jpg",
      description: "Click to view all AirtelTigo packages",
      id: 2,
    },
  ];

  const Packages = [
    {
      network: "MTN",
      volume: "35.57",
      price: "1",
      id: 1,
      unit: "MB",
    },
    {
      network: "MTN",
      volume: "349.24",
      price: "3",
      id: 2,
      unit: "MB",
    },
    {
      network: "AirtelTigo",
      volume: "718.91",
      price: "10",
      id: 3,
      unit: "MB",
    },
    {
      network: "MTN",
      volume: "92.88",
      price: "350",
      id: 4,
      unit: "GB",
    },
  ];

  const [network, setNetwork] = useState(availableNetworks);
  const [networkPackage, setNetworkPackage] = useState(Packages);
  const [order, setOrder] = useState([]);
  const [records, setRecords] = useState([]);
  const [processedRecords, setProcessedRecords] = useState([]);

  const addNetwork = (networkName, imageUrl, description, to) => {
    const newNetwork = {
      id: network.length ? Math.max(...network.map((item) => item.id)) + 1 : 1,
      networkName,
      imageUrl,
      description,
      to,
    };
    setNetwork((prevNetwork) => [...prevNetwork, newNetwork]);
  };

  const addNetworkPackage = (network, unit, volume, price) => {
    const newNetworkPackage = {
      id: networkPackage.length
        ? Math.max(...networkPackage.map((item) => item.id)) + 1
        : 1,
      network,
      unit,
      volume,
      price,
    };
    setNetworkPackage((prevNetworkPackage) => [
      ...prevNetworkPackage,
      newNetworkPackage,
    ]);
  };

  const sendOrder = async (
    reference,
    phoneNumber,
    network,
    unit,
    volume,
    price,
    date
  ) => {
    const newOrder = {
      _id: reference,
      reference,
      phoneNumber,
      network,
      unit,
      volume,
      price,
      processed: false,
      date,
    };

    try {
      const response = axios.post("http://localhost:3000/api/orders", newOrder);
      console.log("Order sent successfully:", response.data);

      setOrder((prevOrder) => [...prevOrder, newOrder]);
    } catch (error) {
      console.error("Error sending order:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders");
        console.log("Orders retrieved successfully:", response.data);
        setRecords(response.data);
        setProcessedRecords(response.data.filter((order) => !order.processed));
      } catch (error) {
        console.error("Error retrieving orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilter = (e) => {
    const searchNumber = e.target.value;
    const newFilter = records.filter((row) => {
      return row.reference.includes(searchNumber);
    });

    setRecords(newFilter);
  };

  const handleMarkAsProcessed = async (id) => {
    // Find the order by reference
    const orderToUpdate = records.find((record) => record._id === id);

    if (!orderToUpdate) {
      console.error("Order not found");
      return;
    }

    // Toggle the processed status
    const updatedStatus = !orderToUpdate.processed;

    try {
      // Update the order status in the backend
      await axios.put(`http://localhost:3000/api/orders/${id}`, {
        processed: updatedStatus,
      });

      // Update the state
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.reference === id
            ? { ...record, processed: updatedStatus }
            : record
        )
      );

      console.log(
        `Order with tracking number ${id} marked as ${
          updatedStatus ? "processed" : "unprocessed"
        }`
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <networkContext.Provider
      value={{
        network,
        addNetwork,
        networkPackage,
        addNetworkPackage,
        order,
        sendOrder,
        records,
        handleMarkAsProcessed,
        processedRecords,
        handleFilter,
      }}
    >
      <div className={style.container}>
        <div className={style.nav}>{adminLog ? <AdminNav /> : <NavBar />}</div>
        <div className={style.content}>
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </networkContext.Provider>
  );
}

export { App, networkContext };
