import { memo, useId, useMemo } from "react";
import Input, { InputProps } from "./Input";
import { CircularProgress, MenuItem, inputBaseClasses } from "@mui/material";
import { Option } from "constant/types";
import ChevronIcon from "icons/ChevronIcon";
import { Search } from "components/Filters";
import { debounce, uuid } from "utils/index";

export type SelectProps = InputProps & {
  options: Option[];
  hasAll?: boolean;
  pending?: boolean;
  showPlaceholder?: boolean;
  onEndReached?: () => void;
  onChangeSearch?: (name: string, newValue?: string | number) => void;
  searchProps?: {
    name: string;
    placeholder?: string;
    value?: string | number;
  };
};

const ID_PLACEHOLDER = uuid();
const ID_PENDING = uuid();

const Select = (props: SelectProps) => {
  const {
    options,
    hasAll,
    placeholder,
    value,
    pending,
    showPlaceholder,
    onEndReached,
    onChangeSearch,
    searchProps,
    onChange: onChangeProp,
    ...rest
  } = props;

  const hasValue = useMemo(
    () => options.some((option) => option.value === value),
    [options, value],
  );

  const optionList = useMemo(() => {
    if (hasAll || placeholder) {
      return [
        {
          label: hasAll && hasValue ? "All" : placeholder,
          value: ID_PLACEHOLDER,
        },
        ...options,
      ];
    }
    return options;
  }, [hasAll, placeholder, options, hasValue]);

  const onChange = (event) => {
    if (event.target.value === ID_PLACEHOLDER) {
      event.target.value = undefined;
      onChangeProp && onChangeProp(event);
    } else {
      onChangeProp && onChangeProp(event);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onScroll = debounce((event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - WRONG_NUMBER) {
      onEndReached && onEndReached();
    }
  }, 250);

  return (
    <Input
      select
      SelectProps={{
        IconComponent: ChevronIcon,
        MenuProps: {
          PaperProps: {
            onScroll,
          },
          MenuListProps: {
            sx: {
              maxHeight: 300,
            },
          },
        },
      }}
      rootSx={defaultSx.input}
      value={hasValue ? value : showPlaceholder ? ID_PLACEHOLDER : ""}
      onChange={onChange}
      {...rest}
    >
      {!!onChangeSearch && (
        <Search
          fullWidth
          sx={{ px: 2, mb: 0.75 }}
          name="email"
          onChange={onChangeSearch}
          {...searchProps}
        />
      )}
      {optionList.map((option) => (
        <MenuItem
          sx={{
            ...defaultSx.item,
            display:
              (!hasValue && option.value === ID_PLACEHOLDER) ||
              value === ID_PLACEHOLDER
                ? "none"
                : undefined,
          }}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}

      {pending && (
        <MenuItem sx={defaultSx.item} value={ID_PENDING}>
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

const WRONG_NUMBER = 10;
