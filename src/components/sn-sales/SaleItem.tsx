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
import {
  formatDate,
  formatNumber,
  formatEstimateTime,
  getPath,
} from "utils/index";
import { DATE_FORMAT_SLASH, NS_SALES } from "constant/index";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Sales } from "store/sales/reducer";
import useGetEmployeeOptions from "./hooks/useGetEmployeeOptions";
import { useSales } from "store/sales/selectors";
import { SALE_DETAIL_PATH } from "constant/paths";
import { Option, User } from "constant/types";

interface IProps {
  item: Sales; // change to data type
}
const SaleItem = ({ item }: IProps) => {
  const { employeeOptions, onEndReachedEmployeeOptions, onSearchEmployee } =
    useGetEmployeeOptions();
  const { onUpdateDeal } = useSales();
  const [owner, setOwner] = useState<string>(item.owner.id);

  const time = formatEstimateTime(item.estimate || 0);

  const onSubmit = (data) => {
    onUpdateDeal({ owner: data.owner, id: item.id });
  };

  const mappedOwners = useMemo(() => {
    const result = [...employeeOptions];
    const isExist = result.find((employee) => employee.value === item.owner.id);
    if (!isExist) {
      result.push({
        label: item.owner?.fullname,
        value: item.owner?.id,
        avatar: item.owner?.avatar?.link,
        subText: item.owner?.email,
      });
    }
    return result;
  }, [employeeOptions]);

  const mappedowner = useMemo(() => {
    const result = mappedOwners.find((item) => item.value === owner);
    return (
      result ||
      ({
        label: "",
        value: "",
        avatar: "",
        subText: "",
      } as Option)
    );
  }, [JSON.stringify(item.owner), owner]);

  return (
    <TableRow>
      <BodyCell
        align="left"
        href={getPath(SALE_DETAIL_PATH, undefined, { id: item.id })}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={mappedowner.avatar || ""}></Avatar>
          <Text
            variant="body2"
            color="text.primary"
            fontWeight={600}
            lineHeight={1.28}
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            {item.name}
          </Text>
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
            setOwner(value);
          }}
          size="small"
          hasAll={false}
          onEndReached={onEndReachedEmployeeOptions}
          onChangeSearch={(name, value) => {
            onSearchEmployee(name, value as string);
          }}
          value={owner}
          options={mappedOwners}
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
      <BodyCell align="right">
        {formatNumber(item.probability, {
          suffix: "%",
        })}
      </BodyCell>
      <BodyCell align="left">
        {formatDate(item.updated_time, DATE_FORMAT_SLASH)}
      </BodyCell>
    </TableRow>
  );
};

export default memo(SaleItem);
