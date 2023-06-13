"use client";

import React, { memo } from "react";
import { Stack } from "@mui/material";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  return (
    <Stack
      flex={1}
      height={({ spacing }) => `calc(100vh - ${spacing(8 * 2)})`}
      m={8}
      direction="row"
      bgcolor="common.white"
    >
      {props.children}
    </Stack>
  );
};

export default memo(Wrapper);
