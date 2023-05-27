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
  isrequired?: boolean;
};

export const InputSecretAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
      <div className={clsx(styles["input"], props.className)}>
        <input
          type={isHidden ? "password" : "text"}
          {...props}
          className={props.inputClass}
          ref={ref}
        />
        <label>
          {props.label}
          {props.isrequired !== undefined ? (
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
