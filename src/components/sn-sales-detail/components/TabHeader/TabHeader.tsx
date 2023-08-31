import { Stack } from "@mui/material";
import { formErrorCode } from "api/formErrorCode";
import Avatar from "components/Avatar";
import { Dropdown } from "components/Filters";
import { Text } from "components/shared";
import { useGetStageOptions } from "components/sn-sales-detail/hooks/useGetDealDetail";
import {
  CURRENCY_SYMBOL,
  mappingProbabilityOptions,
} from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";
import { NS_COMMON } from "constant/index";
import { ErrorResponse } from "constant/types";
import { Data } from "emoji-mart";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useSaleDetail, useSales } from "store/sales/selectors";
import { formatNumber, getMessageErrorByAPI } from "utils/index";

const TabHeader = () => {
  const { saleDetail } = useSaleDetail();
  const { onUpdateDeal } = useSales();
  const { stageOptions } = useGetStageOptions();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const { control, handleSubmit, getValues } = useFormContext();

  const onSubmit = (name, value) => {
    try {
      onUpdateDeal({ id: saleDetail?.id, [name]: value });
    } catch (error) {
      console.log(error);
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      padding={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" spacing={2}>
        <Avatar size={32} src={saleDetail?.owner.avatar?.link} />
        <Text variant="h4">{saleDetail?.name}</Text>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Controller
          control={control}
          name="status"
          render={({ field }) => {
            const { onChange, ...rest } = field;
            const onSelect = (name: string, value: string) => {
              onChange(value);
              onSubmit(name, value);
            };
            return (
              <Dropdown
                hasAll={false}
                options={stageOptions}
                {...rest}
                onChange={onSelect}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="probability"
          defaultValue={(saleDetail?.probability || 0) + 1}
          render={({ field }) => {
            const { onChange, value, ...rest } = field;
            const onSelect = (name: string, value: number) => {
              onSubmit(name, value - 1);
              onChange(value - 1);
            };
            return (
              <Dropdown
                hasAll={false}
                options={mappingProbabilityOptions}
                {...rest}
                value={value + 1}
                onChange={onSelect}
              />
            );
          }}
        />
        {/* <Dropdown
          hasAll={false}
          value={saleDetail?.probability || 0 + 1}
          onChange={() => console.log("change here")}
          options={mappingProbabilityOptions}
          name="probability"
        /> */}
        <Stack direction="row" justifyContent={"center"} alignItems="center">
          {/* Add coin icon here */}
          <Text variant="body2">
            Revenue:{" "}
            {formatNumber(saleDetail?.revenue || 0, {
              numberOfFixed: 2,
              prefix:
                CURRENCY_SYMBOL[saleDetail?.currency || CURRENCY_CODE.USD],
            })}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TabHeader;
