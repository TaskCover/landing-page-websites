"use client";

import { TableRow, Stack } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  COLOR_STAGE_STATUS,
  TEXT_STAGE_STATUS,
  CURRENCY_SYMBOL,
  mappingStageStatusOptions,
} from "./helpers";
import { Dropdown } from "components/Filters";
import {
  formatDate,
  formatNumber,
  formatEstimateTime,
  getPath,
  formatCurrency,
  getMessageErrorByAPI,
} from "utils/index";
import { DATE_LOCALE_FORMAT, NS_SALES } from "constant/index";
import Avatar from "components/Avatar";
import { IconButton, Text } from "components/shared";
import { Sales } from "store/sales/reducer";
import useGetEmployeeOptions from "./hooks/useGetEmployeeOptions";
import { useSaleDetail, useSales } from "store/sales/selectors";
import { SALE_DETAIL_PATH } from "constant/paths";
import { Option, User } from "constant/types";
import { useGetStageOptions } from "components/sn-sales-detail/hooks/useGetDealDetail";
import LabelStatusCell from "./components/LabelStatusCell";
import { useSnackbar } from "store/app/selectors";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import LockIcon from "icons/LockIcon";
import UnlockIcon from "icons/UnlockIcon";
import ServiceItemAction from "./components/ItemsAction";
import { Action } from "components/sn-sales-detail/components/TodoList/SubItem";

interface IProps {
  setShouldLoad: (value: boolean) => void;
  item: Sales; // change to data type
}
const SaleItem = ({ item, setShouldLoad }: IProps) => {
  const commonT = useTranslations(NS_SALES);
  const { employeeOptions, onEndReachedEmployeeOptions, onSearchEmployee } =
    useGetEmployeeOptions();
  const { onUpdateDeal, onCreateDeal } = useSales();
  const { onAddSnackbar } = useSnackbar();
  const [owner, setOwner] = useState<string>(item.owner?.id);
  const [stage, setStage] = useState<string>(item.status);
  const [probability, setProbability] = useState<number>(item.probability + 1);
  const rowRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const { onSetRevenue } = useSaleDetail();
  const time = item.estimate || 0;

  const onSubmit = async (data) => {
    try {
      setShouldLoad(false);
      await onUpdateDeal({
        owner: data.owner,
        id: item.id,
        status: data.status,
        probability: data.probability,
      });
    } catch (error) {
      console.log(error);
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      throw error;
    }
  };

  const mappedOwners = useMemo(() => {
    const result = [...employeeOptions];
    const isExist = result.find(
      (employee) => employee.value === item.owner?.id,
    );
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

  const mappingProbabilityOptions: Option[] = useMemo(
    () =>
      Array.from(new Array(11), (value, index) => ({
        label: `${index * 10}%`,
        value: index * 10 + 1,
      })),
    [],
  );

  useEffect(() => {
    setStage(item.status);
    setProbability(item.probability + 1);
    setOwner(item.owner?.id);
  }, [item.owner, item.status, item.probability]);

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
    <TableRow
      hover
      onMouseLeave={() => {
        setIsFocused(false);
      }}
      onMouseEnter={() => {
        setIsFocused(true);
      }}
      sx={{
        "&.MuiTableRow-hover:hover": {
          backgroundColor: "grey.50",
        },
        w: "100%",
      }}
    >
      <BodyCell
        align="left"
        href={getPath(SALE_DETAIL_PATH, undefined, { id: item.id })}
        onClick={() => onSetRevenue(item.revenue)}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={mappedowner.avatar || ""}></Avatar>
          <Text
            variant="body2"
            color="text.primary"
            fontWeight={600}
            lineHeight={1.28}
            sx={{
              "&:hover": { color: "primary.main" },
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              wordBreak: "break-word",
              display: "-webkit-box",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </Text>
        </Stack>
      </BodyCell>
      <BodyCell>
        <LabelStatusCell
          fullWidth
          options={mappingStageStatusOptions}
          value={stage}
          defaultValue={stage}
          onChange={(e) => {
            onSubmit({ status: e.target.value });
            setStage(e.target.value);
          }}
        ></LabelStatusCell>
      </BodyCell>
      <BodyCell align="left">
        <Dropdown
          name="owner"
          rootSx={{
            width: "100%",
            px: "0!important",
            [`& .MuiSelect-select`]: {
              mr: "17px!important",
            },
            [`& .MuiSelect-icon`]: {
              right: "-5px!important",
            },
            [`& .MuiTypography-root`]: {
              WebkitLineClamp: 2,
              width: "90px",
              textOverflow: "ellipsis",
            },
            mr: "10px",
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
        {formatCurrency(item.revenue, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="right">
        {formatCurrency(item.revenuePJ, {
          prefix: CURRENCY_SYMBOL[item.currency],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell size="small" align="right">
        {`${time}h`}
      </BodyCell>
      <BodyCell align="right">
        <Dropdown
          name="probability"
          rootSx={{
            width: "100%",
            px: "0!important",
            [`& .MuiSelect-select`]: {
              mr: "20px!important",
            },
            // [`& .MuiSelect-icon`]: {
            //   right: "-5px!important",
            // },
          }}
          onChange={async (name, value) => {
            await onSubmit({ probability: value - 1 }).then(() => {
              setProbability(value);
            });
          }}
          size="small"
          hasAll={false}
          value={probability}
          options={mappingProbabilityOptions}
        />
      </BodyCell>
      <BodyCell align="left" padding={isFocused ? "none" : "normal"}>
        <Stack
          direction={"row"}
          spacing={0}
          sx={{
            position: "relative",
            zIndex: 99,
            pr: 2,
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="3px"
        >
          <Stack
            sx={{
              w: "100%",
            }}
          >
            {dayjs(item.updated_time).format(DATE_LOCALE_FORMAT)}
          </Stack>
          {isFocused && (
            <ServiceItemAction
              onChangeAction={(action) => {
                if (action === Action.DUPLICATE) {
                  onCreateDeal({
                    currency: item.currency,
                    dealName: item.name,
                    owner: item.owner?.id,
                    members: item.members?.map((member) => ({ id: member.id })),
                    description: item.description,
                    tags: item.description?.split(","),
                  });
                }
              }}
              saleId={item.id}
              index={1}
            />
          )}
        </Stack>
      </BodyCell>
    </TableRow>
  );
};

export default SaleItem;
