import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function AlertNote({ severity, message }) {
  return (
    <div className="alert z-50">
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
