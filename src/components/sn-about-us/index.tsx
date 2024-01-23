"use client";

import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import {
  AgenciesLayout,
  ArticlesLayout,
  FamilysLayout,
  HeadLayout,
  OurMissionLayout,
  OurValueLayout,
  OurVisionLayout,
  StatsLayout,
  TeamsStarLayout,
} from "./components";
import { HelperQuestion } from "./components/helper";

type AboutUsPageProps = {};

const AboutUsPage = (props: AboutUsPageProps) => {
  return (
    <Stack>
      <HeadLayout />
      <StatsLayout />
      <TeamsStarLayout />
      <AgenciesLayout />
      <OurValueLayout />
      <OurMissionLayout />
      <OurVisionLayout />
      <FamilysLayout />
      <Stack
        sx={{
          background: "url(/images/about-us/bg-head.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ArticlesLayout />
        <HelperQuestion />
      </Stack>
    </Stack>
  );
};

export default memo(AboutUsPage);
