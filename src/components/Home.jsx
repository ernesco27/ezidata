import React from "react";
import style from "../styles/Home.module.css";
import { useState } from "react";
import { NetworkCard } from "./NetworkCard";
import { v4 as uuidv4 } from "uuid";

function Home() {
  // const [networks, setNetworks] = useState([]);
  // let networkInput;

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // Check if input field is empty
  //   if (!networkInput.value.trim()) return;

  //   // Push new network to state array and reset the form
  //   setNetworks([...networks, networkInput.value]);
  //   networkInput.value = "";
  // }

  let availableNetworks = [
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
    <div className={style.container}>
      <header>
        <div className={style.imageDiv}></div>
      </header>
      <main className={style.mainSection}>
        <h2>Available Networks</h2>
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
