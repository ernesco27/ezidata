import React, { useState, useContext } from "react";
import { NetworkCard } from "./NetworkCard";
import { networkContext } from "./App";
import style from "../styles/Packages.module.css";

import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function Packages() {
  const { network, addNetwork } = useContext(networkContext);

  return (
    <div className={style.container}>
      <div className={style.mainSection}>
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<SendIcon />}>
              Add Network
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
              Add Package
            </Button>
          </Stack>
        </div>
        <h1>Packages</h1>

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
