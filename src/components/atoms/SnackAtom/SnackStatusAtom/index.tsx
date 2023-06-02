import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  status: "active" | "pending" | "finish";
};

export const SnackStatusAtom: FunctionComponent<Props> = ({ status }) => {
  const getLabelFromStatus = () => {
    switch (status) {
      case "active":
        return "Hoạt động";
      case "pending":
        return "Tạm dừng";
      case "finish":
        return "Kết thúc";
    }
  };
  return (
    <span className={clsx(styles["tag"], styles[status])}>
      {getLabelFromStatus()}
    </span>
  );
};

SnackStatusAtom.displayName = "SnackStatusAtom";
