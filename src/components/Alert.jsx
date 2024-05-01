import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function AlertNote({ item, severity, message }) {
  return (
    <div className="alert">
      <Alert
        variant="filled"
        severity={severity}
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >{`${message}  `}</Alert>
      ;
    </div>
  );
}

export { AlertNote };
