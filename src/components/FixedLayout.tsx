"use client";

import { memo } from "react";
import { Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";

const FixedLayout = (props: StackProps) => {
  const { children, ...rest } = props;
  const { breakpoints } = useTheme();
  const is1440Larger = useMediaQuery(breakpoints.up(1441));

  return (
    <Stack width="100%" flex={1} overflow="hidden" bgcolor="background.default">
      <Stack
        maxWidth={1349}
        mx="auto"
        width="100%"
        flex={is1440Larger ? undefined : 1}
        bgcolor="background.paper"
        overflow="hidden"
        {...rest}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(FixedLayout);
