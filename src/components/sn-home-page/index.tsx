"use client";
import { Stack } from "@mui/material";
import { memo } from "react";
import EmpowerDifferentLayout from "./components/empower-different-layout";
import ExploreLayout from "./components/explore-layout";
import FullyObtimizeLayout from "./components/fully-optimize-layout";
import HeadLayout from "./components/head-layout";
import ManageProjectLayout from "./components/manage-project-layout";
import PowerfulAgentLayout from "./components/powerful-agent-layout";


import { SendMailLayout } from "components/sn-send-email";
import SwapToolsLayout from "./components/swap-tools-layout";
import TaskCoverLayout from "./components/task-cover-layout";

type HomePageProps = {};

const HomePage = (props: HomePageProps) => {
  return (
    <Stack overflow="hidden" bgcolor="#fff">
      {/* <HeadLayout />
      <PowerfulAgentLayout />
      <FullyObtimizeLayout />
      <ManageProjectLayout />
      <ExploreLayout />
      <TaskCoverLayout /> */}
      {/* <SwapToolsLayout /> */}
      <EmpowerDifferentLayout />
      <SendMailLayout/>
    </Stack >
  );
};

export default memo(HomePage);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px 120px", sm: "60px 0px 120px" },
  zIndex: 10,
};





