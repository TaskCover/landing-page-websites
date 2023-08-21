import { getDaysDiff, getMonthShortName } from "utils/index";

export const renderTimeDiff = (ts: string) => {
  if (!ts) return;
  const currentDate = new Date();
  const date = new Date(ts);
  const timeDiff = getDaysDiff(currentDate, date);
  const timePositive = Math.abs(timeDiff);
  const isShowYear = currentDate.getFullYear() !== date.getFullYear();
  const showDate = `${date.getDate()} ${getMonthShortName(
    Number(date.getMonth()),
  )} ${isShowYear ? date.getFullYear() : ""}`.trim();

  if (timePositive === 0) {
    return "1m";
  } else if (timePositive < 60) {
    return timePositive + "m";
  } else if (timePositive < 1440) {
    return (timePositive / 60).toFixed(0) + "h";
  } else if (timePositive < 4320) {
    return (timePositive / 60 / 24).toFixed(0) + "d";
  } else {
    return showDate;
  }
};
