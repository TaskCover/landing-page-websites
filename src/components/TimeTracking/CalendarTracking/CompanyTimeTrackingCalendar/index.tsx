"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
//import ButtonComponent from "../../Component/Button";
import AddIcon from "@mui/icons-material/Add";
import Filter from "../../Component/Filter";
//import { MobileDatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TimeSheet from "./Timesheet";
import { styled } from "@mui/system";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import { NS_TIME_TRACKING } from "constant/index";
import ButtonCalendar from "components/shared/ButtonCalendar";
//import * as TimeTrackingPopup from "../../Component/TimeTracking";
import ListIcon from "@mui/icons-material/List";

const changeWeekButtonStyles = {
  boxShadow: "none",
  color: "rgba(102, 102, 102, 1)",
  background: "red",
};
interface IProps {
  events: any[];
  onClick(action: "create" | "edit", item?: any): void;
}

interface IFilter {
  start_date: string;
  end_date: string;
  search_key: string;
}

const today = dayjs().add(1, "day"); // Ngày hiện tại + 1 ngày (ngày mai)
const startOfWeek = today.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
const endOfWeek = today.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

const defaultStartDate = startOfWeek.format("YYYY-MM-DD");
const defaultEndDate = endOfWeek.format("YYYY-MM-DD");

const DEFAULT_FILTER = {
  start_date: defaultStartDate,
  end_date: defaultEndDate,
  search_key: "",
};

const weekdays = ["SUN", "MON", "TUE", "WEB", "THU", "FRI", "SAT"];

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: 600,
  color: "#999999",
}));

const StyledTableRow = styled(TableRow)(() => ({
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: 600,
  color: "#999999",
}));

const StyledDay = styled(Box)(() => ({
  cursor: "pointer",
  boxShadow: "-1px -1px 0px 0px #E0E0E0 inset",
  padding: "8px",
  "&.selected": {
    "h3, h4": {
      color: "#3699FF",
    },
  },

  h3: {
    margin: 0,
    fontFamily: "Open Sans",
    fontSize: "10px",
    lineHeight: "18px",
    fontWeight: 400,
    color: "#71717A",
    textTransform: "uppercase",
  },
  h4: {
    margin: 0,
    fontFamily: "Open Sans",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 600,
    color: "#212121",
  },
}));

