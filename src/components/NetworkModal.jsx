import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import SendIcon from "@mui/icons-material/Send";

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

function NetworkModal({ networkModal, handleNetwork, handleClose }) {
  const { network, addNetwork } = useContext(networkContext);

  return (
    <div>
      <Modal
        open={networkModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <h1 className="font-semibold text-lg text-center">Add Network</h1>
          <TextField
            id="outlined-search"
            label="Network Name"
            type="search"
            size="small"
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            size="small"
          />

          <Divider>
            <Chip label="Cover Image" size="small" />
          </Divider>

          <input
            type="file"
            name="network-pic"
            id="network-pic"
            className="my-6"
          />
          <Button
            onClick={handleClose}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Save Network
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export { NetworkModal };
