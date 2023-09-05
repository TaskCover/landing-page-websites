"use client";

import { Box } from "@mui/material";
import React from "react";
import HeaderMobile from "./components/HeaderMobile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

interface Props {
  children: React.ReactNode;
}
const styleIcon = { color: "white", fontSize: "24px", cursor: "pointer" };
const ChattingRoomMobileLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderMobile
        title="Chat"
        prefix={<ArrowBackIosNewIcon sx={styleIcon} />}
        suffix={<ControlPointIcon sx={styleIcon} />}
      />
      {children}
    </Box>
  );
};

export default ChattingRoomMobileLayout;
