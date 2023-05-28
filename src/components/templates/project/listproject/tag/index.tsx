import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  status: string;
};

export const TagComponent: FunctionComponent<Props> = ({ status }) => {
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
