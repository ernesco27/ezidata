import React, { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { AdminNav } from "./AdminNav";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";
import axios from "axios";
import { AlertNote } from "./Alert";
import dotenv from "dotenv";

const networkContext = createContext({
  network: [],
  addNetwork: () => {},
  addPackage: () => {},
  sendOrder: () => {},
  username: "",

  addNetworkPackage: () => {},

  handleMarkAsProcessed: () => {},
  handleAllFilter: () => {},
  handleProcessedFilter: () => {},
  getWeeklyOrderCount: () => {},
  order: [],
  records: [],
  originalProcessedRecords: [],
  loadingNetwork: null,
  loadingPackage: null,
  alert: null,
  isAuthenticated: () => {},
  loggedUser: "",
});

function App() {
  const [network, setNetwork] = useState([]);
  const [networkPackage, setNetworkPackage] = useState([]);
  const [order, setOrder] = useState([]);
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);

  const [processedRecords, setProcessedRecords] = useState([]);
  const [originalProcessedRecords, setOriginalProcessedRecords] = useState([]);

  const [loadingNetwork, setLoadingNetwork] = useState(false);
  const [loadingPackage, setLoadingPackage] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("isAuthenticated");
  });

  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("username") || ""
  );

  const apiBaseUrl = "http://localhost:3000";
  //const apiBaseUrl = "https://ezidata-api.adaptable.app";

  useEffect(() => {
    const user = localStorage.getItem("username");
    setLoggedUser(user);
  }, [loggedUser]);

  const addNetwork = (networkName, imageUrl, description, to) => {
    const newNetwork = {
      _id: network.length
        ? Math.max(...network.map((item) => item._id)) + 1
        : 1,
      networkName,
      imageUrl,
      description,
      to,
    };

    try {
      const response = axios.post(apiBaseUrl, newNetwork);

      setNetwork((prevNetwork) => [...prevNetwork, newNetwork]);
      setAlert({
        severity: "success",
        message: "Network Added successfully",
      });
      setLoading(true);
    } catch (error) {
      console.error("Error adding newtork:", error);
      throw error;
    }
  };

  const addNetworkPackage = (network, unit, volume, price) => {
    const newNetworkPackage = {
      _id: networkPackage.length
        ? Math.max(...networkPackage.map((item) => item._id)) + 1
        : 1,
      network,
      unit,
      volume,
      price,
    };

    try {
      const response = axios.post(
        `${apiBaseUrl}/api/packages`,
        newNetworkPackage
      );

      setNetworkPackage((prevNetworkPackage) => [
        ...prevNetworkPackage,
        newNetworkPackage,
      ]);
      setAlert({
        severity: "success",
        message: "Package Saved!",
      });
    } catch (error) {
      console.error("Error sending package:", error);
      throw error;
    }
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
      const response = axios.post(`${apiBaseUrl}/api/orders`, newOrder);

      setOrder((prevOrder) => [...prevOrder, newOrder]);
      setAlert({
        severity: "success",
        message: `Order sent successfully.  Reference No: ${newOrder.reference}`,
      });
    } catch (error) {
      console.error("Error sending order:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/orders`);

        setRecords(response.data);
        setOriginalRecords(response.data);

        setProcessedRecords(response.data.filter((order) => !order.processed));
        setOriginalProcessedRecords(
          response.data.filter((order) => !order.processed)
        );
      } catch (error) {
        console.error("Error retrieving orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchNetworks = async () => {
      setLoadingNetwork(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/networks`);

        setNetwork(response.data);
      } catch (error) {
        console.error("Error retrieving networks:", error);
      } finally {
        setLoadingNetwork(false);
      }
    };

    fetchNetworks();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoadingPackage(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/packages`);

        setNetworkPackage(response.data);
      } catch (error) {
        console.error("Error retrieving networks:", error);
      } finally {
        setLoadingPackage(false);
      }
    };

    fetchPackages();
  }, []);

  const handleProcessedFilter = (e) => {
    const searchNumber = e.target.value;

    if (searchNumber === "") {
      setProcessedRecords(originalProcessedRecords);
    } else {
      const newFilter = originalProcessedRecords.filter((row) =>
        row.reference.includes(searchNumber)
      );
      setProcessedRecords(newFilter);
    }
  };

  const handleAllFilter = (e) => {
    const searchNumber = e.target.value;
    if (searchNumber === "") {
      setRecords(originalRecords);
    } else {
      const newFilter = originalRecords.filter((row) =>
        row.reference.includes(searchNumber)
      );
      setRecords(newFilter);
    }
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
      await axios.put(`${apiBaseUrl}/api/orders/${id}`, {
        processed: updatedStatus,
      });

      // Update the state
      setTimeout(() => {
        // Update the state
        setRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === id ? { ...record, processed: updatedStatus } : record
          )
        );

        setProcessedRecords((prevRecords) =>
          prevRecords
            .map((record) =>
              record._id === id
                ? { ...record, processed: updatedStatus }
                : record
            )
            .filter((order) => !order.processed)
        );

        setLoading(false);
      }, 800);

      setLoading(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  // Function to calculate weekly order count
  const getWeeklyOrderCount = () => {
    const orderCount = [0, 0, 0, 0, 0, 0, 0]; // Initialize order count for each day of the week (Sun-Sat)
    records.forEach((record) => {
      const [day, month, year] = record.date.split("/");
      const date = new Date(`${year}-${month}-${day}`);

      if (!isNaN(date.getTime())) {
        // Check if date is valid
        const dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)

        orderCount[dayOfWeek] += 1; // Increment the order count for the respective day
      }
    });

    return orderCount;
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

        handleAllFilter,
        handleProcessedFilter,
        alert,
        isAuthenticated,
        setIsAuthenticated,
        loadingNetwork,
        loadingPackage,
        getWeeklyOrderCount,
        loggedUser,
        setLoggedUser,
      }}
    >
      <div className={style.container}>
        <div className={style.nav}>
          {isAuthenticated ? <AdminNav /> : <NavBar />}
        </div>
        <div className={style.content}>
          {alert && (
            <AlertNote
              severity={alert.severity}
              message={alert.message}
              onClose={handleClose}
            />
          )}
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
