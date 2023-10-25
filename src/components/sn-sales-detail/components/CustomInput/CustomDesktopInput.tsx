import { InputBaseProps } from "@mui/material";
import { Input, InputProps, Text, Tooltip } from "components/shared";
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
  toolTipText?: string;
  type?: string;
  required?: boolean;
}

const CustomDesktopInput = ({
  isEdit,
  name,
  control,
  inputProps,
  disabled,
  helperText,
  type = "string",
  toolTipText,
  value,
  required,
}: IProps) => {
  const { register } = useFormContext();

  return (
    <div>
      {isEdit ? (
        <Controller
          control={control}
          {...register(name)}
          render={({ field }) => (
            <Tooltip title={toolTipText}>
              <div>
                <Input
                  InputLabelProps={{
                    style: {
                      pointerEvents: "none",
                    },
                  }}
                  required={required}
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
              </div>
            </Tooltip>
          )}
        />
      ) : (
        <Text
          variant="body2"
          sx={{
            pointerEvents: "none",
            display: "block",
            wordBreak: "break-word",
            height: "fit-content",
            boxSizing: "border-box",
          }}
        >
          {value}
        </Text>
      )}
    </div>
  );
};

export default CustomDesktopInput;
