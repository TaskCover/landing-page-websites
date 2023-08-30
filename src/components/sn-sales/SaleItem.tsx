"use client";

import { TableRow, Stack } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import React, { memo, use, useEffect, useMemo, useState } from "react";
import {
  COLOR_STAGE_STATUS,
  TEXT_STAGE_STATUS,
  CURRENCY_SYMBOL,
} from "./helpers";
import { Dropdown } from "components/Filters";
import { formatDate, formatNumber, formatEstimateTime } from "utils/index";
import { DATE_FORMAT_SLASH, NS_SALES } from "constant/index";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Sales } from "store/sales/reducer";
import useGetEmployeeOptions from "./hooks/useGetEmployeeOptions";
import { useSales } from "store/sales/selectors";
interface IProps {
  item: Sales; // change to data type
}
const SaleItem = ({ item }: IProps) => {
  const { employeeOptions, onEndReachedEmployeeOptions, onSearchEmployee } =
    useGetEmployeeOptions();
  const { onUpdateDeal } = useSales();
  const [owner, setOwner] = useState(item.owner.id);

  const time = formatEstimateTime(item.estimate || 0);

  const onSubmit = (data) => {
    onUpdateDeal({ owner: data.owner, id: item.id });
  };

  const avatar = useMemo(() => {
    const result = employeeOptions.find((item) => item.value === owner);
    return result?.avatar || "";
  }, [JSON.stringify(item.owner)]);

  return (
    <TableRow>
      <BodyCell align="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={avatar}></Avatar>
          <Text> {item.name}</Text>
        </Stack>
      </BodyCell>
      <StatusCell
        color={COLOR_STAGE_STATUS[item.status]}
        text={TEXT_STAGE_STATUS[item.status]}
        namespace={NS_SALES}
        width="120px"
        size="small"
      >
        {item.stage}
      </StatusCell>
      <BodyCell align="left">
        <Dropdown
          name="owner"
          rootSx={{
            width: "100%",
            px: "0!important",
          }}
          sx={{
            width: "100%",
          }}
          onChange={(name, value) => {
            onSubmit({ owner: value });
            setOwner(value as string);
          }}
          size="small"
          hasAll={false}
          onEndReached={onEndReachedEmployeeOptions}
          onChangeSearch={(name, value) => {
            onSearchEmployee(name, value as string);
          }}
          value={owner}
          options={employeeOptions}
        />
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(item.revenue, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="right">
        {formatNumber(item.revenuePJ, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell width="11%" size="small" align="right">
        {`${time}h`}
      </BodyCell>
      <BodyCell align="right">{item.probability}</BodyCell>
      <BodyCell align="left">
        {formatDate(item.updated_time, DATE_FORMAT_SLASH)}
      </BodyCell>
    </TableRow>
  );
};

export default memo(SaleItem);
