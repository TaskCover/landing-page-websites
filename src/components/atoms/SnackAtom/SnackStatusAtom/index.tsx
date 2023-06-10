import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  label: string;
  color: "green" | "yellow" | "pink";
  onClick?: () => void;
};

export const SnackStatusAtom: FunctionComponent<Props> = ({
  color,
  label,
  onClick,
}) => {
  return (
    <span
      className={clsx(styles["tag"], styles[color])}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {label}
    </span>
  );
};

SnackStatusAtom.displayName = "SnackStatusAtom";
