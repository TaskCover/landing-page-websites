import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import styles from "../styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  inputClass?: string;
  isError?: boolean;
};

export const InputCenterAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { label, inputClass, className, isError, ...inputProps } = props;
    return (
      <div className={clsx(styles["input"], className)} ref={ref}>
        <input
          type="text"
          {...inputProps}
          className={clsx(
            styles["input--center"],
            { [styles["error"]]: isError },
            inputClass
          )}
        />
        <label className={styles["label--center"]}>{label}</label>
      </div>
    );
  }
);

InputCenterAtom.displayName = "InputCenterAtom";
