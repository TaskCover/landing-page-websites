import { MenuItem, Select } from "@mui/material";
import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import clsx from "clsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type Props = {
  label: string;
  options: {
    text: string;
    value: string;
  }[];
  multiple?: boolean;
  className?: string;
};

export const InputSelectMuiAtom = (props: Props) => {
  return (
    <div className={clsx(props.className, styles["input"])}>
      <label className={styles2["input__label"]}>{props.label}</label>
      <Select
        className={styles2["select"]}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        }}
        inputProps={{ className: styles2["select_input"] }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          sx: {
            ".MuiMenu-paper": {
              maxHeight: "180px",
            },
          },
        }}
      >
        {props.options &&
          props.options.length > 0 &&
          props.options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              sx={{ fontSize: "1.6rem", minHeight: "36px !important" }}
            >
              {option.text}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};
