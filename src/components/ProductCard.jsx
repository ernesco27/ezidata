import React, { useState, useEffect } from "react";

import { Button } from "./Button";

import style from "../styles/ProductCard.module.css";

import { InfoModal } from "./InfoModal";

function ProductCard({ volume, price, unit, onBuyNow, delay }) {
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass("animate-slideUp");
  }, []);

  const handleInfo = () => {
    console.log("info modal launched");
    setShowModal(!showModal);
  };

  return (
    <div>
      <div
        className={`${animationClass} flex flex-wrap w-[85vw] justify-around items-center gap-8 shadow-md mx-auto my-8 p-2 md:w-[60vw] md:mb-2`}
        style={{ animationDelay: `${delay}s` }}
      >
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
