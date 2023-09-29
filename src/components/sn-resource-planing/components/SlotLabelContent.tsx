import { SlotLabelContentArg } from "@fullcalendar/core";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { weekdays } from "../hepler";

interface IProps {
  arg: SlotLabelContentArg;
}

const SlotLabelContent = ({ arg }: IProps) => {
  // Content label for each slot on calendar
  const date = dayjs(arg?.date);
  const weekday = weekdays[date.day()];
  const isSelected = dayjs(date.format("YYYY-MM-DDDD")).isSame(
    dayjs().format("YYYY-MM-DDDD"),
  );
  // const isWeekend = date.get('d') === 1 || date.get('d') === 5;
  return (
    <Stack direction="column">
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: "10px",
          fontWeight: 400,
          textAlign: "left",
          color: isSelected ? "#1BC5BD" : "#212121",
        }}
      >
        {weekday}
      </Typography>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: "14px",
          textAlign: "left",
          fontWeight: 600,
          color: isSelected ? "#1BC5BD" : "#212121",
        }}
      >
        {date.isValid() && date.format("DD")}
      </Typography>
    </Stack>
  );
};

export default SlotLabelContent;
