import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  inputClass?: string;
  require?: boolean;
};

export const InputAtom = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={clsx(styles["input"], props.className)} ref={ref}>
      <input type="text" {...props} className={props.inputClass} />
      <label>{props.label}</label>
    </div>
  );
});
