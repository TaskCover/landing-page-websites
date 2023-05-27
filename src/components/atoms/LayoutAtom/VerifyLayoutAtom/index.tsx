import { FunctionComponent } from "react";
import styles from "./styles.module.css";

export type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const VerifyLayoutAtom: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles["verifylayout"]}>
      <img className={styles["verifylayout__logo"]} src={"/images/logo.png"} />
      <h3 className={styles["verifylayout__title"]}>{props.title}</h3>
      <p className={styles["verifylayout__description"]}>{props.description}</p>
    </div>
  );
};
