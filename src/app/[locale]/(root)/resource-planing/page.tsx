"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import { Grid, Stack, Tab, Typography } from "@mui/material";
import { LocalizationProvider, viVN } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Wrapper from "components/Wrapper";
import AllPeopleTab from "components/sn-resource-planing/AllPeopleTab";
import MyScheduleTab from "components/sn-resource-planing/MyScheduleTab";
import { NS_RESOURCE_PLANNING } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import useTheme from "hooks/useTheme";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const metadata = {
  title: "Resource Planning | Taskcover",
};

const tabStyles = {
  width: "auto",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 600,
};

export default function ResourcePlanningPage() {
  const [tab, setTab] = useState("allPeople");
  const { isDarkMode } = useTheme();
  const { isSmSmaller } = useBreakpoint();
  const t = useTranslations(NS_RESOURCE_PLANNING);

  return (
    <Wrapper overflow="auto">
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
              {t("header.title")}
            </Typography>
          </Grid>
        </Grid>
        <TabContext value={tab}>
          <Grid
            container
            sx={{
              backgroundColor: isSmSmaller
                ? "inherit"
                : isDarkMode
                ? "#565656"
                : "#FFFFFF",
              height: isSmSmaller ? "110px" : "auto",
              alignItems: "center",
            }}
          >
            <Grid item md={6} sm={12}>
              <TabList
                sx={{
                  "& .MuiTabs-flexContainer": {
                    gap: "16px",
                    display: "grid",
                    gridTemplateColumns: isSmSmaller
                      ? "0.9fr 1.2fr 0.9fr"
                      : "repeat(3, 1fr)",
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
                <Tab
                  label={t("header.tab.allPeople")}
                  value="allPeople"
                  sx={tabStyles}
                />
                <Tab
                  label={t("header.tab.mySchedule")}
                  value="mySchedule"
                  sx={tabStyles}
                />
              </TabList>
            </Grid>
          </Grid>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              viVN.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <TabPanel value="allPeople">
              <AllPeopleTab />
            </TabPanel>
            <TabPanel value="mySchedule">
              <MyScheduleTab />
            </TabPanel>
          </LocalizationProvider>
        </TabContext>
      </Stack>
    </Wrapper>
  );
}
