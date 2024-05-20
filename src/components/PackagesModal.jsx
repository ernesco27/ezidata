import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import SendIcon from "@mui/icons-material/Send";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { networkContext } from "./App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  "& .MuiTextField-root": { m: 1.5, width: "32ch" },
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
};

const unit = ["TB", "GB", "MB"];

function PackagesModal({ packagesModal, handlePackage, handleClosePackage }) {
  const { network, networkPackage, addNetworkPackage } =
    useContext(networkContext);

  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [volume, setVolume] = useState("");
  const [packageUnit, setPackageUnit] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  const handleSave = () => {
    addNetworkPackage(selectedNetwork, packageUnit, volume, price);
    handleClosePackage();
  };

  return (
    <div>
      <Modal
        open={packagesModal}
        onClose={handleClosePackage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <h1 className="font-semibold text-lg text-center">Add Package</h1>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Network
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedNetwork}
              onChange={handleChange}
              autoWidth
              label="Network"
              size="small"
            >
              {network.map((net) => (
                <MenuItem key={net.id} value={net.networkName}>
                  {net.networkName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-select-currency"
            select
            label="Package Unit"
            defaultValue="GB"
            size="small"
            value={packageUnit}
            onChange={(e) => setPackageUnit(e.target.value)}
          >
            {unit.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-search"
            label="Volume"
            type="number"
            size="small"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          <TextField
            id="outlined-search"
            label="Price"
            type="number"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Button
            onClick={handleSave}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Save package
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export { PackagesModal };
