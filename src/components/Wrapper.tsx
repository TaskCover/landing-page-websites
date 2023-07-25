"use client";

import { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import useTheme from "hooks/useTheme";
import useBreakpoint from "hooks/useBreakpoint";

const Wrapper = (
  props: StackProps & { transparent?: boolean; inFrame?: boolean },
) => {
  const { children, transparent, spacing, inFrame, ...rest } = props;
  const { isDarkMode } = useTheme();
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      px={{ xs: 2, xl: 3 }}
      pb={{ xs: 1, sm: 3 }}
      // pt={{ xs: 1, sm: 3 }}
      flex={1}
      overflow="hidden"
      bgcolor={
        isMdSmaller && !isDarkMode ? "transparent" : "background.default"
      }
      {...rest}
    >
      <Box
        width="100%"
        minHeight={{ xs: 16, xl: 24 }}
        height={{ xs: 16, xl: 24 }}
        bgcolor={{ md: "background.default" }}
        position="sticky"
        zIndex={12}
        top={0}
      />
      <Stack
        flex={1}
        bgcolor={transparent ? "transparent" : { md: "background.paper" }}
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
