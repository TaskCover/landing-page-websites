import {
  debounce,
  Stack,
  MenuList,
  Box,
  MenuItem,
  ButtonBase,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { Search } from "components/Filters";
import PopoverLayout from "components/sn-project-detail/Tasks/Detail/components/SubTasksOfTask/PopoverLayout";
import {
  NS_COMMON,
  NS_PROJECT,
  AN_ERROR_TRY_AGAIN,
  NS_SALES,
} from "constant/index";
import ChevronIcon from "icons/ChevronIcon";
import { useTranslations } from "next-intl";
import React, { memo, useRef, useState } from "react";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";
import Avatar from "components/Avatar";
import { IconButton, Text } from "components/shared";
import useGetEmployeeOptions from "components/sn-sales/hooks/useGetEmployeeOptions";
import AvatarGroup, { AvatarProps } from "components/shared/AvatarGroup";
import PlusIcon from "icons/PlusIcon";
import { useFormContext } from "react-hook-form";
import { Option, User } from "constant/types";
import CircleCloseIcon from "icons/CircleCloseIcon";
import useTheme from "hooks/useTheme";

const WRONG_NUMBER = 10;

const defaultSx = {
  item: {
    fontSize: 14,
    color: "text.primary",
    lineHeight: "22px",
    backgroundColor: "grey.50",
    width: "100%",
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

type AssignProps = {
  value: User;
  name: string;
  onAssign: (name: string, data: User) => void;
};

const DisplayItem = ({
  user,
  onRemoveAssign,
}: {
  user: User;
  onRemoveAssign: (id: string) => void;
}) => {
  const { employeeOptions } = useGetEmployeeOptions();

  const { isDarkMode } = useTheme();

  const { fullname } = (user ?? {}) as User;

  return (
    <Stack
      direction="row"
      py={0.25}
      px={0.5}
      borderRadius={5}
      bgcolor={isDarkMode ? "background.default" : "primary.light"}
      spacing={1}
      display="inline-flex"
      width="fit-content"
    >
      <Text variant="body2" maxWidth={150} noWrap tooltip={fullname}>
        {fullname}
      </Text>
      <IconButton noPadding onClick={() => onRemoveAssign(user.id)}>
        <CircleCloseIcon sx={{ color: "grey.400" }} />
      </IconButton>
    </Stack>
  );
};

const AssignTodo = (props: AssignProps) => {
  const { onAssign: onChange, value, name } = props;
  const salesT = useTranslations(NS_SALES);

  const {
    employeeIsFetching,
    employeeOptions,
    onEndReachedEmployeeOptions,
    onSearchEmployee,
  } = useGetEmployeeOptions();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onChangeSearch = (name: string, newValue?: string | number) => {
    onSearchEmployee(name, newValue as string);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onScroll = debounce((event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - WRONG_NUMBER) {
      onEndReachedEmployeeOptions && onEndReachedEmployeeOptions();
    }
  }, 250);

  const onAssign = (user: Option) => {
    buttonRef.current?.click();
    onChange &&
      onChange(name, {
        id: user.value,
        fullname: user.label,
        avatar: user.avatar,
      } as User);
  };

  const onRemoveAssign = (id) => {
    onChange && onChange(name, {} as User);
  };
  return (
    <PopoverLayout
      label={
        value?.id ? (
          <DisplayItem user={value} onRemoveAssign={onRemoveAssign} />
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Text variant="body2" noWrap>
              {salesT("detail.tab.assign")}
            </Text>
            <ChevronIcon />
          </Stack>
        )

        // <DisplayItem users={value} />
      }
      ref={buttonRef}
    >
      <MenuList onScroll={onScroll} component={Box} sx={{ pb: 0 }}>
        <Search
          name="members.email"
          onChange={onChangeSearch}
          emitWhenEnter
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "6px",
          }}
        />
        {employeeOptions.map((option) => {
          return (
            <MenuItem
              component={ButtonBase}
              onClick={() => onAssign(option)}
              sx={defaultSx.item}
              key={option.value}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                width="100%"
              >
                <Avatar
                  src={option?.avatar ?? UserPlaceholderImage}
                  size={24}
                />
                <Stack
                  alignItems="flex-start"
                  sx={{
                    "&": { maxWidth: "90%", width: "100%" },
                    "& > p ": {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "90%",
                      textAlign: "left",
                    },
                  }}
                >
                  <Text variant="body2">{option.label}</Text>
                  <Text variant="body2" className="sub">
                    {option.subText}
                  </Text>
                </Stack>
              </Stack>
            </MenuItem>
          );
        })}
        {employeeIsFetching && (
          <MenuItem sx={defaultSx.item}>
            <CircularProgress size={20} sx={{ mx: "auto" }} color="primary" />
          </MenuItem>
        )}
      </MenuList>
    </PopoverLayout>
  );
};

export default memo(AssignTodo);
