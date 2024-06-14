import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import style from "../styles/Alert.module.css";

function AlertNote({ severity, message, onClose }) {
  return (
    <div
      className={
        "z-10 fixed top-0 left-0 right-0 text-center translate-y-14 animate-slide md:max-w-lg md:mx-auto "
      }
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {`${message}  `}{" "}
      </Alert>
      ;
    </div>
  );
}

export { AlertNote };
