import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import useTheme from "hooks/useTheme";
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "swiper";
import { Button, Text } from "components/shared";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DEFAULT_BOOKING_ALL_FILTER } from "./hepler";
import FullCalendar from "@fullcalendar/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useResourceDate } from "store/resourcePlanning/selector";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { NS_RESOURCE_PLANNING } from "constant/index";
const TimeHeader = ({ filters, setFilters, calendarRef }) => {
  const {
    dateRange,
    selectedDate,
    updateDate,
    currentDate,
    updateCurrentDate,
  } = useResourceDate();
  const [isOpen, setIsOpen] = useState(false);
  const { palette } = useTheme();
  const resourceT = useTranslations<string>(NS_RESOURCE_PLANNING);

  const getWeekStartAndEndDates = (date) => {
    const startOfWeek = date?.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
    const endOfWeek = date?.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)
    const startDate = startOfWeek?.format("YYYY-MM-DD");
    const endDate = endOfWeek?.format("YYYY-MM-DD");
    return { startDate, endDate };
  };

  const changeWeekButtonStyles = {
    boxShadow: "none",
    color: "rgba(102, 102, 102, 1)",
    background: palette.grey[100],
  };

  const onAction = (action: "view" | "week", value: string) => {
    const calendarApi = calendarRef?.current && calendarRef?.current.getApi();
    if (action === "week") {
      if (value === "today") {
        const currentDate = new Date();
        const currentDayjs = dayjs().toString();
        updateCurrentDate(currentDayjs);
        updateDate({
          dateRange: [...dateRange],
          selectedDate: currentDate,
        });
        setFilters(DEFAULT_BOOKING_ALL_FILTER);
        if (calendarApi) {
          calendarApi.gotoDate(currentDate);
          calendarApi.refetchEvents();
        }
      }
      if (value === "prev") {
        const startDate = dayjs(filters?.start_date)
          .subtract(7, "day")
          .format("YYYY-MM-DD");
        const endDate = dayjs(filters?.start_date)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        setFilters({ ...filters, start_date: startDate, end_date: endDate });
        updateCurrentDate("");
        updateDate({
          dateRange: [...dateRange],
          selectedDate: null,
        });
        if (calendarApi) {
          calendarApi.prev();
          calendarApi.refetchEvents();
        }
      }
      if (value === "next") {
        const startDate = dayjs(filters?.end_date)
          .add(1, "day")
          .format("YYYY-MM-DD");
        const endDate = dayjs(filters?.end_date)
          .add(7, "day")
          .format("YYYY-MM-DD");

        setFilters({ ...filters, start_date: startDate, end_date: endDate });
        updateCurrentDate("");
        updateDate({
          dateRange: [...dateRange],
          selectedDate: null,
        });
        if (calendarApi) {
          calendarApi.next();
          calendarApi.refetchEvents();
        }
      }
    }
  };

  const generateDateRange = () => {
    const start_date = dayjs(filters?.start_date);
    const result: Array<Date> = [];
    let currentDate = start_date?.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
    const endOfWeek = start_date?.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

    while (
      currentDate.isBefore(endOfWeek) ||
      currentDate.isSame(endOfWeek, "day")
    ) {
      result.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }

    updateDate({
      dateRange: result,
      selectedDate,
    });
  };

  useEffect(() => {
    if (
      !isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
      // dispatch(getMyTimeTracking(filters));
    }
  }, [filters?.start_date, filters?.end_date]);

  return (
    <Grid2 container>
      <Grid2 xs={0} sm={2} md={4} />
      <Grid2
        xs={12}
        sm={6}
        md={5}
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          justifyContent: {
            xs: "flex-start",
            sm: "center",
          },
          mb: {
            xs: "20px",
            md: "0",
          },
        }}
      >
        <MobileDatePicker
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={(date: Date | null) => {
            const calendarApi =
              calendarRef?.current && calendarRef?.current.getApi();

            if (date) {
              const { startDate, endDate } = getWeekStartAndEndDates(date);
              updateDate({
                dateRange: [...dateRange],
                selectedDate: date,
              });
              updateCurrentDate("");
              setFilters({
                ...filters,
                start_date: startDate,
                end_date: endDate,
              });
              if (calendarApi) {
                calendarApi?.gotoDate(startDate);
                calendarApi?.refetchEvents();
              }
            }
          }}
          closeOnSelect
          sx={{ display: "none" }}
          slotProps={{
            actionBar: {
              actions: [],
            },
            toolbar: {
              hidden: true,
            },
            day: {
              sx: {
                transition: "all ease 0.25s",
                borderRadius: "4px",
                fontWeight: 600,
                "&.Mui-selected": {
                  color: "#ffffff",
                  background: `${palette.primary.main} !important`,
                  "&.MuiPickersDay-today": {
                    color: "#ffffff",
                    borderColor: palette.primary.main,
                  },
                },
                "&.MuiPickersDay-today": {
                  color: palette.primary.main,
                  borderColor: palette.primary.main,
                },
                ":hover": {
                  background: palette.primary.main,
                },
              },
            },
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setIsOpen(true)}
        >
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "18px",
              color: "#666666",
              marginRight: "10px",
            }}
          >
            {`${dayjs(filters?.start_date).format("DD MMM YYYY")} - ${dayjs(
              filters?.end_date,
            ).format("DD MMM YYYY")}`}
          </Text>
          <ExpandMore sx={{ color: "rgba(102, 102, 102, 1)" }} />
        </Stack>
      </Grid2>
      <Grid2 xs={12} sm={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{
            xs: "flex-start",
            sm: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              ...changeWeekButtonStyles,
              minWidth: "28px",
              height: "28px",
              padding: 0,
              borderRadius: "4px 0px 0px 4px",
            }}
            onClick={() => onAction("week", "prev")}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              ...changeWeekButtonStyles,
              height: "34px",
              fontWeight: 500,
              color: "rgba(102, 102, 102, 1)",
              background: palette.grey[100],
              borderRadius: "0px",
              margin: "0 1px",
            }}
            onClick={() => onAction("week", "today")}
            disabled={
              dayjs(currentDate).format("YYYY-MM-DD") ===
              dayjs().format("YYYY-MM-DD")
            }
          >
            {resourceT("schedule.time.thisWeek")}
          </Button>
          <Button
            variant="contained"
            sx={{
              ...changeWeekButtonStyles,
              minWidth: "28px",
              height: "28px",
              padding: 0,
              borderRadius: "0px 4px 4px 0px",
            }}
            onClick={() => onAction("week", "next")}
          >
            <ChevronRightIcon />
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default TimeHeader;
