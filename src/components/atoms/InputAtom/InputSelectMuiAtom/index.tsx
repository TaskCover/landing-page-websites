import { MenuItem, Select } from "@mui/material";
import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import clsx from "clsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { forwardRef, useEffect, useState } from "react";

export type Props = {
  label: string;
  options: {
    text: string;
    value: string;
  }[];
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  isError?: boolean;
};

export const InputSelectMuiAtom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [data, setData] = useState<string | undefined>();

    useEffect(() => {
      setData(props.value);
      props.value && props.onChange && props.onChange(props.value);
    }, [props.value]);

    return (
      <div className={clsx(props.className, styles["input"])}>
        <label className={styles2["input__label"]}>{props.label}</label>
        <Select
          className={clsx(styles2["select"], {
            [styles2["error"]]: props.isError,
          })}
          defaultValue={props.defaultValue}
          value={data ? data : ""}
          ref={ref}
          onChange={(e) => {
            props.onChange && props.onChange(e.target.value);
            setData(e.target.value);
          }}
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
              zIndex: 1350,
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
  }
);
