"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";

const Banner = () => {
  return (
    <Stack
      flex={1}
      sx={{
        background:
          "url('/images/img-auth-banner.webp') no-repeat center center",
        backgroundSize: "cover",
      }}
      display={{ xs: "none", sm: "flex" }}
      alignItems="center"
    >
      <Text
        mt={6}
        textAlign="center"
        fontWeight={600}
        variant={{ sm: "subtitle1", lg: "h3" }}
        color="common.white"
      >
        Bắt đầu dự án
        <br />
        với những tiện ích của Taskcover
      </Text>
    </Stack>
  );
};

export default memo(Banner);
