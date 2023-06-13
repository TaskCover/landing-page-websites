"use client";

import { memo } from "react";
import { Stack } from "@mui/material";

const Banner = () => {
  return (
    <Stack
      flex={1}
      sx={{
        background:
          "url('/images/img-auth-banner.webp') no-repeat center center",
        backgroundSize: "cover",
      }}
    ></Stack>
  );
};

export default memo(Banner);
