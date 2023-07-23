import { getDaysDiff } from "utils/index";

export const renderTimeDiff = (ts: Date | string) => {
  const timeDiff = getDaysDiff(new Date(), new Date(ts));
  const timePositive = Math.abs(timeDiff);
  if (timePositive === 0) {
    return "1m";
  } else if (timePositive < 60) {
    return timePositive + "m";
  } else if (timePositive < 1440) {
    return (timePositive / 60).toFixed(0) + "h";
  } else if (timePositive < 4320) {
    return (timePositive / 60 / 24).toFixed(0);
  }
};
