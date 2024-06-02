import React, { useState, useEffect } from "react";

import { Button } from "./Button";

import style from "../styles/ProductCard.module.css";

import { InfoModal } from "./InfoModal";

function ProductCard({ volume, price, unit, onBuyNow }) {
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
          <div>{`${volume} ${unit}`}</div>
        </div>
        <div>
          <p>Price </p>
          <div>GH¢{price}</div>
        </div>
        <Button onClick={onBuyNow} title="Buy Now" />
      </div>
    </div>
  );
}

export { ProductCard };
