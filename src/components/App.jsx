import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { AdminNav } from "./AdminNav";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";

const networkContext = createContext({
  network: [],
  addNetwork: () => {},
});

function App() {
  const [adminLog, setAdminLog] = useState(true);

  const availableNetworks = [
    {
      networkName: "MTN",
      imageUrl: "/src/assets/mtn.jpg",
      description: "Click to view all MTN packages",
      id: 1,
      to: "/Mtn",
    },
    {
      networkName: "AirtelTigo",
      imageUrl: "/src/assets/airteltigo.jpg",
      description: "Click to view all AirtelTigo packages",
      id: 2,
      to: "Airteltigo",
    },
  ];

  const [network, setNetwork] = useState(availableNetworks);

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

  return (
    <networkContext.Provider value={{ network, addNetwork }}>
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
