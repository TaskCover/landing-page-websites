import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import CalendarIcon from "icons/CalendarIcon";
import { formatDate } from "utils/index";
import { DATE_FORMAT_FORM, DATE_FORMAT_HYPHEN } from "constant/index";
import { vi, enUS } from "date-fns/locale";
import { format as formatFns } from "date-fns";
import { useLocale } from "next-intl";

registerLocale("vi", vi);
registerLocale("en", enUS);

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

  const locale = useLocale();

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
        {value
          ? formatDate(refactorDate(value, format)?.getTime() as number)
          : label}
      </Text>
      <DatePicker
        selected={value ? refactorDate(value, format) : null}
        onChange={onChangeDate}
        locale={locale}
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

const refactorDate = (value, format) => {
  if (!value) return null;
  if (format === DATE_FORMAT_HYPHEN) {
    return new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  }
  return new Date(value);
};
