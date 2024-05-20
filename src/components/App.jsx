import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { AdminNav } from "./AdminNav";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";

const networkContext = createContext({
  network: [],
  addNetwork: () => {},
  addPackage: () => {},
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
      volume: "35.57MB",
      amount: "1",
      id: 1,
    },
    {
      volume: "349.24MB",
      amount: "3",
      id: 2,
    },
    {
      volume: "718.91MB",
      amount: "10",
      id: 3,
    },
    {
      volume: "92.88GB",
      amount: "350",
      id: 4,
    },
  ];

  const [network, setNetwork] = useState(availableNetworks);
  const [networkPackage, setNetworkPackage] = useState(Packages);

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

  return (
    <networkContext.Provider
      value={{ network, addNetwork, networkPackage, addNetworkPackage }}
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
