import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import styles from "../styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  inputClass?: string;
};

export const InputCenterAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    return (
      <div className={clsx(styles["input"], props.className)} ref={ref}>
        <input
          type="text"
          {...props}
          className={clsx(styles["input--center"], props.inputClass)}
        />
        <label className={styles["label--center"]}>{props.label}</label>
      </div>
    );
  }
);
