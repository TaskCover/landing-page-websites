import React from "react";
import LeftSlideDoc from "./LeftSlide/LeftSlideDoc";
import { Box, Stack } from "@mui/material";
import EditDocs from "./EditDocs";

const DocDetail = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 2, md: 3 },
      }}
      px={{ md: 3 }}
      pt={{ md: 1, lg: 1.5 }}
      pb={{ xs: 1.5, md: 1, lg: 1.5 }}
    >
      <LeftSlideDoc></LeftSlideDoc>
      <EditDocs></EditDocs>
    </Box>
  );
};

export default DocDetail;
