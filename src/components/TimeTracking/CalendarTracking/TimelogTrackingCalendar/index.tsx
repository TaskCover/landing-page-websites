"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Divider,
  // Grid,
  Link,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import Filter from "../../Component/Filter";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import { MobileDatePicker } from "@mui/x-date-pickers";

// import { TimeTrackingActions } from "@/Actions";
// import { useTypedDispatch, RootState } from "@/store";
import { ENUMS, ROUTERS } from "../../Component/Constants";

//const { getTimeLog } = TimeTrackingActions;
const { TASK_ACTION } = ENUMS;

const taskActionStrings = {
  [TASK_ACTION.CREATE_TASK_LIST]: "Create task list",
  [TASK_ACTION.MOVE_TASK]: "Move task",
  [TASK_ACTION.UPDATE_INACTIVE_TASK_LIST]: "Update inactive task list",
  [TASK_ACTION.UPDATE_TASK_LIST]: "Update task list",
  [TASK_ACTION.UPDATE_TASK]: "Update task",
  [TASK_ACTION.UPDATE_SUB_TASK]: "Update sub task",
  [TASK_ACTION.UPDATE_INACTIVE_TASK]: "Update inactive task",
  [TASK_ACTION.UPDATE_INACTIVE_SUB_TASK]: "Update tnactive sub task",
  [TASK_ACTION.CREATE_TASK]: "Create task",
  [TASK_ACTION.CREATE_SUB_TASK]: "Create sub task",
};
interface IProps {
  events: any[];
  onClick(action: "create" | "edit", item?: any): void;
}

// const headerStyles = {
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'row',
//   fontSize: '14px',
//   fontWeight: 600,
//   lineHeight: '18px',
//   color: '#999999',
//   height: '62px',
//   padding: '12px 16px',
// };

// const bodyStyles = {
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'row',
//   fontSize: '14px',
//   fontWeight: 400,
//   color: '#212121',
//   lineHeight: '22px',
//   height: '49px',
//   padding: '12px 16px',
// };

interface ITimeLogStructure {
  id: string;
  user_id: string;
  user: any;
  project_id: string;
  project: any;
  task_id: string;
  task_name: string;
  task_number: string;
  created_time: string;
  action: string;
}

const TimelogTrackingCalendar: React.FC<IProps> = ({}) => {
  //const dispatch = useTypedDispatch();
  const payload: any = [];
  const isGetLoading: any = false;
  const [isOpen, setIsOpen] = useState(false);
  const [timeLogs, setTimeLogs] = useState<ITimeLogStructure[]>([]);
  const [filters, setFilters] = useState({
    search_key: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  // useEffect(() => {
  //   dispatch(getTimeLog(filters));
  // }, []);

  useEffect(() => {
    setTimeLogs(payload?.data);
  }, [payload]);

  const getTaskActionString = (action: string) => {
    return taskActionStrings[action as keyof typeof taskActionStrings] || "";
  };
  const _renderItem = () => {
    if (_.isEmpty(timeLogs) && !isGetLoading)
      return (
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: 400,
            color: "#666666",
          }}
        >
          No data were found
        </Typography>
      );
    return _.map(timeLogs, (timeLog: ITimeLogStructure, index: number) => {
      return (
        <Box key={timeLog?.id || index}>
          <Stack direction="row" alignItems="center" padding="10px 0">
            <Stack
              direction="column"
              sx={{
                padding: "0 7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "#666666",
                  textAlign: "center",
                }}
              >
                {dayjs(timeLog?.created_time).format("HH:mm")}
              </Typography>
            </Stack>
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#1BC5BD",
                margin: "0 8px 0 15px",
              }}
            />
            <Avatar
              src={timeLog?.user?.avatar?.link}
              sx={{ width: "32px", height: "32px", marginRight: "8px" }}
            />
            <Stack direction="column">
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "#666666",
                }}
              >
                <Link
                  sx={{
                    color: "#212121",
                    textDecoration: "none",
                    marginRight: "8px",
                  }}
                >
                  {timeLog?.user?.email}
                </Link>
                {getTaskActionString(timeLog.action)}
                <Link
                  sx={{
                    color: "#3699FF",
                    textDecoration: "none",
                    margin: "0 6px",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  // onClick={() =>
                  //   Utils.redirect(`${ROUTERS.PROJECTS}/${timeLog?.project_id}`)
                  // }
                >
                  {`${timeLog?.task_number ? `#${timeLog.task_number}` : ""} ${
                    timeLog?.task_name ? "-" : ""
                  } ${timeLog?.task_name}`}
                </Link>
                in {timeLog?.project?.name}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#212121" }}>
                {timeLog?.user?.position?.name}
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ margin: "0" }} />
        </Box>
      );
    });
  };

  const _renderCalendarModule = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: "16px" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* <MobileDatePicker
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            onChange={(date: any) => {
              const newDate = dayjs(date).format("YYYY-MM-DD");
              const newFilters = { ...filters, date: newDate };
              console.log("newFilters", newFilters);
              setFilters(newFilters);
              //dispatch(getTimeLog(newFilters));
            }}
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
                    color: "gray",
                    borderColor: "grey.400",
                  },
                  ":hover": {
                    background: "red",
                  },
                },
              },
            }}
          /> */}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "18px",
              color: "#666666",
              marginRight: "10px",
            }}
          >
            {filters?.date
              ? dayjs(filters?.date).format("DD MMM YYYY")
              : "Choose time range"}
          </Typography>
          <ExpandMoreIcon sx={{ color: "rgba(102, 102, 102, 1)" }} />
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
          onChange={(event) => {
            setFilters({ ...filters, search_key: event?.target.value });
          }}
          // onKeyUp={(event) => {
          //   if (event.key === "Enter" || event.keyCode === 13) {
          //     dispatch(
          //       getTimeLog({
          //         ...filters,
          //         date: dayjs(filters?.date).format("YYYY-MM-DD"),
          //       }),
          //     );
          //   }
          // }}
        />
      </Stack>
    );
  };

  return (
    <Stack direction="column">
      {_renderCalendarModule()}
      <Stack
        sx={{
          width: 1,
          height: `calc(100vh - 300px)`,
          overflow: "auto",
          position: "relative",
        }}
      >
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
        {_renderItem()}
      </Stack>
    </Stack>
  );
};

export default TimelogTrackingCalendar;
