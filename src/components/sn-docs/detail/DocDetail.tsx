"use client";

import React, { useState } from "react";
import LeftSlideDoc from "./LeftSlide/LeftSlideDoc";
import { Box } from "@mui/material";
import EditDocs from "./EditDocs";
import PageBody from "../news/page-body";

export interface IDocDetail {
  openComment: boolean;
  openSlider: boolean;
  setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocDetail = ({
  openComment,
  setOpenComment,
  openSlider,
  setOpenSlider,
}: IDocDetail) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      position={"relative"}
      sx={{
        display: "flex",
        gap: { xs: open ? 3 : 0, md: 3 },
      }}
      px={{ md: 3 }}
      pt={{ md: 1, lg: 1.5 }}
      pb={{ xs: 1.5, md: 1, lg: 1.5 }}
    >
      <LeftSlideDoc open={open} setOpen={setOpen}></LeftSlideDoc>
      <PageBody
        openSlider={openSlider}
        setOpenSlider={setOpenSlider}
        openComment={openComment}
        setOpenComment={setOpenComment}
      ></PageBody>
    </Box>
  );
};

export default DocDetail;
