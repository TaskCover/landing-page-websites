import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  label: string;
  handleClose: () => void;
  className?: string;
};
export const ModalHeaderAtom = (props: Props) => {
  return (
    <div className={clsx(styles["modalheader"], props.className)}>
      <h5>{props.label}</h5>
      <IconButton onClick={() => props.handleClose()}>
        <CloseIcon sx={{ width: "24px", height: "24px" }} />
      </IconButton>
    </div>
  );
};
