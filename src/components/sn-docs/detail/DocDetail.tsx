import React from "react";
import LeftSlideDoc from "./LeftSlide/LeftSlideDoc";
import { Box, Stack } from "@mui/material";

const DocDetail = () => {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 3 }}
      px={{ md: 3 }}
      pt={{ md: 1, lg: 1.5 }}
      pb={{ xs: 1.5, md: 1, lg: 1.5 }}
    >
      <LeftSlideDoc></LeftSlideDoc>
    </Stack>
  );
};

export default DocDetail;
