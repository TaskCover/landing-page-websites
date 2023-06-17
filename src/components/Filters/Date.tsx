import { forwardRef, memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import CalendarIcon from "icons/CalendarIcon";
import { formatDate } from "utils/index";
import { DATE_FORMAT_FORM } from "constant/index";

type DateProps = Omit<ReactDatePickerProps, "name" | "onChange"> & {
  label: string;
  onChange: (name: string, newDate?: string) => void;
  name: string;
  value?: string | number;
  format?: string;
};

const FDate = (props: DateProps) => {
  const {
    label,
    value,
    onChange,
    name,
    format = DATE_FORMAT_FORM,
    ...rest
  } = props;

  const onChangeDate = (date: Date | null) => {
    onChange(name, date ? formatDate(date.getTime(), format) : undefined);
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      width="fit-content"
    >
      <Text
        variant="body2"
        fontWeight={600}
        color={value ? "primary.main" : "grey.400"}
        whiteSpace="nowrap"
      >
        {value ? formatDate(value) : label}
      </Text>
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChangeDate}
        customInput={
          <CalendarIcon
            sx={{
              color: "grey.400",
              fontSize: 20,
              mt: 0.675,
              cursor: "pointer",
            }}
          />
        }
        {...rest}
      />
    </Stack>
  );
};

export default memo(FDate);
