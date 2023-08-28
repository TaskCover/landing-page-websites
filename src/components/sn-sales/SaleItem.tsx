"use client";

import { TableRow, Stack } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import React, { memo } from "react";
import { COLOR_STAGE_STATUS, TEXT_STAGE_STATUS } from "./helpers";
import { Dropdown } from "components/Filters";
import { formatDate, formatNumber } from "utils/index";
import { DATE_FORMAT_SLASH, NS_SALES, SHORT_TIME_FORMAT } from "constant/index";
import Avatar from "components/Avatar";
import { Text } from "components/shared";

interface IProps {
  item: Record<string, string | number>; // change to data type
}

const dropdwonDummy = [
  {
    value: "Test",
    label: "Test",
  },
];

const SaleItem = ({ item }: IProps) => {
  const onChange = () => {
    console.log("change");
  };

  return (
    <TableRow>
      <BodyCell align="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item.avatar as string}></Avatar>
          <Text > {item.name}</Text>
        </Stack>
      </BodyCell>
      <StatusCell
        color={COLOR_STAGE_STATUS[item.stage]}
        text={TEXT_STAGE_STATUS[item.stage]}
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
          size="small"
          name="owner"
          value={item.owner}
          onChange={onChange}
          options={dropdwonDummy}
        />
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(item.revenue, {
          prefix: "$",
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(item.pjRevenue, {
          prefix: "$",
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell
        align="right"
        tooltip={formatDate(item.created_time, SHORT_TIME_FORMAT)}
      >
        {formatDate(item.time, SHORT_TIME_FORMAT)}h
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(item.probability, { suffix: "%" })}
      </BodyCell>
      <BodyCell align="left">
        {formatDate(item.lastActivity, DATE_FORMAT_SLASH)}
      </BodyCell>
    </TableRow>
  );
};

export default memo(SaleItem);
