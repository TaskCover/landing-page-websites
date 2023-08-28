import React, { memo, SyntheticEvent, useRef } from "react";
import {
  Autocomplete,
  SxProps,
  Chip,
  MenuItem,
  inputBaseClasses,
  Grow,
} from "@mui/material";
import { Option } from "constant/types";
import { IconButton, Input, Select, Text } from "components/shared";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ChevronIcon from "icons/ChevronIcon";

interface IProps {
  label: string;
  options: Array<Option>;
  limitTags?: number;
  onSelect: (
    event: SyntheticEvent<Element, Event>,
    value: Array<Option>,
  ) => void;
  loading?: boolean;
  sx?: SxProps;
}
const SelectMultiple = ({
  limitTags = 3,
  options,
  label,
  onSelect,
  sx,
  loading = true,
}: IProps) => {
  return (
    <Autocomplete
      getOptionLabel={(option) => option?.label || ""}
      multiple
      fullWidth
      limitTags={limitTags}
      renderInput={(params) => (
        <Input
          rootSx={{
            ...sx,
            pt: 3,
          }}
          {...params}
          title={label}
          placeholder="--"
        />
      )}
      popupIcon={
        <ArrowDownIcon
          sx={{
            transform: "rotate(270deg)",
            width: "20px",
          }}
          color="inherit"
        />
      }
      ChipProps={{
        sx: {
          color: "black",
          mt: 2,
          backgroundColor: ({ palette }) => palette?.primary.light,
        },
        size: "small",
      }}
      loading={loading}
      options={options}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(event, value) => onSelect(event, value)}
    />
  );
};

export default memo(SelectMultiple);

const defaultSx = {
  slot: {
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
};
