"use client";

import { memo } from "react";
import { Stack, StackProps } from "@mui/material";

const Wrapper = (props: StackProps & { transparent?: boolean }) => {
  const { children, transparent, spacing, ...rest } = props;

  return (
    <Stack
      px={{ xs: 1, sm: 3 }}
      pb={{ xs: 1, sm: 3 }}
      pt={{ xs: 1, sm: 3 }}
      flex={1}
      overflow="hidden"
      {...rest}
    >
      <Stack
        flex={1}
        bgcolor={transparent ? "transparent" : "background.paper"}
        borderRadius={1}
        spacing={spacing}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(Wrapper);
