"use client";

import { Stack } from "@mui/material";
import { memo } from "react";
import { Header } from "./components/Header";
import { BuildingTrust } from "./components/Building";

const TrustCenter = () => {
  return (
    <Stack>
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          right: {md: "-50px", xs: 0},
          zIndex: -1,
        }}
      />
      <Header />
      <BuildingTrust />
    </Stack>
  );
};

export default memo(TrustCenter);
