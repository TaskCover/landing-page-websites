"use client";

import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { AgenciesLayout, ArticlesLayout, FamilysLayout, HeadLayout, OurMissionLayout, OurValueLayout, OurVisionLayout, StatsLayout, TeamsStarLayout } from "./components";
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
      <ArticlesLayout />
      <HelperQuestion />
    </Stack>
  );
};

export default memo(AboutUsPage);
