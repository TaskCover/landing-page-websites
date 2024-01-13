"use client";

import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { Header } from "./components/Header";
import { BuildingTrust } from "./components/Building";
import useBreakpoint from "hooks/useBreakpoint";

const TrustCenter = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack position="relative">
      <Stack
        sx={{
          backgroundImage: isMdSmaller
            ? "url(/images/bg-header-help-center-mobile.png)"
            : "url(/images/bg-header-help-center.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: -1,
        }}
      />
      <Stack />
      <Container>
        <Header />
        <BuildingTrust />
      </Container>
    </Stack>
  );
};

export default memo(TrustCenter);
