import { Stack, inputBaseClasses } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Input, InputProps, Text } from "components/shared";
import React, { forwardRef, memo, useContext, useEffect, useRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import CustomLabelSelect from "../CustomLabelSelect";
import { Option } from "constant/types";
import { type } from "os";
import { get } from "lodash";
import { useFormContext } from "react-hook-form";
import { scrollViewContext } from "components/sn-sales-detail/hooks/useScrollErrorField";
export interface CustomInputProps {
  control: Control;
  label?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  select?: boolean;
  inputProps?: InputProps;
  register: UseFormRegisterReturn;
  multiline?: boolean;
  maxRows?: number;
  type?: string;
  minRows?: number;
  options?: Option[];
  rules?: RegisterOptions<FieldValues>;
  isRound?: boolean;
  name?: string;
}

const CustomInput = (props: CustomInputProps, ref) => {
  const {
    control,
    options,
    select,
    register,
    label,
    disabled,
    multiline,
    maxRows = 3,
    minRows = 1,
    inputProps,
    placeholder,
    helperText,
    isRound,
    rules,
    name,
    type = "string",

    defaultValue,
  } = props;
  const {
    formState: { errors },
  } = useFormContext();
  // const { scrollErrorField } = useScrollErrorField();
  const scrollContext = useContext(scrollViewContext);

  useEffect(() => {
    // scrollErrorField(`${sectionKey}.${index}`);
  }, [JSON.stringify(errors)]);
  useEffect(() => {
    if (errors) {
      const error = get(errors, name);
      if (error) {
        scrollContext?.scrollErrorField(name || "");
      }
    }
  }, [JSON.stringify(errors)]);
  return (
    <Grid2
      container
      spacing={1}
      alignItems="center"
      sx={{ position: "relative" }}
    >
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
          rules={rules}
          defaultValue={defaultValue}
          {...register}
          render={({ field }) => {
            const { onChange: onFieldChange, ...rest } = field;
            const handleChange = (e) => {
              onFieldChange(e);
              inputProps?.onChange && inputProps.onChange(e);
            };
            return !select ? (
              <Input
                maxRows={maxRows}
                minRows={minRows}
                multiline={multiline}
                placeholder={placeholder}
                error={get(errors, `${name}.message`)}
                sx={{
                  width: "100%",
                  [`& .${inputBaseClasses.root}`]: {
                    backgroundColor: disabled ? "gray.300" : "background.paper",
                    pr: helperText ? 3 : 1,
                  },
                  [`& input::-webkit-inner-spin-button`]: {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  [`& .Mui-error`]: {
                    mx: 0,
                  },
                  [`& .MuiSvgIcon-root`]: {
                    display: "none",
                  },
                  [`& > .Mui-disabled:first-child`]: {
                    border: "1px solid #a5a5a5",
                  },
                }}
                onKeyDown={(e) => {
                  if (
                    type === "number" &&
                    (e.key === "e" ||
                      e.key === "E" ||
                      e.key === "-" ||
                      e.key === "+" ||
                      (e.key === "." && isRound))
                  ) {
                    e.preventDefault();
                  }
                }}
                {...inputProps}
                inputRef={ref}
                onChange={(e) => handleChange(e)}
                {...rest}
                disabled={disabled}
                type={type}
              />
            ) : (
              <CustomLabelSelect
                options={options as Option[]}
                {...rest}
                ref={ref}
                disabled={disabled}
                onChange={(value) => handleChange(value)}
              />
            );
          }}
        />
        <Stack
          position="absolute"
          right={10}
          top={13}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            variant="body2"
            color="grey.300"
            sx={{
              backgroundColor: "background.paper",
              padding: 1,
            }}
          >
            {helperText}
          </Text>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default forwardRef(CustomInput);
