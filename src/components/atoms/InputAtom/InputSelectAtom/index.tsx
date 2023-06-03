import { MenuItem, Select } from "@mui/material";
import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  label: string;
  options: {
    text: string;
    value: string;
  }[];
  multiple?: boolean;
  className?: string;
};

export const InputSelectAtom = (props: Props) => {
  return (
    <div className={clsx(props.className, styles["input"])}>
      <label>asdasd</label>
      <Select
        className={styles2["select"]}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
        inputProps={{ className: styles2["select_input"] }}
      >
        {props.options &&
          props.options.length > 0 &&
          props.options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};
