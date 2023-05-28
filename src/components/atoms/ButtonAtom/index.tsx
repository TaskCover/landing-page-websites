import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
} from "react";

import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
};

export const ButtonAtom = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className, type, ...otherProp } = props;
  return (
    <button
      className={clsx(styles["button_atom"], className)}
      type={type ? type : "button"}
      {...otherProp}
    >
      {props.label}
    </button>
  );
});

ButtonAtom.displayName = "ButtonAtom";
