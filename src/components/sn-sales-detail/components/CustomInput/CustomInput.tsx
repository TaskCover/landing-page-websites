import { Stack, inputBaseClasses } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Input, InputProps, Text } from "components/shared";
import React, { forwardRef, memo } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface CustomInputProps {
  control: Control;
  label?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  inputProps?: InputProps;
  register: UseFormRegisterReturn;
}

const CustomInput = (props: CustomInputProps, ref) => {
  const {
    control,
    register,
    label,
    inputProps,
    placeholder,
    helperText,
    defaultValue,
  } = props;
  return (
    <Grid2 container spacing={1} alignItems="center">
      {label && (
        <Grid2 xs={4}>
          <Text variant="body2" color="grey.300">
            {label}
          </Text>
        </Grid2>
      )}
      <Grid2 xs={label ? 8 : 12} position="relative">
        <Controller
          control={control}
          defaultValue={defaultValue}
          {...register}
          render={({ field }) => {
            const { onChange: onFieldChange, ...rest } = field;
            const handleChange = (e) => {
              onFieldChange(e);
              inputProps?.onChange && inputProps.onChange(e);
            };
            return (
              <Input
                maxRows={3}
                minRows={1}
                placeholder={placeholder}
                sx={{
                  width: "100%",
                  [`& .${inputBaseClasses.root}`]: {
                    backgroundColor: "background.paper",
                    pr: helperText ? 3 : 1,
                  },
                }}
                {...inputProps}
                inputRef={ref}
                onChange={(e) => handleChange(e)}
                {...rest}
              />
            );
          }}
        />
        <Stack
          position="absolute"
          right={10}
          top={0}
          height="100%"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text variant="body2" color="grey.300">
            {helperText}
          </Text>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default forwardRef(CustomInput);