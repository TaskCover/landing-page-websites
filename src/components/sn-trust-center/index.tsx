"use client";

import { Stack } from "@mui/material";
import { memo } from "react";
import { Header } from "./components/Header";
import { BuildingTrust } from "./components/Building";

const TrustCenter = () => {
  return (
    <Stack width="100%"
      sx={{
        backgroundImage: "url(/images/trust-center-bg.webp)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <Stack
      />
      <Header />
      <BuildingTrust />
    </Stack>
  );
};

export default memo(TrustCenter);
