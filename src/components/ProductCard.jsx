import React, { useState, useEffect } from "react";

import { Button } from "./Button";

import style from "../styles/ProductCard.module.css";

import { InfoModal } from "./InfoModal";

function ProductCard({ volume, amount, onBuyNow }) {
  const [showModal, setShowModal] = useState(false);

  const handleInfo = () => {
    console.log("info modal launched");
    setShowModal(!showModal);
  };

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
        <Button onClick={onBuyNow} title="Buy Now" />
      </div>
      {/* {showModal && <InfoModal />} */}
    </div>
  );
}

export { ProductCard };
