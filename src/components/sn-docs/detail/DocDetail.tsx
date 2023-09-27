"use client";

import React, { useState } from "react";
import LeftSlideDoc from "./LeftSlide/LeftSlideDoc";
import { Box, Stack } from "@mui/material";
import EditDocs from "./EditDocs";

const DocDetail = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: open ? 3 : 1, md: 3 },
      }}
      px={{ md: 3 }}
      pt={{ md: 1, lg: 1.5 }}
      pb={{ xs: 1.5, md: 1, lg: 1.5 }}
    >
      <LeftSlideDoc open={open} setOpen={setOpen}></LeftSlideDoc>
      <EditDocs open={open}></EditDocs>
    </Box>
  );
};

export default DocDetail;
