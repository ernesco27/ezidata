import React from "react";
import style from "../styles/Home.module.css";
import { useState, useContext } from "react";
import { NetworkCard } from "./NetworkCard";
import { networkContext } from "./App";

function Home() {
  const { network } = useContext(networkContext);

  return (
    <div className={style.container}>
      <header>
        <div className={style.imageDiv}></div>
      </header>
      <main className={style.mainSection}>
        <h2>Available Networks</h2>
        {console.log(network)}

        <div className={style.networkContainer}>
          {network.map((item) => (
            <NetworkCard
              key={item.id}
              title={item.networkName}
              image={item.imageUrl}
              description={item.description}
              to={item.to}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export { Home };
