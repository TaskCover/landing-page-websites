import { Stack } from "@mui/material";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { formErrorCode } from "api/formErrorCode";
import Avatar from "components/Avatar";
import { Dropdown } from "components/Filters";
import Link from "components/Link";
import { Button, Text } from "components/shared";
import { useGetStageOptions } from "components/sn-sales-detail/hooks/useGetDealDetail";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";
import { NS_COMMON, NS_SALES } from "constant/index";
import { SALES_LIST_PATH } from "constant/paths";
import { ErrorResponse, Option } from "constant/types";
import { Data } from "emoji-mart";
import CoinIcon from "icons/CoinIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useSaleDetail, useSales } from "store/sales/selectors";
import { formatNumber, getMessageErrorByAPI, getPath } from "utils/index";

const TabHeader = () => {
  const { saleDetail } = useSaleDetail();
  const { onUpdateDeal } = useSales();
  const { stageOptions } = useGetStageOptions();
  const { push } = useRouter();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const { control, handleSubmit, getValues } = useFormContext();

  const onSubmit = (name, value) => {
    try {
      onUpdateDeal({ id: saleDetail?.id, [name]: value });
    } catch (error) {
      console.log(error);
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const mappingProbabilityOptions: Option[] = useMemo(
    () =>
      Array.from(new Array(11), (value, index) => ({
        label: `${salesT("list.table.probability")} - ${index * 10}%`,
        value: index * 10 + 1,
      })),
    [],
  );
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={2}
      padding={{
        xs: 0,
        sm: 3,
      }}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        sm: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: "100%",
          flex: 1,
        }}
      >
        <Link href={getPath(SALES_LIST_PATH)}>
          <ArrowLeftIcon
            sx={{ color: "common.black" }}
            height={24}
            width={24}
            color="inherit"
          />
        </Link>
        <Avatar size={32} src={saleDetail?.owner?.avatar?.link} />
        <Text
          variant="h5"
          sx={{
            width: "100%",
            textAlign: "left",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineHeight: 1.28,
            overflow: "hidden",
            wordBreak: "break-word",
            display: "-webkit-box",
            textOverflow: "ellipsis",
          }}
        >
          {saleDetail?.name}
        </Text>
      </Stack>
      <Stack
        direction="row"
        justifyContent={{
          xs: "space-between",
          sm: "flex-end",
        }}
        sx={{
          flex: 1,
        }}
        spacing={2}
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
      >
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
        <Stack
          direction="row"
          justifyContent={"center"}
          alignItems="center"
          spacing={1}
        >
          {/* Add coin icon here */}
          <CoinIcon />
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
