import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { AdminNav } from "./AdminNav";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";

const networkContext = createContext({
  network: [],
});

function App() {
  const [adminLog, setAdminLog] = useState(true);

  const availableNetworks = [
    {
      networkName: "MTN",
      imageUrl: "src/assets/mtn.jpg",
      description: "Click to view all MTN packages",
      id: uuidv4(),
      to: "/Mtn",
    },
    {
      networkName: "AirtelTigo",
      imageUrl: "src/assets/airteltigo.jpg",
      description: "Click to view all AirtelTigo packages",
      id: uuidv4(),
      to: "Airteltigo",
    },
  ];

  const [network, setNetwork] = useState(availableNetworks);

  return (
    <networkContext.Provider value={{ network }}>
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
