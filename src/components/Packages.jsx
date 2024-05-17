import React, { useState, useContext } from "react";
import { NetworkCard } from "./NetworkCard";
import { networkContext } from "./App";
import style from "../styles/Packages.module.css";

function Packages() {
  const { network } = useContext(networkContext);

  return (
    <div className={style.container}>
      <div className={style.mainSection}>
        <h1>Packages</h1>
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
      </div>
    </div>
  );
}

export { Packages };
