import { FunctionComponent } from "react";
import styles from "./styles.module.css";

export type Props = {
  children: React.ReactNode;
};

export const SingleLayoutAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles["singlelayout"]}>
      <div className={styles["singlelayout__container"]}>{props.children}</div>
    </div>
  );
};
