import React, { memo, SyntheticEvent, useRef, useState } from "react";
import { Autocomplete, SxProps, MenuItem, Stack, Chip } from "@mui/material";
import { Option } from "constant/types";
import { Input, Text } from "components/shared";
import ArrowDownIcon from "icons/ArrowDownIcon";
import { uuid } from "utils/index";

// Import necessary libraries and components

const ID_PLACEHOLDER = 'your-uuid-placeholder';

interface SelectMultipleProps {
  limitTags?: number;
  options: Option[];
  label: string;
  onSelect: (event: SyntheticEvent<Element, Event>, value: Option[]) => void;
  loading?: boolean;
  onEndReached?: () => void;
  sx?: SxProps;
  error?: string;
  value?: Option[];
  onEnter?: (value: string | undefined) => void;
  onOpen?: () => void;
  onInputChange?: (value: string) => void;
}

const defaultSx = {
  item: {
    color: 'text.primary',
    backgroundColor: 'grey.50',
    '&:hover': {
      backgroundColor: 'primary.main',
      '& svg': {
        color: 'common.white',
      },
    },
  },
};

const SelectMultiple: React.FC<SelectMultipleProps> = ({
  limitTags = 3,
  options,
  label,
  onEnter,
  onSelect,
  sx,
  onEndReached,
  error,
  onInputChange,
  onOpen,
  loading = true,
  value = [],
}: SelectMultipleProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedValues, setSelectedValues] = React.useState<Option[]>([]);

  const selectedOptions = options.filter((option) =>
    value.some((selectedOption) => selectedOption.label === option.label)
  );

  return (
    <>
      <Autocomplete
        getOptionLabel={(option) => option?.label || ''}
        multiple
        autoSelect
        fullWidth
        onOpen={() => onOpen && onOpen()}
        onEnded={onEndReached}
        limitTags={limitTags}
        renderInput={(params) => (
          <Input
            rootSx={{
              ...sx,
              cursor: 'pointer',
              height: 50,
              marginTop: 0.5,
            }}
            inputRef={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
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
        renderOption={(props, option) => (
          <MenuItem
            {...props}
            sx={{
              ...defaultSx.item,
              display: option.value === ID_PLACEHOLDER ? 'none' : undefined,
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
        )}
        popupIcon={
          <ArrowDownIcon
            sx={{
              transform: 'rotate(270deg)',
              width: '16px',
            }}
            color="inherit"
          />
        }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.label}
              {...getTagProps({ index })}
              key={getTagProps({ index }).key}
              size="small"
              sx={{
                color: 'black',
                mt: 2,
                backgroundColor: ({ palette }) => palette?.primary.light,
              }}
            />
          ))
        }
        loading={loading}
        options={options}
        onInputChange={(event, value) => onInputChange && onInputChange(value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(event, selectedOptions) => {
          const newValues: Option[] = selectedOptions.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }));
          setSelectedValues(newValues);
          onSelect(event, newValues);
        }}
        value={selectedOptions}
      />
    </>
  );
};

export default memo(SelectMultiple);
  