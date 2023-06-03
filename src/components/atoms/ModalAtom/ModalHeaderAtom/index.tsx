import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import styles from "./styles.module.css";

export type Props = {
  label: string;
  handleClose: () => void;
};
export const ModalHeaderAtom = (props: Props) => {
  return (
    <div className={styles["modalheader"]}>
      <h5>{props.label}</h5>
      <IconButton onClick={() => props.handleClose()}>
        <CloseIcon sx={{ width: "24px", height: "24px" }} />
      </IconButton>
    </div>
  );
};
