import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { networkContext } from "./App";
import { ProductCard } from "../components/ProductCard";
import style from "../styles/PackageDetails.module.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { InfoModal } from "./InfoModal";

function PackageDetails() {
  const { networkName } = useParams();
  const { network, networkPackage, loadingPackage } =
    useContext(networkContext);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedNetwork = network.find((net) => {
    return net.networkName.toLowerCase() === networkName.toLowerCase(); // Ensure case-insensitivity
  });

  // if (!selectedNetwork) {
  //   return (
  //     <div>
  //       <Stack>
  //         <Skeleton variant="rectangular" width={500} height={118} />
  //       </Stack>
  //     </div>
  //   );
  // }

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const filteredPackages = networkPackage.filter(
    (pkg) => pkg.network.toLowerCase() === networkName.toLowerCase()
  );

  return (
    <div>
      <header
        className={
          networkName === "MTN"
            ? style.mtnHeader
            : networkName === "AT"
            ? style.atHeader
            : style.telecelHeader
        }
      ></header>
      {loadingPackage ? (
        <div className={style.skeleton}>
          <div>
            <Stack>
              <Skeleton variant="rounded" width={345} height={50} />
            </Stack>
          </div>
          <div>
            <Stack>
              <Skeleton variant="rounded" width={345} height={50} />
            </Stack>
          </div>
          <div>
            <Stack>
              <Skeleton variant="rounded" width={345} height={50} />
            </Stack>
          </div>
          <div>
            <Stack>
              <Skeleton variant="rounded" width={345} height={50} />
            </Stack>
          </div>
          <div>
            <Stack>
              <Skeleton variant="rounded" width={345} height={50} />
            </Stack>
          </div>
        </div>
      ) : (
        filteredPackages.map((item, index) => (
          <ProductCard
            key={item._id}
            volume={item.volume}
            price={item.price}
            unit={item.unit}
            onBuyNow={() => handleBuyNow(item)}
            delay={index * 0.2}
          />
        ))
      )}
      {selectedProduct && (
        <InfoModal
          network={selectedNetwork.networkName}
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
