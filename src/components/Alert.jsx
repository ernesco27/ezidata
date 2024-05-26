import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import style from "../styles/Alert.module.css";

function AlertNote({ severity, message, onClose }) {
  return (
    <div className={style.alert}>
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {`${message}  `}{" "}
      </Alert>
      ;
    </div>
  );
}

export { AlertNote };
