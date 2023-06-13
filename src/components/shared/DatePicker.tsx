import { forwardRef, memo } from "react";
import LibDatePicker, { ReactDatePickerProps } from "react-datepicker";
import Input, { InputProps } from "./Input";
import CalendarIcon from "icons/CalendarIcon";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = InputProps & {
  pickerProps?: Omit<ReactDatePickerProps, "onChange">;
  onChange?: (newDate?: Date) => void;
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
    ...rest
  } = props;

  const onChangeDate = (date: Date | null) => {
    onChange && onChange(date || undefined);
  };
  return (
    <LibDatePicker
      selected={value ? new Date(value) : null}
      placeholderText={placeholder}
      title={title}
      onChange={onChangeDate}
      required={required}
      disabled={disabled}
      {...pickerProps}
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
