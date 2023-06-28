"use client";

import { memo } from "react";
import { Stack, StackProps } from "@mui/material";

const Wrapper = (props: StackProps) => {
  const { children, ...rest } = props;

  return (
    <Stack p={{ xs: 1, sm: 3 }} flex={1} overflow="hidden" {...rest}>
      {children}
    </Stack>
  );
};

export default memo(Wrapper);
