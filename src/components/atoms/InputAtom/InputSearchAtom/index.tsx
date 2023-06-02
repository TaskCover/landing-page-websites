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
  placeholder: string;
  onSubmitInput: (value: string) => void;
  inputClassName?: string;
};

export const InputSearchAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      placeholder,
      onSubmit,
      className,
      inputClassName,
      onSubmitInput,
      ...otherProperty
    } = props;

    const [inputValue, setInputValue] = useState("");

    return (
      <div className={clsx(styles["input"], styles["search"], className)}>
        <img src="/images/icon_search.png" />
        <input
          type={"text"}
          {...otherProperty}
          className={inputClassName}
          placeholder={placeholder}
          ref={ref}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmitInput(inputValue);
            }
          }}
        />
      </div>
    );
  }
);

InputSearchAtom.displayName = "InputSearchAtom";
