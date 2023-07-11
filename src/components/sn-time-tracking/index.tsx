"use client";

import { SyntheticEvent, memo, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { NS_TIME_TRACKING } from "constant/index";
import TabMyTime from "./TabList";
const TimeTrackingComponent = () => {
  const t = useTranslations(NS_TIME_TRACKING);

  const [tab, setTab] = useState<string>("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          backgroundColor: "transparent",
          borderRadius: "8px",
        }}
      >
        <TabContext value={tab}>
          <Box
            sx={{
              paddingTop: "14px",
              paddingBottom: "8px",
              borderColor: "divider",
              backgroundColor: "grey.50",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChange}
              variant="scrollable"
              TabIndicatorProps={{
                sx: { backgroundColor: "error.contrastBg" },
              }}
              sx={{
                "& button": { color: "grey.300" },
                "& button.Mui-selected": { color: "error.contrastBg" },
              }}
            >
              <Tab
                label={t("header.tab.myTime")}
                value="1"
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label={t("header.tab.companyTime")}
                value="2"
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label={t("header.tab.workLog")}
                value="3"
                sx={{ textTransform: "none" }}
              />
            </TabList>
            <Box sx={{ display: "flex", gap: "30px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "grey.300",
                }}
              >
                <Box
                  sx={{ width: 8, height: 8, backgroundColor: "primary.main" }}
                ></Box>
                <Typography>{t("header.tab.workTime")}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "grey.300",
                }}
              >
                <Box
                  sx={{ width: 8, height: 8, backgroundColor: "error.main" }}
                ></Box>
                <Typography>{t("header.tab.breakTime")}</Typography>
              </Box>
            </Box>
          </Box>
          <TabPanel value="1">
            <TabMyTime />
          </TabPanel>
          <TabPanel value="2">
            <div>tab2</div>
          </TabPanel>
          <TabPanel value="3">
            <div>tab3</div>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default memo(TimeTrackingComponent);
