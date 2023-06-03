import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import styles from "./styles.module.css";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};
export const ModalBodyAtom = (props: Props) => {
  return <div className={styles["modalbody"]}>{props.children}</div>;
};
