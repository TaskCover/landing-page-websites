"use client";
import { Box, Stack } from "@mui/material";
import { memo } from "react";
import { TabList, TopContent } from "./components";

import FixedLayout from "components/FixedLayout";

const InformationBillingPage = () => {
  return (
    <FixedLayout
      maxHeight={920}
      maxWidth={{
        xs: 1120,
        xl: 1450,
      }}
      overflow={"auto"}
    >
      <Stack gap={2} spacing={2}>
        <TopContent />
        <TabList />
      </Stack>
    </FixedLayout>
  );
};
export default memo(InformationBillingPage);
