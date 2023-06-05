import { Chip, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styles from "../styles.module.css";
import styles2 from "./styles.module.css";
import clsx from "clsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useEffect, useState } from "react";

export type Props = {
  label: string;
  options: {
    text: string;
    value: string;
  }[];
  className?: string;
  openDialog?: () => void;
  defaultValues?: string[];
};

export const InputSelectMultiMuiAtom = (props: Props) => {
  const [data, setData] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setData(event.target.value as any as string[]);
    console.log(event.target.value);
  };

  const handleDelete = (value: string) => {
    const newData = data.filter((item) => item !== value);
    setData(newData);
  };

  const getTextFromValue = (value: string): string => {
    return props.options.filter((option) => option.value === value)[0].text;
  };

  useEffect(() => {
    if (props.defaultValues) {
      setData(props.defaultValues);
    }
  }, [props.defaultValues]);

  return (
    <div
      className={clsx(props.className, styles["input"], styles2["input"])}
      onClick={() => {
        props.openDialog && props.openDialog();
      }}
    >
      <label className={styles2["input__label"]}>{props.label}</label>
      <Select
        className={styles2["select"]}
        multiple
        value={data as any as string}
        onChange={handleChange}
        open={!!props.openDialog ? false : openMenu}
        onOpen={() => setOpenMenu(true)}
        onClose={() => setOpenMenu(false)}
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
        renderValue={(selected) => (
          <div className={styles2["input-multi"]}>
            {(selected as any as string[]).map((value) => (
              <Chip
                key={value}
                label={getTextFromValue(value)}
                deleteIcon={
                  <CancelOutlinedIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={() => {
                  handleDelete(value);
                }}
                sx={{ backgroundColor: "#E1F0FF", mr: "10px" }}
              />
            ))}
          </div>
        )}
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
