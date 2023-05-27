import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
  forwardRef,
} from "react";

import styles from "../styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  inputClass?: string;
  isRequired?: boolean;
};

export const InputSecretAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    const { label, inputClass, isRequired, className, ...inputProps } = props;

    return (
      <div className={clsx(styles["input"], className)}>
        <input
          type={isHidden ? "password" : "text"}
          {...inputProps}
          className={inputClass}
          ref={ref}
        />
        <label>
          {label}
          {isRequired !== undefined ? (
            <span className={styles["input__required"]}>&nbsp;{"(*)"}</span>
          ) : (
            <></>
          )}
        </label>
        <button
          className={clsx(
            styles["toggle_button"],
            styles[isHidden ? "toggle_on" : "toggle_off"]
          )}
          onClick={() => {
            setIsHidden(!isHidden);
          }}
          type="button"
        />
      </div>
    );
  }
);
