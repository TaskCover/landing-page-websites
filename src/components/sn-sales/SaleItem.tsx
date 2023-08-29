"use client";

import { TableRow, Stack } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import React, { memo } from "react";
import {
  COLOR_STAGE_STATUS,
  TEXT_STAGE_STATUS,
  CURRENCY_SYMBOL,
} from "./helpers";
import { Dropdown } from "components/Filters";
import {
  formatDate,
  formatNumber,
  getTimeDurationInHoursAndMinutes,
} from "utils/index";
import { DATE_FORMAT_SLASH, NS_SALES, SHORT_TIME_FORMAT } from "constant/index";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Sales } from "store/sales/reducer";

interface IProps {
  item: Sales; // change to data type
}
const SaleItem = ({ item }: IProps) => {
  const onChange = () => {
    return;
  };

  const owner = [
    {
      value: item.owner.id,
      label: item.owner.fullname,
    },
  ];

  const time = getTimeDurationInHoursAndMinutes(item.start_date);

  return (
    <TableRow>
      <BodyCell align="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item.owner.avatar?.link || ""}></Avatar>
          <Text> {item.name}</Text>
        </Stack>
      </BodyCell>
      <StatusCell
        color={COLOR_STAGE_STATUS[item.status]}
        text={TEXT_STAGE_STATUS[item.status]}
        namespace={NS_SALES}
      >
        {item.stage}
      </StatusCell>
      <BodyCell align="left">
        <Dropdown
          rootSx={{
            width: "100%",
            px: "0!important",
          }}
          sx={{
            width: "100%",
          }}
          onChange={onChange}
          size="small"
          name="owner"
          value={item.owner.id}
          options={owner}
        />
      </BodyCell>
      {/* // TODO: improve when make clear api */}
      <BodyCell align="right">
        {formatNumber(0, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(0, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell width="11%" size="small" align="right">
        {time}h
      </BodyCell>
      <BodyCell align="right">{item.probability}</BodyCell>
      <BodyCell align="left">
        {formatDate(item.updated_time, DATE_FORMAT_SLASH)}
      </BodyCell>
    </TableRow>
  );
};

export default memo(SaleItem);
