import { FunctionComponent } from "react";
import styles from "./styles.module.css";

export type Props = {
  children: React.ReactNode;
};

export const LoginLayoutAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles["loginlayout"]}>
      <div className={styles["loginlayout__container"]}>{props.children}</div>
    </div>
  );
};
