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

  return (
    <networkContext.Provider
      value={{
        network,
        addNetwork,
        networkPackage,
        addNetworkPackage,
        order,
        sendOrder,
      }}
    >
      <div>
        <div className={style.nav}>{adminLog ? <AdminNav /> : <NavBar />}</div>
        <div className="">
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
