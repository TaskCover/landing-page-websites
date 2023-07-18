/* eslint-disable no-console */
"use client";

import React from "react";
import _ from "lodash";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Tab, Box, Typography, Stack } from "@mui/material";
import {
  TimelogTrackingCalendar,
  CompanyTimeTrackingCalendar,
  MyTimeTrackingCalendar,
} from "./CalendarTracking";
import { TabPanel } from "@mui/lab";
import useTheme from "hooks/useTheme";

interface ITab {
  label: string;
  value: string;
}

const timeTabs: ITab[] = [
  {
    label: "My time",
    value: "myTime",
  },
  {
    label: "Company time",
    value: "companyTime",
  },
  {
    label: "Work log",
    value: "timeLog",
  },
];

const tabStyles = {
  width: "216px",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 600,
};

const TimeLog: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [tab, setTab] = React.useState<string>("myTime");

  return (
    <Stack direction="column">
      <TabContext value={tab}>
        <Stack
          direction="row"
          sx={{
            backgroundColor: isDarkMode ? "#565656" : "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <TabList
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: "16px",
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
           {tab !== "timeLog" && (
            <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
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
                  Work time
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
                  Break time
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>
        <TabPanel value="myTime">
          <MyTimeTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
        <TabPanel value="companyTime">
          <CompanyTimeTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
        <TabPanel value="timeLog">
          <TimelogTrackingCalendar
            events={[]}
            onClick={() => console.log("click")}
          />
        </TabPanel>
      </TabContext>
      {/* <Stack sx={{ padding: '16px' }}></Stack> */}
    </Stack>
  );
};

export default TimeLog;
