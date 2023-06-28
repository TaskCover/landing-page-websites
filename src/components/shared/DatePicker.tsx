import { forwardRef, memo } from "react";
import LibDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import Input, { InputProps } from "./Input";
import CalendarIcon from "icons/CalendarIcon";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";
import { vi, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

registerLocale("vi", vi);
registerLocale("en", enUS);

export type DatePickerProps = Omit<InputProps, "name" | "onChange"> & {
  pickerProps?: Omit<ReactDatePickerProps, "onChange">;
  onChange: (name: string, newDate?: Date) => void;
  name: string;
};

const DatePicker = (props: DatePickerProps) => {
  const {
    title,
    placeholder,
    required,
    disabled,
    pickerProps,
    onChange,
    value,
    name,
    ...rest
  } = props;

  const locale = useLocale();

  const onChangeDate = (date: Date | null) => {
    onChange(name, date || undefined);
  };

  return (
    <LibDatePicker
      selected={value ? new Date(value) : null}
      placeholderText={placeholder}
      title={title}
      onChange={onChangeDate}
      required={required}
      disabled={disabled}
      name={name}
      {...pickerProps}
      locale={locale}
      customInput={<DatePickerInput {...rest} />}
    />
  );
};

export default memo(DatePicker);

const DatePickerInput = forwardRef((props: InputProps, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      endNode={<CalendarIcon sx={{ color: "grey.400", fontSize: 24 }} />}
    />
  );
});

DatePickerInput.displayName = "DatePickerInput";
