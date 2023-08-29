import {
  DialogContent,
  Modal,
  Stack,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { memo } from "react";
import FormLayout from "components/FormLayout";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select } from "components/shared";
import SelectMultiple from "../components/SelectMultiple";
import { CURRENCY_SYMBOL } from "../helpers";
import useGetCompanyOptions from "../hooks/useGetCompanyOptions";
import useGetEmployeeOptions from "../hooks/useGetEmployeeOptions";

interface IProps {
  open: boolean;
  onClose(): void;
}

const salesFormTranslatePrefix = "list.newDealForm";

const UNIT_OPTIONS = Object.keys(CURRENCY_SYMBOL).map((key) => ({
  label: `${key}(${CURRENCY_SYMBOL[key]})`,
  value: key,
}));

const AddDealModal = ({ open, onClose }: IProps) => {
  const {
    companyIsFetching,
    companyOptions,
    onEndReachedCompanyOptions,
  } = useGetCompanyOptions();

  const { employeeOptions, employeeIsFetching, onEndReachedEmployeeOptions } = useGetEmployeeOptions();
  
  //create form
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const schema = yup.object().shape({
    dealName: yup.string().required(commonT("form.error.required")),
    company: yup.string(),
    currency: yup.string().oneOf(Object.keys(CURRENCY_SYMBOL), commonT('form.error.invalid')).required('form.error.required'),
    owner: yup.string().required('form.error.required'),
    dealMember: yup.array().of(yup.string()),
    tags: yup.string(),
  });

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      dealName: "",
      company: companyOptions[0]?.value as string || '',
      currency: UNIT_OPTIONS[0].value,
      owner: "abc",
      dealMember: ["abc"],
      tags: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onClose();
    reset();
  };

  const MEMBER_OPTIONS = [
    {
      label: "ABC",
      value: "abc",
    },
    {
      label: "bcd",
      value: "bcd",
    },
  ];
  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      open={open}
      label={salesT(`${salesFormTranslatePrefix}.title`)}
      submitText={salesT(`${salesFormTranslatePrefix}.submit`)}
      cancelText={commonT("form.cancel")}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={2} direction="column" sx={{ mb: 4 }}>
        <Controller
          control={control}
          name="dealName"
          render={({ field }) => (
            <Input
              fullWidth
              {...field}
              title={salesT(`${salesFormTranslatePrefix}.dealName`)}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <Select
                  options={companyOptions}
                  fullWidth
                  onEndReached={onEndReachedCompanyOptions}
                  pending={companyIsFetching}
                  {...field}
                  title={salesT(`${salesFormTranslatePrefix}.company`)}
                />
              )}
            />
          </Grid>
          <Grid item xs>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select
                  options={UNIT_OPTIONS}
                  fullWidth
                  {...field}
                  title={salesT(`${salesFormTranslatePrefix}.unit`)}
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="owner"
          render={({ field }) => (
            <Select
              fullWidth
              options={employeeOptions}
              onEndReached={onEndReachedEmployeeOptions}
              pending={employeeIsFetching}
              {...field}
              title={salesT(`${salesFormTranslatePrefix}.owner`)}
            />
          )}
        />
        <Controller
          control={control}
          name="dealMember"
          render={({ field }) => {
            const { onChange, ...props } = field;
            const onSelect = (e, data) => {
              const mappingData = data.map((item) => item.value);
              onChange(mappingData);
            };
            return (
              <SelectMultiple
                options={employeeOptions}
                onSelect={onSelect}
                onEndReached={onEndReachedEmployeeOptions}
                loading={employeeIsFetching}
                label={salesT(`${salesFormTranslatePrefix}.dealMember`)}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <Select
              placeholder="--"
              fullWidth
              options={MEMBER_OPTIONS}
              {...field}
              title={salesT(`${salesFormTranslatePrefix}.tags`)}
            />
          )}
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(AddDealModal);
