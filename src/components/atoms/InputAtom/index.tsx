import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  inputClass?: string;
  isRequired?: boolean;
  isError?: boolean;
};

export const InputAtom = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, inputClass, isRequired, className, isError, ...inputProps } =
    props;

  return (
    <div className={clsx(className, styles["input"])} ref={ref}>
      <input
        type="text"
        {...inputProps}
        className={clsx(inputClass, { [styles["error"]]: isError })}
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
  );
});

InputAtom.displayName = "InputAtom";
