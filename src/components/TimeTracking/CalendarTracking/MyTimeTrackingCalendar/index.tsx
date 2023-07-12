"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import _ from "lodash";
import { styled } from "@mui/system";
import {
  Avatar,
  Button,
  Grid,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Box,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from "@fullcalendar/react"; // Import DateClickArg type
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import enLocale from '@fullcalendar/core/locales/en-nz';
// import viLocale from '@fullcalendar/core/locales/vi';

import Filter from "../../Component/Filter";
import { calendarStyles } from "./TrackingCalendar.styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TimeSheet from "./TimeSheet";
import { useTranslations } from "next-intl";
import { NS_TIME_TRACKING } from "constant/index";
import PlusIcon from "icons/PlusIcon";
import ButtonCalendar from "components/shared/ButtonCalendar";
import CalendarIcon from "icons/CalendarIcon";
import ListIcon from "@mui/icons-material/List";
import DayIcon from "icons/DayIcon";
import CustomizedInputBase from "components/shared/InputSeasrch";
import { useGetMyTimeSheet } from "store/timeTracking/selectors";
import TimeCreate from "../../TimeTrackingModal/TimeCreate";
const eventStyles = {
  working_time: {
    borderLeft: `4px solid rgba(54, 153, 255, 1)`,
    background: "rgba(225, 240, 255, 1)",
  },
  break_time: {
    borderLeft: `4px solid rgba(246, 78, 96, 1)`,
    background: "rgba(246, 78, 96, 0.1)",
  },
};

const subEventDayStyles = {
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "18px",
  color: "#212121",
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
  // const locale = Utils.getSaveLocale();

  const { items: myTime, onGetMyTimeSheet } = useGetMyTimeSheet();

  const t = useTranslations(NS_TIME_TRACKING);

  const isGetLoading: any = false;

  const userData = {};
  const calendarRef = React.useRef<FullCalendar>(null);
  const [filters, setFilters] = React.useState<IFilter>(DEFAULT_FILTER);
  const prevFilters = React.useRef<IFilter>(DEFAULT_FILTER);
  prevFilters.current = filters;

  const [currentDate, setCurrentDate] = React.useState<string>(
    dayjs().toString(),
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCreatePopup, setIsOpenCreatePopup] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<string>("timeSheet");
  const [events, setEvents] = React.useState<any[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  const [dateRange, setDateRange] = React.useState<any[]>([]);
  const [totalTime, setTotalTime] = React.useState({
    work: 0,
    break: 0,
  });

  React.useEffect(() => {
    if (!_.isEmpty(myTime)) {
      const result: any[] = [];
      let totalWorkTime = 0;
      let totalBreakTime = 0;
      _.forEach(myTime, (timesheet) => {
        if (!_.isEmpty(timesheet)) {
          const newEvent = {
            title: timesheet?.project?.name,
            start: timesheet?.start_time,
            end: timesheet?.end_time,
            extendedProps: {
              id: timesheet?.id,
              date: timesheet?.day,
              project: timesheet?.project,
              name: "hello",
              position: timesheet?.position,
              hour: timesheet?.duration,
              typeDefault: timesheet?.type,
              type:
                timesheet?.type === "Work time" ? "working_time" : "break_time",
              note: timesheet?.note,
            },
          };
          if (timesheet.type === "Work time")
            totalWorkTime += timesheet.duration;
          else totalBreakTime += timesheet.duration;
          result.push(newEvent);
        }
      });
      setTotalTime({
        work: totalWorkTime,
        break: totalBreakTime,
      });
      setEvents(result);
    }
  }, [myTime]);

  React.useEffect(() => {
    if (
      !_.isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
      onGetMyTimeSheet(filters);
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const onAction = (action: "view" | "week", value: string) => {
    const calendarApi = calendarRef?.current && calendarRef?.current.getApi();

    if (action === "week") {
      if (value === "today") {
        const currentDate = new Date();
        const currentDayjs = dayjs().toString();
        setCurrentDate(currentDayjs);
        setSelectedDate(currentDate);
        setFilters(DEFAULT_FILTER);
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
        setCurrentDate("");
        setSelectedDate(null);
        // if (calendarApi) {
        //   calendarApi.prev();
        //   calendarApi.refetchEvents();
        // }
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
        // if (calendarApi) {
        //   calendarApi.next();
        //   calendarApi.refetchEvents();
        // }
      }
    }
  };

  const _renderHeader = () => {
    return (
      <Grid container>
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
                    color: "green",
                    borderColor: "hotpink",
                  },
                  ":hover": {
                    background: "red",
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ gap: "3px" }}
          >
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
            onClick={() => handleTabChange("timeSheet")}
          />
          <ButtonCalendar
            icon={<CalendarIcon />}
            isActive={activeTab === "timeGridWeek"}
            title="Calendar"
            onClick={() => {
              onAction("view", "timeGridWeek");
              handleTabChange("timeGridWeek");
            }}
          />
          <ButtonCalendar
            icon={<DayIcon />}
            isActive={activeTab === "dayGridWeek"}
            title="Day"
            onClick={() => handleTabChange("dayGridWeek")}
          />
        </Stack>
        <CustomizedInputBase
          value={filters.search_key}
          onChange={(event) =>
            setFilters({ ...filters, search_key: event.target.value })
          }
          // onKeyUp={(event) =>
          //   event.key === "Enter" && onGetMyTimeSheet(filters)
          // }
        />
      </Stack>
    );
  };

  const _renderCalendar = () =>
    activeTab === "timeGridWeek" && (
      <Stack sx={{ ...calendarStyles }} className={`view-timeGridWeek`}>
        <FullCalendar
          ref={calendarRef}
          // locale={locale === 'en' ? enLocale : viLocale}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView={"timeGridWeek"}
          weekends={true}
          headerToolbar={false}
          eventChange={(arg: any) => ""}
          eventDidMount={(arg: any) => ""}
          allDaySlot={false}
          events={events}
          dayHeaderContent={(eventInfo: {
            date: Date;
            text: string;
            isToday: boolean;
          }) => {
            // const date = dayjs(eventInfo.date);
            const dayOfWeek = eventInfo.text.split(" ").shift();
            // const isSelected = dayjs(dayjs(date).format('YYYY-MM-DDDD')).isSame(
            //   dayjs(selectedDate).format('YYYY-MM-DDDD')
            // );
            return (
              <Stack
                direction="column"
                // sx={{ cursor: 'pointer' }}
                // onClick={() => {
                //   setSelectedDate(date);
                // }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    fontWeight: 400,
                    textAlign: "left",
                    // color: isSelected ? CommonColors.brandColor : '#71717A',
                  }}
                >
                  {dayOfWeek}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "20px",
                    textAlign: "left",
                    fontWeight: 600,
                    // color: isSelected ? CommonColors.brandColor : '#212121',
                  }}
                >
                  {dayjs(eventInfo?.date).isValid() &&
                    dayjs(eventInfo?.date).format("DD")}
                </Typography>
              </Stack>
            );
          }}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
          }}
          eventContent={(eventInfo) => {
            const type = eventInfo?.event?.extendedProps?.type;
            const styles = eventStyles[type as "working_time" | "break_time"];
            const boxStyles = {
              position: "relative",
              ...styles,
              height: "100%",
              padding: "0 6px",
              "&:hover": {
                cursor: "pointer",
                opacity: 1,
                transtion: "all .3s ease-in-out",
                height: "100%",
                ".fc-event-main": {
                  overflow: "visible!important",
                },
                ".same-time-worker": {
                  visibility: "visible",
                },
              },
            };
            if (type === "working_time")
              return (
                <Stack direction="column" sx={boxStyles}>
                  <Stack direction="row" alignItems="center">
                    <Avatar sx={{ width: "20px", height: "20px" }} />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        marginLeft: "4px",
                        color: "red",
                      }}
                    >
                      {eventInfo?.event?.extendedProps.name}
                    </Typography>
                  </Stack>
                  <Typography sx={subEventDayStyles}>
                    {eventInfo?.event?.extendedProps?.position?.name || "--"}
                  </Typography>
                  <Typography sx={subEventDayStyles}>
                    {eventInfo?.event?.extendedProps.hour}
                  </Typography>
                  <Stack
                    className="same-time-worker"
                    sx={{
                      visibility: "hidden",
                      transition: "all .3s ease-in-out",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        lineHeight: "18px",
                        fontWeight: 400,
                        color: "#212121",
                        mb: 1,
                      }}
                    >
                      Người làm cùng giờ:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Avatar sx={{ width: 20, height: 20 }} />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#000",
                        }}
                      >
                        Marvin McKinney
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Avatar sx={{ width: 20, height: 20 }} />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#000",
                        }}
                      >
                        Marvin McKinney
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              );
            return (
              <Stack direction="column" sx={boxStyles}>
                <Stack direction="row" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: "6px",
                    }}
                  >
                    <Avatar sx={{ width: 20, height: 20 }} />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "rgba(246, 78, 96, 1)",
                      }}
                    >
                      {eventInfo?.event?.extendedProps.name}
                    </Typography>
                  </Box>
                </Stack>
                <Typography sx={subEventDayStyles}>
                  {eventInfo?.event?.extendedProps.position?.name}
                </Typography>
                <Stack
                  className="same-time-worker"
                  sx={{
                    visibility: "hidden",
                    transition: "all .3s ease-in-out",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: 400,
                      color: "#212121",
                      mb: 1,
                    }}
                  >
                    Người làm cùng giờ:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Avatar sx={{ width: 20, height: 20 }} />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#000",
                      }}
                    >
                      Marvin McKinney
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Avatar sx={{ width: 20, height: 20 }} />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#000",
                      }}
                    >
                      Marvin McKinney
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            );
          }}
          slotLabelContent={(eventInfo: { date: Date }) => {
            const currentTime = dayjs(eventInfo.date).format("hh:mm A");
            return (
              <Typography
                sx={{
                  // width: '128px',
                  textAlign: "left",
                  padding: "0px 8px",
                  fontSize: "12px",
                  lineHeight: "18px",
                  fontWeight: 400,
                  color: "#666666",
                }}
              >
                {currentTime}
              </Typography>
            );
          }}
          viewDidMount={(view) => {
            const timeGridAxisElement = view.el.querySelector(
              ".fc-timegrid-axis-frame",
            );
            if (timeGridAxisElement) timeGridAxisElement.innerHTML = "Time";
          }}
          allDayDidMount={(arg) => ""}
        />
      </Stack>
    );

  const _renderTable = () => {
    if (activeTab !== "dayGridWeek") return;
    return (
      <Grid container spacing={1}>
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
                      <Tooltip title="Click to view detail" arrow>
                        <StyledTableRow
                          sx={{ ...rowStyles, cursor: "pointer" }}
                          key={index}
                          onClick={() => setSelectedEvent(event)}
                        >
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
                            {event?.extendedProps?.position?.name}
                          </StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            {event?.extendedProps?.hour || 0}h
                          </StyledTableCell>
                          <StyledTableCell>
                            {event?.extendedProps?.note}
                          </StyledTableCell>
                        </StyledTableRow>
                      </Tooltip>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={9}
                      align="center"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        p: 1,
                        widtH: 1,
                      }}
                    >
                      No data were found
                    </StyledTableCell>
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
    <TimeCreate
      open={isOpenCreatePopup}
      onClose={() => setIsOpenCreatePopup(false)}
      filters={filters}
      currentScreen="myTime"
    />
  );

  const _redderUpdatePopup = () => (
    // <TimeTrackingPopup.TimeDetails
    //   open={!!selectedEvent}
    //   onClose={() => setSelectedEvent(null)}
    //   payload={selectedEvent}
    //   filters={filters}
    // />
    <p>hello</p>
  );

  const _renderTimeSheetContent = () => {
    if (activeTab !== "timeSheet") return;
    return <TimeSheet data={myTime} filters={filters} />;
  };

  return (
    <Stack
      direction="column"
      sx={{
        ".fc-toolbar .fc-timeGridWeek-button": {
          display: "none",
        },
      }}
    >
      {_renderHeader()}
      {_renderCalendarModule()}
      {_renderCalendar()}
      {_renderTimeSheetContent()}
      {_renderTable()}
      {_renderFooter()}
      {_redderCreatePopup()}
      {/* {_redderUpdatePopup()} */}
    </Stack>
  );
};

export default TrackingCalendar;
