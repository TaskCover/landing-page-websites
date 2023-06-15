import { memo, useId, useMemo } from "react";
import Input, { InputProps } from "./Input";
import { CircularProgress, MenuItem, inputBaseClasses } from "@mui/material";
import { Option } from "constant/types";
import ChevronIcon from "icons/ChevronIcon";

export type SelectProps = InputProps & {
  options: Option[];
  hasAll?: boolean;
  pending?: boolean;
  showPlaceholder?: boolean;
};

const Select = (props: SelectProps) => {
  const {
    options,
    hasAll,
    placeholder,
    value,
    pending,
    showPlaceholder,
    ...rest
  } = props;
  const id = useId();
  const id2 = useId();

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
      value={value || (showPlaceholder ? id : "")}
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
      {pending && (
        <MenuItem sx={defaultSx.item} value={id2}>
          <CircularProgress size={20} sx={{ mx: "auto" }} color="primary" />
        </MenuItem>
      )}
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
      "& svg": {
        color: "common.white",
      },
    },
  },
};
