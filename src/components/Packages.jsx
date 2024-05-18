import React, { useState, useContext } from "react";
import { NetworkCard } from "./NetworkCard";
import { networkContext } from "./App";
import style from "../styles/Packages.module.css";
import { NetworkModal } from "./NetworkModal";
import { PackagesModal } from "./PackagesModal";

import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function Packages() {
  const { network, addNetwork } = useContext(networkContext);
  const [networkModal, setNetworkModal] = useState(false);
  const [packagesModal, setPackagesModal] = useState(false);

  const handleNetwork = () => {
    setNetworkModal(true);
  };

  const handlePackage = () => {
    setPackagesModal(true);
  };

  const handleClosePackage = () => {
    setPackagesModal(false);
  };

  const handleClose = () => setNetworkModal(false);

  return (
    <div className={style.container}>
      <div className={style.mainSection}>
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<SendIcon />}
              onClick={handleNetwork}
            >
              Add Network
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handlePackage}
            >
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
        {networkModal && (
          <NetworkModal
            networkModal={networkModal}
            handleNetwork={handleNetwork}
            handleClose={handleClose}
          />
        )}
        {packagesModal && (
          <PackagesModal
            packagesModal={packagesModal}
            handleClosePackage={handleClosePackage}
          />
        )}
      </div>
    </div>
  );
}

export { Packages };