const TrackingCalendar: React.FC<IProps> = () => {
  const isGetLoading: any = false;
  const t = useTranslations(NS_TIME_TRACKING);
  const company: any = [
    {
      id: "a10ffd00-14c0-11ee-bb15-391995330295",
      fullname: "Tester 021",
      company: "SASS",
      avatar: {
        object: "846e94e0-14c0-11ee-a17f-3960232e1d21-dfb10c6edec2ff01",
        name: "C493B030-0072-469D-A404-5EB6BD4EE52E.jpeg",
        link: "http://103.196.145.232:9000/sass/846e94e0-14c0-11ee-a17f-3960232e1d21-dfb10c6edec2ff01?response-content-disposition=attachment%3B%20filename%3D%22C493B030-0072-469D-A404-5EB6BD4EE52E.jpeg%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T095310Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ceec66f2e5a926e504ac68b973df6b092fdf08662cf77cadf22a85046df7c0a7",
      },
      email: "tester02@itsminh99.dev",
      position: "07a8ee20-1753-11ee-b117-4525b07f30b9",
      timesheet: [],
    },
    {
      id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
      fullname: "Tester 02",
      company: "SASS",
      avatar: {
        object: "846e94e0-14c0-11ee-a17f-3960232e1d21-dfb10c6edec2ff01",
        name: "C493B030-0072-469D-A404-5EB6BD4EE52E.jpeg",
        link: "http://103.196.145.232:9000/sass/846e94e0-14c0-11ee-a17f-3960232e1d21-dfb10c6edec2ff01?response-content-disposition=attachment%3B%20filename%3D%22C493B030-0072-469D-A404-5EB6BD4EE52E.jpeg%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T095310Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ceec66f2e5a926e504ac68b973df6b092fdf08662cf77cadf22a85046df7c0a7",
      },
      email: "tiep123@gmail.com",
      position: "f88f6f20-183f-11ee-bcbf-e5dd9fc780a6",
      timesheet: [
        {
          _id: "649f8218e46c18d509efb980",
          id: "1813cad0-17af-11ee-8c0a-2ffb0f4118f9",
          position: {
            id: "01f964f0-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 01 1",
          },
          type: "Work time",
          day: "2023-07-02",
          start_time: "2023-07-02 00:00",
          end_time: "2023-07-02 03:00",
          duration: 3,
          project_id: "94bc74e0-17a7-11ee-a16f-a708bd651e85",
          note: "aaaa",
          created_time: "2023-06-30T13:54:45.278Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
        {
          _id: "649f8261e46c18d509efb985",
          id: "43589ae0-17af-11ee-8c0a-2ffb0f4118f9",
          position: {
            id: "07a8ee20-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 02",
          },
          type: "Work time",
          day: "2023-07-03",
          start_time: "2023-07-03 00:00",
          end_time: "2023-07-03 03:00",
          duration: 3,
          project_id: "94bc74e0-17a7-11ee-a16f-a708bd651e85",
          note: "333",
          created_time: "2023-06-30T13:54:45.278Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
        {
          _id: "64a23b2c8087c4492f1fc383",
          id: "95ab9ea0-194e-11ee-85e7-e735bdf04dab",
          position: {
            id: "01f964f0-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 01 1",
          },
          type: "Work time",
          day: "2023-07-04",
          start_time: "2023-07-04 08:00",
          end_time: "2023-07-04 12:00",
          duration: 4,
          project_id: "94bc74e0-17a7-11ee-a16f-a708bd651e85",
          note: "1",
          created_time: "2023-07-02T20:38:12.460Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
        {
          _id: "64a23b5c8087c4492f1fc38a",
          id: "b23bc8b0-194e-11ee-85e7-e735bdf04dab",
          position: {
            id: "01f964f0-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 01 1",
          },
          type: "Break time",
          day: "2023-07-04",
          start_time: "2023-07-04 15:14",
          end_time: "2023-07-04 18:38",
          duration: 3.4,
          project_id: "94bc74e0-17a7-11ee-a16f-a708bd651e85",
          note: "12",
          created_time: "2023-07-02T20:38:12.460Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
        {
          _id: "649f854be46c18d509efb997",
          id: "006f79e0-17b1-11ee-8c0a-2ffb0f4118f9",
          position: {
            id: "01f964f0-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 01 1",
          },
          type: "Work time",
          day: "2023-07-06",
          start_time: "2023-07-06 01:07",
          end_time: "2023-07-06 04:07",
          duration: 3,
          project_id: "94bc74e0-17a7-11ee-a16f-a708bd651e85",
          note: "",
          created_time: "2023-06-30T13:54:45.278Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
        {
          _id: "64a7ebaa1a8a333fa78c0eb2",
          id: "b8a3c100-1cb2-11ee-ae15-29516638233e",
          position: {
            id: "f88f6f20-183f-11ee-bcbf-e5dd9fc780a6",
            name: "Leader 2",
          },
          type: "Work time",
          day: "2023-07-07",
          start_time: "2023-07-07 12:00",
          end_time: "2023-07-07 17:00",
          duration: 5,
          project_id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
          note: "",
          created_time: "2023-07-07T10:38:39.742Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
          is_pin: false,
          project: {
            id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
            name: "Ducnv",
            company: "SASS",
          },
        },
        {
          _id: "64aab8067718f77477c7931c",
          id: "b4ca9070-1e5d-11ee-ae15-534c29a25d30",
          position: {
            id: "7bdaec40-195a-11ee-80dd-453afc9d16a0",
            name: "Position 01",
          },
          type: "Work time",
          day: "2023-07-07",
          start_time: "2023-07-09 12:00",
          end_time: "2023-07-09 15:00",
          duration: 3,
          project_id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
          note: "",
          is_pin: true,
          created_time: "2023-07-09T13:32:13.699Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
          project: {
            id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
            name: "Ducnv",
            company: "SASS",
          },
        },
        {
          _id: "64aabb7efa28d0013a61530b",
          id: "c5b5daa0-1e5f-11ee-8b3a-4d63004b3226",
          position: {
            id: "7bdaec40-195a-11ee-80dd-453afc9d16a0",
            name: "Position 01",
          },
          type: "Work time",
          day: "2023-07-07",
          start_time: "2023-07-09 15:00",
          end_time: "2023-07-09 18:00",
          duration: 3,
          project_id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
          note: "",
          is_pin: false,
          created_time: "2023-07-09T13:50:37.560Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
          project: {
            id: "6461d810-1a6f-11ee-9e18-498ed7fe18ee",
            name: "Ducnv",
            company: "SASS",
          },
        },
        {
          _id: "649f805239ced2dad804f6d2",
          id: "097f7380-17ae-11ee-8b55-6d2e5b3c092a",
          position: {
            id: "01f964f0-1753-11ee-b117-4525b07f30b9",
            name: "Chức vụ 01 1",
          },
          type: "Work time",
          day: "2026-03-26",
          start_time: "2026-03-26 12:00",
          end_time: "2026-03-26 15:00",
          duration: 3,
          project_id: "b48cd240-1759-11ee-a16f-a708bd651e85",
          note: "",
          created_time: "2023-07-01T01:20:15.429Z",
          user_id: "bec11250-14be-11ee-9f52-e3c4a4af72a6",
        },
      ],
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCreatePopup, setIsOpenCreatePopup] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("timeSheet");
  const [events, setEvents] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState<IFilter>(DEFAULT_FILTER);
  const [currentDate, setCurrentDate] = React.useState<string>(
    dayjs().toString(),
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const [dateRange, setDateRange] = React.useState<any[]>([]);
  const [totalTime, setTotalTime] = React.useState({
    work: 0,
    break: 0,
  });

  React.useEffect(() => {
    if (!_.isEmpty(company)) {
      const result: any[] = [];
      let totalWorkTime = 0;
      let totalBreakTime = 0;
      _.forEach(company, (user) => {
        if (user && user?.timesheet) {
          let totalUserWorkTime = 0;
          let totalUserBreakTime = 0;
          _.map(user?.timesheet, (data, index: number) => {
            if (!_.isEmpty(data)) {
              const newEvent = {
                title: `Event ${++index}`,
                start: data?.start_time,
                end: data?.end_time,
                extendedProps: {
                  project: {
                    avatar: [""],
                    name: data?.project?.name,
                  },
                  name: user?.fullname,
                  position: data?.position?.name,
                  hour: data?.duration,
                  type:
                    data?.type === "Work time" ? "working_time" : "break_time",
                  note: data?.note,
                },
              };
              if (data.type === "Work time") totalUserWorkTime += data.duration;
              else totalUserBreakTime += data.duration;

              result.push(newEvent);
            }
          });
          totalWorkTime += totalUserWorkTime;
          totalBreakTime += totalUserBreakTime;
        }
      });
      setTotalTime({
        work: totalWorkTime,
        break: totalBreakTime,
      });
      setEvents(result);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  React.useEffect(() => {
    if (
      !_.isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
      //dispatch(getTimeTrackingByCompany(filters));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.start_date, filters?.end_date]);

  const generateDateRange = () => {
    const start_date = dayjs(filters?.start_date);
    const result: Date[] = [];
    let currentDate = start_date?.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
    const endOfWeek = start_date?.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

    while (
      currentDate.isBefore(endOfWeek) ||
      currentDate.isSame(endOfWeek, "day")
    ) {
      result.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }

    setDateRange(result);
  };

  const getWeekStartAndEndDates = (date: any) => {
    const startOfWeek = date?.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
    const endOfWeek = date?.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)
    const startDate = startOfWeek?.format("YYYY-MM-DD");
    const endDate = endOfWeek?.format("YYYY-MM-DD");
    return { startDate, endDate };
  };

  const onAction = (action: "view" | "week", value: string) => {
    if (action === "week") {
      if (value === "today") {
        const currentDate = new Date();
        const currentDayjs = dayjs().toString();
        setCurrentDate(currentDayjs);
        setSelectedDate(currentDate);
        setFilters(DEFAULT_FILTER);
      }
      if (value === "prev") {
        const startDate = dayjs(filters?.start_date)
          .subtract(7, "day")
          .format("YYYY-MM-DD");
        const endDate = dayjs(filters?.start_date)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        setFilters({ ...filters, start_date: startDate, end_date: endDate });
        setCurrentDate("");
        setSelectedDate(null);
      }
      if (value === "next") {
        const startDate = dayjs(filters?.end_date)
          .add(1, "day")
          .format("YYYY-MM-DD");
        const endDate = dayjs(filters?.end_date)
          .add(7, "day")
          .format("YYYY-MM-DD");
        setFilters({ ...filters, start_date: startDate, end_date: endDate });
        setCurrentDate("");
        setSelectedDate(null);
      }
    }
  };

  const _renderHeader = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
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
            onClick={() => setIsOpenCreatePopup(true)}
          >
            {t("myTime.addButton")}
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <MobileDatePicker
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            onChange={(date: Date | null) => {
              if (date) {
                const { startDate, endDate } = getWeekStartAndEndDates(date);
                setSelectedDate(date);
                setFilters({
                  ...filters,
                  start_date: startDate,
                  end_date: endDate,
                });
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
                    background: `red !important`,
                    "&.MuiPickersDay-today": {
                      color: "#ffffff",
                      borderColor: "green",
                    },
                  },
                  "&.MuiPickersDay-today": {
                    color: "blue",
                    borderColor: "hotpink",
                  },
                  ":hover": {
                    background: "yellow",
                  },
                },
              },
            }}
          /> */}
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
            <Typography
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
            </Typography>
            <ExpandMoreIcon sx={{ color: "rgba(102, 102, 102, 1)" }} />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Button
              sx={{
                minWidth: "28px",
                height: "28px",
                padding: 0,
                borderRadius: "4px 0px 0px 4px",
                backgroundColor: "grey.100",
                color: "grey.400",
              }}
              onClick={() => onAction("week", "prev")}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              sx={{
                width: "97px",
                height: "30px",
                backgroundColor: "grey.100",
                padding: "4px",
                color: "grey.400",
                textAlign: "center",
              }}
              onClick={() => onAction("week", "today")}
              disabled={
                dayjs(currentDate).format("YYYY-MM-DD") ===
                dayjs().format("YYYY-MM-DD")
              }
            >
              This week
            </Button>
            <Button
              sx={{
                minWidth: "28px",
                height: "28px",
                padding: 0,
                borderRadius: "0px 4px 4px 0px",
                backgroundColor: "grey.100",
                color: "grey.400",
              }}
              onClick={() => onAction("week", "next")}
            >
              <ChevronRightIcon />
            </Button>
          </Stack>
        </Grid>
        {activeTab === "table" && (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
              }}
            >
              {_.map(dateRange, (date: Date, index) => {
                const weekday = weekdays[date.getDay()];
                const dayNumber = date.getDate();
                return (
                  <StyledDay
                    key={index}
                    className={
                      dayjs(dayjs(date).format("YYYY-MM-DDDD")).isSame(
                        dayjs(selectedDate).format("YYYY-MM-DDDD"),
                      )
                        ? "selected"
                        : ""
                    }
                    onClick={() => setSelectedDate(date)}
                  >
                    <h3>{weekday}</h3>
                    <h4>{dayNumber}</h4>
                  </StyledDay>
                );
              })}
            </Box>
          </Grid>
        )}
      </Grid>
    );
  };

  const _renderCalendarModule = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: "16px" }}
      >
        <Stack direction="row" alignItems="center" sx={{ gap: "16px" }}>
          <ButtonCalendar
            icon={<ListIcon />}
            isActive={activeTab === "timeSheet"}
            title="Timesheet"
            onClick={() => setActiveTab("timeSheet")}
          />
          <ButtonCalendar
            icon={<ListIcon />}
            isActive={activeTab === "table"}
            title="Table"
            onClick={() => setActiveTab("table")}
          />
        </Stack>
        <Filter.SearchField
          sx={{
            maxWidth: "295px",
            height: "40px",
            " .MuiInputBase-root": {
              maxWidth: "295px",
              height: "40px",
            },
          }}
          placeholder="Search"
          value={filters.search_key}
          onChange={(event) =>
            setFilters({ ...filters, search_key: event.target.value })
          }
          // onKeyUp={(event) =>
          //   event.key === 'Enter' && dispatch(getTimeTrackingByCompany(filters))
          // }
        />
      </Stack>
    );
  };

  const _renderTable = () => {
    if (activeTab !== "table") return;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TableContainer>
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 8px",
                position: "relative",
                bottom: "-7px",
              }}
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Employee</StyledTableCell>
                  <StyledTableCell>Project</StyledTableCell>
                  <StyledTableCell>Design</StyledTableCell>
                  <StyledTableCell>Position</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Note</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {!_.isEmpty(events) ? (
                  _.map(events, (event, index) => {
                    if (
                      selectedDate &&
                      !dayjs(dayjs(selectedDate).format("YYYY-MM-DD")).isSame(
                        dayjs(event?.start).format("YYYY-MM-DD"),
                      )
                    )
                      return <></>;
                    const rowStyles = {
                      borderLeft: `4px solid rgba(54, 153, 255, 1)`,
                      background: "rgba(225, 240, 255, 1)",
                    };
                    if (event?.extendedProps?.type === "break_time")
                      Object.assign(rowStyles, {
                        borderLeft: `4px solid rgba(246, 78, 96, 1)`,
                        background: "rgba(246, 78, 96, 0.1)",
                      });
                    return (
                      <StyledTableRow sx={rowStyles} key={index}>
                        <StyledTableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <Avatar sx={{ width: 20, height: 20 }} />
                            {event?.extendedProps?.name}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <Avatar sx={{ width: 20, height: 20 }} />

                            {event?.extendedProps?.project?.name}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>Design</StyledTableCell>
                        <StyledTableCell>
                          {event?.extendedProps?.position}
                        </StyledTableCell>
                        <StyledTableCell>
                          {" "}
                          {event?.extendedProps?.hour || 0}h
                        </StyledTableCell>
                        <StyledTableCell>
                          {event?.extendedProps?.note}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        p: 1,
                      }}
                    >
                      No data were found
                    </Typography>
                  </StyledTableRow>
                )}

                {isGetLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: 1,
                      height: 1,
                      top: 0,
                      left: 0,
                      backgroundColor: " rgba(0, 0, 0, 0.1)",

                      webkitTapHighlightColor: "transparent",
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 1,
                        width: 1,
                      }}
                    >
                      <CircularProgress />
                    </Stack>
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };

  const _renderTimeSheetContent = () => {
    if (activeTab !== "timeSheet") return;
    return <TimeSheet data={company} filters={filters} />;
  };

  const _renderFooter = () => {
    return (
      <Stack direction="column" alignItems="center" sx={{ marginTop: "16px" }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, color: "#212121" }}
        >
          Weekly total
        </Typography>
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#212121",
              marginRight: "16px",
            }}
          >
            Work time: {totalTime.work}h
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 400, color: "#212121" }}
          >
            Break time: {totalTime.break}h
          </Typography>
        </Stack>
      </Stack>
    );
  };

  const _redderCreatePopup = () => (
    // <TimeTrackingPopup.TimeCreate
    //   open={isOpenCreatePopup}
    //   onClose={() => setIsOpenCreatePopup(false)}
    //   currentScreen="companyTime"
    // />
    <p>hello</p>
  );

  return (
    <Stack direction="column" sx={{ position: "relative" }}>
      {_renderHeader()}
      {_renderCalendarModule()}
      {_renderTable()}
      {_renderTimeSheetContent()}
      {_renderFooter()}
      {_redderCreatePopup()}
    </Stack>
  );
};

export default TrackingCalendar;
