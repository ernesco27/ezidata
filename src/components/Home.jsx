import React from "react";
import style from "../styles/Home.module.css";
import { useState, useContext } from "react";
import { NetworkCard } from "./NetworkCard";
import { networkContext } from "./App";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { SlideShow } from "./SlideShow";

const slides = [
  {
    image: "/images/large-header.png",
    alt: "header image with social logos",
  },
  {
    image: "/images/large-header2.png",
    alt: "header image",
  },
  {
    image: "/images/large-header3.png",
    alt: "header image",
  },
  {
    image: "/images/large-header4.png",
    alt: "header image",
  },
];

function Home() {
  const { network, loadingNetwork } = useContext(networkContext);

  return (
    <div className={style.container}>
      <header>
        <div className={style.imageDiv}>
          <SlideShow slides={slides} />
          {/* <img
            src="/images/large-header.png"
            alt="header image with social logos"
          /> */}
        </div>
      </header>
      <main className={style.mainSection}>
        <h2>Available Networks</h2>

        <div className={style.networkContainer}>
          {loadingNetwork ? (
            <div className={style.skeleton}>
              <div>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={345} height={118} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rounded" width={345} height={60} />
                </Stack>
              </div>
              <div>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={345} height={118} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rounded" width={345} height={60} />
                </Stack>
              </div>
              <div>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={345} height={118} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rounded" width={345} height={60} />
                </Stack>
              </div>
            </div>
          ) : (
            network.map((item) => (
              <NetworkCard
                key={item._id}
                title={item.networkName}
                image={item.imageUrl}
                description={item.description}
                to={item.to}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export { Home };
