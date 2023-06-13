"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import AuthBgImage from "public/images/img-auth-banner.webp";
import Image from "next/image";

type BannerProps = {};

const Banner = (props: BannerProps) => {
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
