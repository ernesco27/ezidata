import React, { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { InfoModal } from "./InfoModal";

function Mtn() {
  let mtnPackages = [
    {
      volume: "35.57MB",
      amount: "1",
      id: uuidv4(),
    },
    {
      volume: "349.24MB",
      amount: "3",
      id: uuidv4(),
    },
    {
      volume: "718.91MB",
      amount: "10",
      id: uuidv4(),
    },
    {
      volume: "92.88GB",
      amount: "350",
      id: uuidv4(),
    },
  ];

  const [mtnData, setMtnData] = useState(mtnPackages);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };
  return (
    <div>
      <header>
        <img className="" src="src/assets/mtn.jpg" alt="" />
      </header>

      {mtnData.map((item) => (
        <ProductCard
          key={item.id}
          volume={item.volume}
          amount={item.amount}
          onBuyNow={() => handleBuyNow(item)}
        />
      ))}
      {selectedProduct && (
        <InfoModal
          volume={selectedProduct.volume}
          amount={selectedProduct.amount}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export { Mtn };
