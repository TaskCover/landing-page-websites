"use client";

import { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";

const Wrapper = (
  props: StackProps & { transparent?: boolean; inFrame?: boolean },
) => {
  const { children, transparent, spacing, inFrame, ...rest } = props;

  return (
    <Stack
      px={{ xs: 1, sm: 3 }}
      pb={{ xs: 1, sm: 3 }}
      // pt={{ xs: 1, sm: 3 }}
      flex={1}
      overflow="hidden"
      {...rest}
    >
      <Box
        width="100%"
        minHeight={{ xs: 8, sm: 24 }}
        height={{ xs: 8, sm: 24 }}
        bgcolor="background.default"
        position="sticky"
        zIndex={1}
        top={0}
      />
      <Stack
        flex={1}
        bgcolor={transparent ? "transparent" : "background.paper"}
        borderRadius={1}
        spacing={spacing}
        overflow={inFrame ? "hidden" : "initial"}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(Wrapper);
