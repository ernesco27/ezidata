import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { networkContext } from "./App";
import { ProductCard } from "../components/ProductCard";

import { InfoModal } from "./InfoModal";

function PackageDetails() {
  const { networkName } = useParams();
  const { network, networkPackage, addNetworkPackage } =
    useContext(networkContext);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedNetwork = network.find((net) => {
    return net.networkName.toLowerCase() === networkName.toLowerCase(); // Ensure case-insensitivity
  });

  if (!selectedNetwork) {
    return <div>Network not found</div>;
  }

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const filteredPackages = networkPackage.filter(
    (pkg) => pkg.network.toLowerCase() === networkName.toLowerCase()
  );

  if (filteredPackages.length === 0) {
    return <div>No packages found for {networkName}</div>;
  }

  return (
    <div>
      <header>
        <img className="" src="/src/assets/mtn.jpg" alt="" />
      </header>
      {filteredPackages.map((item) => (
        <ProductCard
          key={item.id}
          volume={item.volume}
          price={item.price}
          unit={item.unit}
          onBuyNow={() => handleBuyNow(item)}
        />
      ))}
      {selectedProduct && (
        <InfoModal
          volume={selectedProduct.volume}
          amount={selectedProduct.price}
          unit={selectedProduct.unit}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export { PackageDetails };
