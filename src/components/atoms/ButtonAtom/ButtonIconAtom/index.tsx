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
  iconImgSrc: string;
};

export const ButtonIconAtom = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { className, type, iconImgSrc, label, ...otherProp } = props;
    return (
      <button
        className={clsx(styles["button_atom-icon"], className)}
        type={type ? type : "button"}
        {...otherProp}
      >
        <div className={styles["button_atom-icon__content"]}>
          <img src={iconImgSrc} className={styles["button_atom-icon__icon"]} />
          <label className={styles["button_atom-icon__label"]}>{label}</label>
        </div>
      </button>
    );
  }
);
