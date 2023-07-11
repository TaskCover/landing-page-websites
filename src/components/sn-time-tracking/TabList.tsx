"use client";

import React, { memo, useRef, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  Popover,
  Tooltip,
} from "@mui/material";
//import { Button } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import { NS_TIME_TRACKING } from "constant/index";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import OutLineExpandIcon from "icons/OutLineExpandIcon";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ButtonCalendar from "components/shared/ButtonCalendar";
import CalendarIcon from "icons/CalendarIcon";
import ListIcon from "@mui/icons-material/List";
import DayIcon from "icons/DayIcon";
import CustomizedInputBase from "components/shared/InputSeasrch";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarOptions } from "@fullcalendar/core";

type TabMyTimeProps = {};

const TabMyTime = (props: TabMyTimeProps) => {
  const currentDate = moment().toDate();
  const startDate = moment().startOf("month").toDate();

  const t = useTranslations(NS_TIME_TRACKING);
  const pickerRef = useRef(null);
  const [selectRangePicker, setSelectRangePicker] = useState([
    startDate,
    currentDate,
  ]);
  const onChangeRangePicker = (dates) => {
    setSelectRangePicker(dates);
  };

  const options: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [timeGridPlugin],
    allDaySlot: false,
    slotDuration: "01:00:00",
    slotLabelContent: (arg) => {
      const hour = moment(arg.date).format("hh:mm");
      const ampm = moment(arg.date).format("A");
      return (
        <Typography
          sx={{ color: "grey.400", height: 36, width: 127, textAlign: "start" }}
        >
          {`${hour} ${ampm}`}
        </Typography>
      );
    },
    dayHeaderContent: (arg) => {
      const dayOfWeek = moment(arg.date).format("ddd");
      const dayOfMonth = moment(arg.date).format("D");
      return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: "grey.500",
              fontWeight: "400",
              lineHeight: "18px",
              fontSize: "10",
            }}
          >
            {dayOfWeek}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              lineHeight: "24px",
              fontSize: "20",
            }}
          >
            {dayOfMonth}
          </Typography>
        </Box>
      );
    },
    headerToolbar: false,
    dayHeaderFormat: { weekday: "short", day: "numeric", omitCommas: true },
    events: [
      {
        title: "BCH237",
        start: "2023-07-11T10:00:00",
        end: "2023-07-11T12:00:00",
        extendedProps: {
          department: "BioChemistry",
          isOutTime: true,
        },
        description: "Lecture",
      },
      {
        title: "BCH237",
        start: "2023-07-11T08:00:00",
        end: "2023-07-11T10:00:00",
        extendedProps: {
          department: "BioChemistry",
          isOutTime: false,
        },
        description: "Lecture",
      },
      {
        title: "BCH237",
        start: "2023-07-09T08:00:00",
        end: "2023-07-09T10:00:00",
        extendedProps: {
          department: "BioChemistry",
          isOutTime: false,
        },
        description: "Lecture",
      },
      {
        title: "BCH237",
        start: "2023-07-10T09:00:00",
        end: "2023-07-10T11:00:00",
        extendedProps: {
          department: "BioChemistry",
          isOutTime: true,
        },
        description: "Lecture",
      },
    ],

    eventBackgroundColor: "transparent",
    eventBorderColor: "transparent",
    eventContent: (arg) => {
      const id = arg.event._def.defId;
      const isOutTime = arg.event._def.extendedProps.isOutTime;
      const eventContent = arg.event._def;

      return (
        <Tooltip
          title={
            <Typography
              sx={{
                fontWeight: "300",
                lineHeight: "18px",
                fontSize: "12",
                color: "common.black",
              }}
            >
              Helllo
            </Typography>
          }
          sx={{ backgroundColor: isOutTime ? "error.light" : "primary.light" }}
        >
          <Box
            sx={{
              backgroundColor: isOutTime ? "error.light" : "primary.light",
              width: "100%",
              height: "100%",
              borderLeft: "3px solid",
              borderLeftColor: isOutTime ? "error.main" : "primary.main",
              padding: "5px",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "5px", mb: 1 }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "100%",
                  backgroundColor: "grey.50",
                  display: isOutTime ? "none" : "block",
                }}
              ></Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  lineHeight: "18px",
                  fontSize: "14",
                  color: isOutTime ? "error.main" : "primary.main",
                }}
              >
                {isOutTime ? "Off for holiday" : eventContent.title}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "300",
                  lineHeight: "18px",
                  fontSize: "12",
                  color: "common.black",
                }}
              >
                {isOutTime ? "8h" : eventContent.extendedProps.description}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      );
    },
  };
  return (
    <Stack>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Grid container>
          <Grid item md={4} sx={{ height: "36px" }}>
            <Button
              startIcon={<PlusIcon />}
              size="small"
              variant="contained"
              sx={{
                height: "36px",
                width: "113px",
                padding: 0,
                backgroundColor: "primary.main",
                color: "common.white",
                textTransform: "none",
              }}
            >
              {t("myTime.addButton")}
            </Button>
          </Grid>
          <Grid item md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: "230px",
                color: "grey.400",
              }}
            >
              <Flatpickr
                ref={pickerRef}
                value={selectRangePicker}
                onChange={(dates: Date) => onChangeRangePicker(dates)}
                options={{
                  dateFormat: "d-m-Y",
                  mode: "range",
                }}
                isClearable
              />
              <Box sx={{ position: "absolute", top: 0, right: 35 }}>
                <OutLineExpandIcon />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <ArrowBackIosIcon
                sx={{
                  cursor: "pointer",
                  width: "22px",
                  height: "24px",
                  backgroundColor: "grey.100",
                  padding: "4px",
                  paddingLeft: "8px",
                  color: "grey.400",
                  borderRadius: "6px 0 0 6px",
                }}
              />
              <Box
                sx={{
                  width: "97px",
                  height: "30px",
                  backgroundColor: "grey.100",
                  padding: "4px",
                  color: "grey.400",
                  textAlign: "center",
                }}
              >
                This week
              </Box>
              <ArrowForwardIosIcon
                sx={{
                  cursor: "pointer",
                  width: "22px",
                  height: "24px",
                  backgroundColor: "grey.100",
                  padding: "4px",
                  paddingLeft: "8px",
                  color: "grey.400",
                  borderRadius: "0 6px 6px 0",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "75%",
                alignItems: "center",
              }}
            >
              <ButtonCalendar icon={<ListIcon />} title="Timesheet" />
              <ButtonCalendar icon={<CalendarIcon />} title="Calendar" />
              <ButtonCalendar icon={<DayIcon />} title="Day" />
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <CustomizedInputBase />
          </Grid>
        </Grid>
        <Grid>
          <FullCalendar {...options} />
        </Grid>
      </Box>
    </Stack>
  );
};

export default memo(TabMyTime);
