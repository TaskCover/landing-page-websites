import { forwardRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from "./styles.module.css";
import clsx from "clsx";
import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";

// export type Props = DetailedHTMLProps<
//   SelectHTMLAttributes<HTMLSelectElement>,
//   HTMLSelectElement
// > & {
//   label: string;
//   inputClass?: string;
//   isRequired?: boolean;
//   onChange?: (e: ChangeEventHandler<HTMLSelectElement>)
// };
export type Props = {};
const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "70px",
    },
  },
};

const names = ["10", "20", "50", "100"];

export const SimpleSelectAtom = forwardRef<HTMLSelectElement, Props>(
  (props, ref) => {
    // const {
    //   label,
    //   inputClass,
    //   isRequired,
    //   className,
    //   onChange,
    //   ...inputProps
    // } = props;
    const [personName, setPersonName] = useState<string>("10");
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(value);
    };

    return (
      <Select
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        sx={{
          width: "70px",
          height: "42px",
          borderRadius: "8px",
          fontWeight: 600,
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ fontSize: "1.4rem", color: "#212121" }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

SimpleSelectAtom.displayName = "SimpleSelectAtom";
