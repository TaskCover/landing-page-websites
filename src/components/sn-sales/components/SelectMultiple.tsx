import React, { memo, SyntheticEvent } from "react";
import { Autocomplete, SxProps, MenuItem, Stack, Chip } from "@mui/material";
import { Option } from "constant/types";
import { Button, Input, Text } from "components/shared";
import ArrowDownIcon from "icons/ArrowDownIcon";
import { uuid } from "utils/index";
import PlusIcon from "icons/PlusIcon";

interface IProps {
  label: string;
  options: Array<Option>;
  limitTags?: number;
  onSelect: (
    event: SyntheticEvent<Element, Event>,
    value: Array<Option>,
  ) => void;
  loading?: boolean;
  onEndReached?: () => void;
  noOptionText?: string;
  sx?: SxProps;
  error?: string;
  value?: Option;
  onEnter?: (value: string | undefined) => void;
  onOpen?: () => void;
  onInputChange?: (value: string) => void;
}

const ID_PLACEHOLDER = uuid();

const SelectMultiple = ({
  limitTags = 3,
  options,
  label,
  onEnter,
  onSelect,
  sx,
  onEndReached,
  noOptionText,
  error,
  onInputChange,
  onOpen,
  loading = true,
}: IProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Autocomplete
      getOptionLabel={(option) => option?.label || ""}
      multiple
      autoSelect
      fullWidth
      onOpen={() => onOpen && onOpen()}
      onEnded={onEndReached}
      limitTags={limitTags}
      noOptionsText={
        <Button
          variant="text"
          startIcon={<PlusIcon />}
          size="medium"
          TouchRippleProps={{
            style: {
              display: "none",
            },
          }}
          onClick={() => onEnter && onEnter(inputRef.current?.value)}
          sx={{
            display: "block",
            "&.MuiButton-text:hover": {
              color: "secondary.main",
              textAlign: "center",
            },
            [`&.MuiButtonBase-root`]: {
              px: "10px!important",
              py: "8px!important",
            },
            color: "secondary.main",
            width: "100%",
          }}
        >
          {noOptionText}
        </Button>
      }
      renderInput={(params) => (
        <Input
          rootSx={{
            ...sx,
            cursor: "pointer",
            pt: 3,
          }}
          inputRef={inputRef}
          onKeyDown={function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter && onEnter(inputRef.current?.value);
            }
          }}
          error={error}
          {...params}
          title={label}
          placeholder="--"
        />
      )}
      renderOption={(props, option) => {
        return (
          <MenuItem
            {...props}
            sx={{
              ...defaultSx.item,
              display: option.value === ID_PLACEHOLDER ? "none" : undefined,
            }}
            key={option.value}
            value={option.value}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {option.value !== ID_PLACEHOLDER && (
                <Stack>
                  <Text variant="body2" className="text-option">
                    {option.label}
                  </Text>
                  <Text variant="body2" className="sub">
                    {option.subText}
                  </Text>
                </Stack>
              )}
            </Stack>
          </MenuItem>
        );
      }}
      popupIcon={
        <ArrowDownIcon
          sx={{
            transform: "rotate(270deg)",
            width: "20px",
          }}
          color="inherit"
        />
      }
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => {
          const { key, ...rest } = getTagProps({ index });
          return (
            <Chip
              label={option.label}
              {...rest}
              key={key}
              size="small"
              sx={{
                color: "black",
                mt: 2,
                backgroundColor: ({ palette }) => palette?.primary.light,
              }}
            />
          );
        });
      }}
      loading={loading}
      options={options}
      onInputChange={(event, value) => onInputChange && onInputChange(value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(event, value) => onSelect(event, value)}
    />
  );
};

export default memo(SelectMultiple);

const defaultSx = {
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
