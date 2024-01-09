"use client";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import { memo } from "react";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import ExploreLayout from "./components/explore-layout";
import HeadLayout from "./components/head-layout";
import ManageProjectLayout from "./components/manage-project-layout";
import PowerfulAgentLayout from "./components/powerful-agent-layout";
import FullyObtimizeLayout from "./components/fully-optimize-layout";
import EmpowerDifferentLayout from "./components/empower-different-layout";


import { TaskCoverItems } from "./configs";
import TaskCoverLayout from "./components/task-cover-layout";
import SwapToolsLayout from "./components/swap-tools-layout";

type HomePageProps = {};

const HomePage = (props: HomePageProps) => {
  return (
    <Stack overflow="hidden" bgcolor="#fff">
      <HeadLayout />
      <PowerfulAgentLayout />
      <FullyObtimizeLayout />
      <ManageProjectLayout />
      <ExploreLayout />
      <TaskCoverLayout />
      <SwapToolsLayout />
      <EmpowerDifferentLayout />
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





