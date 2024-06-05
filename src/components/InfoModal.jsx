import React from "react";
import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";

import { usePaystackPayment } from "react-paystack";

import Alert from "@mui/material/Alert";

import { networkContext } from "./App";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

function InfoModal({ network, unit, amount, volume, onClose }) {
  const [open, setOpen] = useState(true);
  // const [alert, setAlert] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { order, sendOrder, alert } = useContext(networkContext);

  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  let day = currentDate.getDate();

  let date = `${day}/${month}/${year}`;

  const cancelButtonRef = useRef(null);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_25062f521ad4c442c1b5da503d2826fd46e91f99",
    currency: "GHS",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);

    sendOrder(
      reference.reference,
      phoneNumber,
      network,
      unit,
      volume,
      amount,
      date
    );
  };

  // you can call this function anything
  const onPaystackClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayNow = () => {
    initializePayment(onSuccess, onPaystackClose);
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose callback to reset state in parent component
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="lg:flex lg:items-start sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Package Details
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500 w-72">
                            {network}
                          </div>
                          <div className="text-sm text-gray-500 w-72">
                            {`${volume} ${unit}`}
                          </div>
                          <div className="text-sm text-gray-500 w-72">
                            {`GH¢ ${amount}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex w-full justify-center">
                    <FormControl variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Enter Receiving Phone Number
                      </InputLabel>
                      <BootstrapInput
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        //setOpen(false);
                        handleClose();
                        //initializePayment(onSuccess, onPaystackClose);
                        handlePayNow();
                      }}
                    >
                      Pay Now
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export { InfoModal };
