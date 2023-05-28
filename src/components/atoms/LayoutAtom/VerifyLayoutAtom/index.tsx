import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export const VerifyLayoutAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={clsx(styles["verifylayout"], props.className)}>
      <img className={styles["verifylayout__logo"]} src={"/images/logo.png"} />
      <h3 className={styles["verifylayout__title"]}>{props.title}</h3>
      {props.description && (
        <p className={styles["verifylayout__description"]}>
          {props.description}
        </p>
      )}
      {props.children}
    </div>
  );
};
