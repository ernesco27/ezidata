import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import style from "../styles/ProductCard.module.css";
import { usePaystackPayment } from "react-paystack";

function ProductCard({ volume, amount }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // if (!loading) {
  //   setSuccess(false);
  //   setLoading(true);
  //   timer.current = setTimeout(() => {
  //     setSuccess(true);
  //     setLoading(false);
  //   }, 900);
  // }

  function handlePayment() {
    console.log("payment modal launched");
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_25062f521ad4c442c1b5da503d2826fd46e91f99",
    currency: "GHS",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <div className={style.container}>
        <div>
          <p>Volume</p>
          <div>{volume}</div>
        </div>
        <div>
          <p>Amount </p>
          <div>{amount}</div>
        </div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              sx={buttonSx}
              disabled={loading}
              onClick={() => {
                initializePayment(onSuccess, onClose);
              }}
              size="small"
            >
              Buy
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export { ProductCard };
