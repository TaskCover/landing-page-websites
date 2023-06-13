import { memo, useId, useMemo } from "react";
import Input, { InputProps } from "./Input";
import { MenuItem, inputBaseClasses } from "@mui/material";
import { Option } from "constant/types";
import ChevronIcon from "icons/ChevronIcon";

type SelectProps = InputProps & {
  options: Option[];
  hasAll?: boolean;
};

const Select = (props: SelectProps) => {
  const { options, hasAll, placeholder, value, ...rest } = props;
  const id = useId();

  const hasValue = useMemo(
    () => value && value !== placeholder,
    [placeholder, value],
  );

  const optionList = useMemo(() => {
    if (hasAll || placeholder) {
      return [
        { label: hasAll && hasValue ? "All" : placeholder, value: id },
        ...options,
      ];
    }
    return options;
  }, [hasAll, placeholder, options, hasValue, id]);

  return (
    <Input
      select
      SelectProps={{
        IconComponent: ChevronIcon,
      }}
      rootSx={defaultSx.input}
      defaultValue={id}
      value={value}
      {...rest}
    >
      {optionList.map((option) => (
        <MenuItem
          sx={{
            ...defaultSx.item,
            display: option.value === id ? "none" : undefined,
          }}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Input>
  );
};

export default memo(Select);

const defaultSx = {
  input: {
    minWidth: 64,
    cursor: "pointer",
    "&:hover > svg": {
      color: "primary.main",
    },
    [`&.${inputBaseClasses.focused} > svg`]: {
      color: "primary.main",
    },
    "& > svg": {
      fontSize: 24,
      color: "grey.400",
    },
  },
  item: {
    fontSize: 14,
    color: "text.primary",
    lineHeight: "22px",
    backgroundColor: "grey.50",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};
