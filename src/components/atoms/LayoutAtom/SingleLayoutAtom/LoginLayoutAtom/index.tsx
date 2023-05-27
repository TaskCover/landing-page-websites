import { FunctionComponent } from "react";
import styles from "../styles.module.css";
import stylesms from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  children: React.ReactNode;
};

export const LoginLayoutAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={clsx(styles["singlelayout"], stylesms["singlelayout"])}>
      <div className={styles["singlelayout__container"]}>{props.children}</div>
    </div>
  );
};
