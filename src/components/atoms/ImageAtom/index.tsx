import clsx from "clsx";
import styles from "./styles.module.css";

export type Props = {
  src: string;
  className?: string;
};

export const ImageAtom = (props: Props) => {
  return (
    <img src={props.src} className={clsx(styles["img"], props.className)} />
  );
};
