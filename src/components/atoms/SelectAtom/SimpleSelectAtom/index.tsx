import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  forwardRef,
  useState,
} from "react";
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
export type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  items: { label: string; value: string }[];
  defaultValue: string;
  onItemChange: (value: string) => void;
};
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

export const SimpleSelectAtom = forwardRef<HTMLSelectElement, Props>(
  (props, ref) => {
    const { items, defaultValue, onItemChange } = props;
    const [data, setData] = useState<string>(defaultValue);
    const handleChange = (event: SelectChangeEvent<string>) => {
      console.log(event.target);
      setData(event.target.value);
      onItemChange(String(event.target.value));
    };

    return (
      <Select
        displayEmpty
        value={data}
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
        {items.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            sx={{ fontSize: "1.4rem", color: "#212121" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

SimpleSelectAtom.displayName = "SimpleSelectAtom";
