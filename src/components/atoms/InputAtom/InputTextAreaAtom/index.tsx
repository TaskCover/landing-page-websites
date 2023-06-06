import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";

import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import clsx from "clsx";

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

export const InputTextAreaAtom = forwardRef<HTMLInputElement, Props>(
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

    const [data, setData] = useState("");

    return (
      <div>
        <div className={clsx(className, styles["input"])} ref={ref}>
          <textarea
            className={clsx(inputClass, { [styles["error"]]: isError })}
            value={data}
            onChange={(e) => {
              let val = e.target.value;
              if (val.length > 2000) {
                val = val.substring(0, 2000);
              }
              setData(val);
              onChange && onChange(val);
            }}
          />
          <label>
            {label}
            {isRequired !== undefined ? (
              <span className={styles["input__required"]}>&nbsp;{"(*)"}</span>
            ) : (
              <></>
            )}
          </label>
        </div>
        <div className={styles2["count_text"]}>{data.length}/2000</div>
      </div>
    );
  }
);

InputTextAreaAtom.displayName = "InputTextAreaAtom";
