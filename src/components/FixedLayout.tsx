"use client";

import { memo } from "react";
import { Box, Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";

const FixedLayout = (props: StackProps) => {
  const { children, order, ...rest } = props;
  const { breakpoints } = useTheme();
  const is1440Larger = useMediaQuery(breakpoints.up(1441));

  return (
    <Stack
      width="100%"
      bgcolor={{ md: "background.default" }}
      order={order}
      sx={{
        height: "600px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Stack
        // maxWidth={1349}
        // maxWidth={1349}
        mx="auto"
        width="100%"
        flex={is1440Larger ? undefined : 1}
        bgcolor={{ md: "background.paper" }}
        {...rest}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(FixedLayout);
