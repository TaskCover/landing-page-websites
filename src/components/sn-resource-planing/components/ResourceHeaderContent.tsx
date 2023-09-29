import { ColHeaderContentArg, ResourceApi } from "@fullcalendar/resource";
import { Grid, Typography } from "@mui/material";
import { NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { formatNumberHourToTime } from "utils/index";

interface IProps {
  resource: ColHeaderContentArg;
  totalhour: number;
}

const ResourceHeaderContent = ({ totalhour }: IProps) => {
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  // Header content on the resource table
  return (
    <Grid
      container
      gap={{
        xs: 2,
        md: 1,
      }}
      sx={{ width: 1 }}
    >
      <Grid item xs={4} md={5} />
      <Grid item xs={1} md={2}>
        <Typography sx={{ ...textHeadStyle, color: "#666" }}>
          {resourceT("schedule.resourceHeader.available")}
        </Typography>
        <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>
          160 h
        </Typography>
      </Grid>
      <Grid item xs={1} md={2}>
        <Typography sx={{ ...textHeadStyle, color: "#666" }}>
          {resourceT("schedule.resourceHeader.schedule")}
        </Typography>
        <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>
          {formatNumberHourToTime(totalhour)}
          {/* {formatNumber(totalhour, { numberOfFixed: 2 })}h */}
        </Typography>
      </Grid>
      <Grid item xs={1} md={2}>
        <Typography sx={{ ...textHeadStyle, color: "#666" }}>
          {`${resourceT("schedule.resourceHeader.schedule")}/${resourceT(
            "schedule.resourceHeader.available",
          )}`}
        </Typography>
        <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>0 %</Typography>
      </Grid>
    </Grid>
  );
};
const textHeadStyle = {
  fontSize: "14px",
  fontWeight: 400,
};
export default memo(ResourceHeaderContent);
