import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
  forwardRef,
} from "react";

import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = { error: string };

export const ErrorTextAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles["errortext"]}>
      <img src="/images/icon_error2.png" />
      <p>{props.error}</p>
    </div>
  );
};

ErrorTextAtom.displayName = "ErrorTextAtom";
