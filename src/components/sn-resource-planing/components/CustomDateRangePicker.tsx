import React, { useEffect } from "react";
import {
  Box,
  FormHelperText,
  InputLabel,
  TextFieldProps,
  Typography,
  Dialog,
} from "@mui/material";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import { DateRangePicker, DateRange } from "mui-daterange-picker";
import CalendarIcon from "icons/CalendarIcon";
import useTheme from "hooks/useTheme";

interface ISectionProps {
  value?: DateRange | null;
  label?: string;
  onChange?(value?): void;
  errorMessage: string | undefined;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

type TextFieldInputProps = ISectionProps & TextFieldProps;

const CustomDateRangePicker: React.FC<TextFieldInputProps> = ({
  value,
  label,
  onChange,
  required,
  disabled,
  fullWidth,
  errorMessage,
  helperText,
  sx,
}) => {
  const randomId = (Math.random() + 1).toString(36).substring(7);
  const [isFocus] = React.useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = React.useState(false);
  const { palette, isDarkMode } = useTheme();

  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setIsOpenCalendar(!isOpenCalendar);

  useEffect(() => {
    setDateRange(value as DateRange);
  }, [value]);

  return (
    <>
      <Box
        sx={{
          width: fullWidth ? "100%" : "auto",
          cursor: "pointer",
          zIndex: 0,
          ...sx,
        }}
        onClick={() => {
          setIsOpenCalendar(true);
        }}
      >
        <Box
          component="label"
          htmlFor={`input-field-${randomId}`}
          sx={{
            display: "flex",
            flexDirection: "row",
            color: !!isDarkMode ? "common.white" : "common.black",
            backgroundColor: !!isDarkMode ? "#393939" : "grey.50",
            borderRadius: "4px",
            padding: "8px 20px",
            height: "58px",
            ":hover": {
              cursor: disabled ? "not-allowed" : "text",
            },
            transition: "all ease 0.25s",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: errorMessage
              ? "rgba(246, 78, 96, 1)"
              : isFocus
              ? "rgba(54, 153, 255, 0.5)"
              : "transparent",
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
                mb: 1,
                color: palette.grey[300],
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
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "22px",
                fontWeight: 400,
                opacity:
                  _.isEmpty(dateRange.startDate) ||
                  _.isEmpty(dateRange.startDate)
                    ? 0.5
                    : 1,
              }}
            >
              {dateRange.startDate
                ? dayjs(dateRange.startDate || "").format("DD/MM/YYYY")
                : "DD/MM/YYYY"}{" "}
              -{" "}
              {dateRange.endDate
                ? dayjs(dateRange.endDate).format("DD/MM/YYYY")
                : "DD-MM-YYYY"}
            </Typography>
          </Stack>
          <CalendarIcon width={20} height={20} />
        </Box>
        {helperText ? (
          <FormHelperText
            sx={{ color: "rgba(246, 78, 96, 1)", marginLeft: "18px" }}
          >
            {helperText}
          </FormHelperText>
        ) : null}
        {errorMessage ? (
          <Typography
            fontSize={10}
            sx={{ pl: 2, pt: 1 }}
            color="rgba(246, 78, 96, 1)"
          >
            {errorMessage}
          </Typography>
        ) : null}
      </Box>
      <Dialog
        open={isOpenCalendar}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 570,
          },
        }}
        hideBackdrop={true}
        slotProps={{
          backdrop: {
            onClick: () => setIsOpenCalendar(false),
          },
        }}
        sx={{
          "& .MuiGrid-root > ul:nth-child(1)": {
            display: "none",
          },
          "& .MuiPaper-root .MuiGrid-root > .MuiGrid-root:nth-of-type(2)": {
            flex: "1 0 auto",
          },
        }}
      >
        <DateRangePicker
          open={isOpenCalendar}
          toggle={() => toggle()}
          closeOnClickOutside
          minDate={dayjs().toDate()}
          onChange={(range) => {
            setDateRange(range);
            toggle();
            onChange && onChange(range);
          }}
          initialDateRange={dateRange}
        />
      </Dialog>
    </>
  );
};

export default CustomDateRangePicker;
