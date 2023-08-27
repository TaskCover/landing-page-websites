"use client";

import { TableRow } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import React, { memo } from "react";
import { COLOR_STAGE_STATUS, TEXT_STAGE_STATUS } from "./helpers";
import { Dropdown } from "components/Filters";
import { formatDate, formatNumber } from "utils/index";
import { DATE_FORMAT_SLASH, SHORT_TIME_FORMAT } from "constant/index";

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
      <BodyCell>{item.name}</BodyCell>
      <StatusCell
        color={COLOR_STAGE_STATUS[item.stage]}
        text={TEXT_STAGE_STATUS[item.stage]}
        width={93}
      >
        {item.stage}
      </StatusCell>   
      <BodyCell>
        <Dropdown name="owner" value={item.owner} onChange={onChange} options={dropdwonDummy} />
      </BodyCell>
      <BodyCell>
        {formatNumber(item.revenue, {
          prefix: "$",
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell >
        {formatNumber(item.pjRevenue, {
          prefix: "$",
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell>{formatDate(item.time, SHORT_TIME_FORMAT)}h</BodyCell>
      <BodyCell>{formatNumber(item.probability, { suffix: "%" })}</BodyCell>
      <BodyCell>{formatDate(item.lastActivity, DATE_FORMAT_SLASH)}</BodyCell>
    </TableRow>
  );
};

export default memo(SaleItem);
