/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  FormHelperText,
  InputLabel,
  TextFieldProps,
  Typography,
} from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import { Stack } from "@mui/system";
import useTheme from "hooks/useTheme";

interface ISectionProps {
  value?: number | null;
  label?: string;
  onChange?(value: any): void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  endAdornment?: React.ReactNode;
}

type TextFieldInputProps = ISectionProps & TextFieldProps;

const NumberInput: React.FC<TextFieldInputProps> = (
  props: TextFieldInputProps,
) => {
  const {
    value = 0,
    label,
    onChange,
    required,
    disabled,
    placeholder,
    fullWidth,
    error,
    helperText,
    sx,
    endAdornment,
  } = props;

  const randomId = (Math.random() + 1).toString(36).substring(7);
  const { isDarkMode } = useTheme();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        ...sx,
      }}
    >
      <Box
        component="label"
        htmlFor={`input-field-${randomId}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "grey.50",
          borderRadius: "4px",
          padding: "8px 20px",
          height: "58px",
          ":hover": {
            cursor: disabled ? "not-allowed" : "text",
          },
          transition: "all ease 0.25s",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: error
            ? "rgba(246, 78, 96, 1)"
            : isFocus
            ? "rgba(54, 153, 255, 0.5)"
            : "#F7F7FD",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack direction="column" flex={1}>
          <InputLabel
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "18px",
              userSelect: "none",
              color: !!isDarkMode ? "#fff" : "grey.300",
            }}
            htmlFor={`input-field-${randomId}`}
          >
            {label}{" "}
            {required && (
              <Typography
                component="span"
                sx={{
                  color: "rgba(246, 78, 96, 1)",
                  fontSize: "inherit",
                  lineHeight: "16px",
                }}
              >
                (*)
              </Typography>
            )}
          </InputLabel>
          <CurrencyInput
            placeholder={placeholder}
            id={`input-field-${randomId}`}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={value || 0}
            onValueChange={onChange}
            style={{
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 400,
              color: "common.black",
              padding: 0,
              backgroundColor: "#F7F7FD",
              border: "none",
              outline: "none",
            }}
          />
          {/* <TextField
            sx={{
              input: {
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 400,
                color: CommonColors.colorInput,
                padding: 0,
                background: CommonColors.bgInput,
              },
              '> :before, :after': {
                display: 'none',
              },
            }}
            {...otherProps}
            value={value}
            onChange={onChange}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
            variant="filled"
            required={required}
            placeholder={placeholder}
            id={`input-field-${randomId}`}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          /> */}
        </Stack>
        {endAdornment}
      </Box>
      {helperText ? (
        <FormHelperText
          sx={{ color: "rgba(246, 78, 96, 1)", marginLeft: "18px" }}
        >
          {helperText}
        </FormHelperText>
      ) : null}
    </Box>
  );
};

export default NumberInput;
