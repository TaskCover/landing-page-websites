/* eslint-disable no-console */
"use client";

import React from "react";
import _ from "lodash";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Tab, Box, Typography, Stack, Grid } from "@mui/material";
import {
  TimelogTrackingCalendar,
  CompanyTimeTrackingCalendar,
  MyTimeTrackingCalendar,
} from "./CalendarTracking";
import { TabPanel } from "@mui/lab";
import useTheme from "hooks/useTheme";
import useBreakpoint from "hooks/useBreakpoint";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslations } from "next-intl";
import { NS_TIME_TRACKING } from "constant/index";

interface ITab {
  label: string;
  value: string;
}

const tabStyles = {
  width: "216px",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 600,
};

const TimeTrackingPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isSmSmaller, isMdSmaller } = useBreakpoint();
  const tabStyles = {
    width: 'auto',
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 600,
  };
  const [tab, setTab] = React.useState<string>("myTime");
  const timeT = useTranslations(NS_TIME_TRACKING);

  const timeTabs: ITab[] = [
    {
      label: timeT("header.tab.myTime"),
      value: "myTime",
    },
    {
      label: timeT("header.tab.companyTime"),
      value: "companyTime",
    },
    {
      label: timeT("header.tab.workLog"),
      value: "timeLog",
    },
  ];

  return (
    <Stack>
      <Grid
        container
        sx={{ display: isSmSmaller ? "block" : "none", padding: "10px" }}
      >
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ChevronLeftIcon sx={{ width: "20px", height: "20px" }} />{" "}
          <Typography
            sx={{ fontWeight: 600, fontSize: "20px", lineHeight: "24px" }}
          >
            {timeT("header.timeTracking")}
          </Typography>
        </Grid>
      </Grid>
      <TabContext value={tab}>
        {/* <Stack
          direction="row"
          
        > */}
        <Grid
          container
          sx={{
            backgroundColor: isSmSmaller
              ? "inherit"
              : isDarkMode
              ? "#565656"
              : "#FFFFFF",
            // display: "flex",
            height: isSmSmaller ? "110px" : "auto",
            alignItems: "center",

            //justifyContent: "space-between",
          }}
        >
          <Grid
            item
            md={6}
            sm={12}
            //sx={{ display: "flex"}}
          >
            <TabList
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "16px",
                  display: 'grid',
                  gridTemplateColumns: isSmSmaller ? "0.9fr 1.2fr 0.9fr" : 'repeat(3, 1fr)',
                },
                "& .MuiTab-root": {
                  textTransform: "unset",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "rgba(153, 153, 153, 1)",
                  "&.active": {
                    color: "#3699FF",
                  },
                },
              }}
              onChange={(_event: React.SyntheticEvent, newValue: string) =>
                setTab(newValue)
              }
            >
              {timeTabs.map((tab: ITab) => (
                <Tab
                  key={`tab-${tab.value}`}
                  label={tab.label}
                  value={tab.value}
                  sx={tabStyles}
                />
              ))}
            </TabList>
          </Grid>
          {tab !== "timeLog" && (
            <Grid item md={6} sm={12} sx={{ padding: "15px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                  //mr: 3,
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      background: "#3699FF",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#999999",
                    }}
                  >
                    {timeT("header.tab.workTime")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      background: "#F64E60",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#999999",
                    }}
                  >
                  {timeT("header.tab.breakTime")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* </Stack> */}
        <TabPanel
          value="myTime"
          sx={{ "& .MuiTabPanel-root": { paddingTop: "0px!important" } }}
          classes={{ root: isSmSmaller ? "tab-panel-top-0" : "" }}
        >
          <MyTimeTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
        <TabPanel
          value="companyTime"
          sx={{ paddingTop: { sm: 0, md: "auto" } }}
          classes={{ root: isSmSmaller ? "tab-panel-top-0" : "" }}
        >
          <CompanyTimeTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
        <TabPanel value="timeLog" sx={{ paddingTop: { sm: 0, md: "auto" } }}>
          <TimelogTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default TimeTrackingPage;
