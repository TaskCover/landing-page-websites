import { memo, useId, useMemo } from "react";
import Input, { InputProps } from "./Input";
import {
  CircularProgress,
  MenuItem,
  Stack,
  inputBaseClasses,
  selectClasses,
} from "@mui/material";
import { Option } from "constant/types";
import ChevronIcon from "icons/ChevronIcon";
import { Search } from "components/Filters";
import { debounce, uuid } from "utils/index";
import Avatar from "components/Avatar";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import useToggle from "hooks/useToggle";
import Text from "./Text";

export type SelectProps = InputProps & {
  options: Option[];
  hasAll?: boolean;
  pending?: boolean;
  showPlaceholder?: boolean;
  onEndReached?: () => void;
  onChangeSearch?: (name: string, newValue?: string | number) => void;
  searchProps?: {
    name?: string;
    placeholder?: string;
    value?: string | number;
  };
  hasAvatar?: boolean;
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
    hasAvatar,
    ...rest
  } = props;

  const commonT = useTranslations(NS_COMMON);

  const [isShow, onOpen, onClose] = useToggle(false);

  const hasValue = useMemo(
    () => options.some((option) => option.value === value),
    [options, value],
  );

  const optionList = useMemo(() => {
    if (hasAll || placeholder) {
      return [
        {
          label: hasAll && hasValue ? commonT("all") : placeholder,
          value: ID_PLACEHOLDER,
          hasAvatar: false,
        },
        ...options,
      ];
    }
    return options;
  }, [hasAll, placeholder, options, hasValue, commonT]) as unknown as Option[];

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
        onOpen,
        onClose,
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
      {!!onChangeSearch && isShow && (
        <Search
          fullWidth
          sx={{ px: 2, mb: 0.75 }}
          name="email"
          onChange={onChangeSearch}
          emitWhenEnter
          search={searchProps?.value}
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
          <Stack direction="row" alignItems="center" spacing={1}>
            {option.value !== ID_PLACEHOLDER && hasAvatar && (
              <Avatar src={option?.avatar ?? UserPlaceholderImage} size={24} />
            )}
            <Stack>
              <Text variant="body2">{option.label}</Text>
              <Text variant="body2" className="sub">
                {option.subText}
              </Text>
            </Stack>
          </Stack>
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
    "& > img": {
      mr: 1,
    },
    "&:hover": {
      backgroundColor: "primary.main",
      "& svg": {
        color: "common.white",
      },
    },
  },
};

const WRONG_NUMBER = 10;
