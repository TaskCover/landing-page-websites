import DatePicker from "react-datepicker";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import "react-datepicker/dist/react-datepicker.css";

import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import clsx from "clsx";
import moment from "moment";

export type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange"
> & {
  label: string;
  inputClass?: string;
  isRequired?: boolean;
  isError?: boolean;
  onChange?: (value: string) => void;
};

export const InputDatePickerAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      label,
      inputClass,
      isRequired,
      className,
      isError,
      onChange,
      ...inputProps
    } = props;
    const [startDate, setStartDate] = useState<Date>();

    const convertFormat = (date?: Date) => {
      if (!date) return "";
      const val = moment(date).format("YYYY-MM-DD");
      return val;
    };

    return (
      <div className={clsx(className, styles["input"])} ref={ref}>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (!date) return;
            setStartDate(date);
            onChange && onChange(convertFormat(date));
          }}
          dateFormat="yyyy-MM-dd"
          customInput={
            <input
              type="text"
              ref={ref}
              {...inputProps}
              className={clsx(styles2["input"], inputClass, {
                [styles["error"]]: isError,
              })}
            />
          }
        />
        <label>
          {label}
          {isRequired !== undefined ? (
            <span className={styles["input__required"]}>&nbsp;{"(*)"}</span>
          ) : (
            <></>
          )}
        </label>
        <CalendarMonthOutlinedIcon
          sx={{ width: "24px", height: "24px", color: "#666666" }}
          className={styles2["icon"]}
        />
      </div>
    );
  }
);
