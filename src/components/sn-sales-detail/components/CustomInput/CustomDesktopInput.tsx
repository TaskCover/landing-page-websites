import { InputBaseProps } from "@mui/material";
import { Input, InputProps, Text } from "components/shared";
import React, { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  isEdit?: boolean;
  name: string;
  disabled?: boolean;
  control;
  value?: string | number;
  helperText?: string;
  inputProps?;
  type?: string;
}

const CustomDesktopInput = ({
  isEdit,
  name,
  control,
  inputProps,
  disabled,
  helperText,
  type = "string",
  value,
}: IProps) => {
  const { register } = useFormContext();

  return (
    <>
      {isEdit ? (
        <Controller
          control={control}
          {...register(name)}
          render={({ field }) => (
            <Input
              InputProps={inputProps}
              disabled={disabled}
              multiline={type === "number" ? false : true}
              maxRows={2}
              minRows={1}
              type={type}
              sx={{
                width: "100%",
              }}
              helperText={helperText}
              {...field}
            />
          )}
        />
      ) : (
        <Text
          variant="body2"
          sx={{
            display: "block",
            wordBreak: "break-word",
            height: "fit-content",
            boxSizing: "border-box",
          }}
        >
          {value}
        </Text>
      )}
    </>
  );
};

export default CustomDesktopInput;
