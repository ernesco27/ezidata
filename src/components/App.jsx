import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import style from "../styles/App.module.css";

function App() {
  return (
    <div>
      <div className={style.nav}>
        <NavBar />
      </div>
      <div className="">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export { App };
