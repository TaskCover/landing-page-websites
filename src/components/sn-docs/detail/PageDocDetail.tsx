"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import HeaderDocDetail from "./HeaderDocDetail";
import DocDetail from "./DocDetail";
import { NewPageContextProvider } from "../news/context/NewPageContext";
import { ThemeProvider } from "../news/context/ThemeContext";

const PageDocDetail = () => {
  const [openComment, setOpenComment] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  return (
    <ThemeProvider>
      <NewPageContextProvider>
        <Box
          sx={{
            margin: {
              sm: "24px",
              xs: "0px",
            },
          }}
        >
          <HeaderDocDetail
            openComment={openComment}
            setOpenComment={setOpenComment}
            openSlider={openSlider}
            setOpenSlider={setOpenSlider}
          ></HeaderDocDetail>
          <DocDetail
            openComment={openComment}
            setOpenComment={setOpenComment}
            openSlider={openSlider}
            setOpenSlider={setOpenSlider}
          ></DocDetail>
        </Box>
      </NewPageContextProvider>
    </ThemeProvider>
  );
};

export default PageDocDetail;
