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
import { Text } from "components/shared";
import useGetEmployeeOptions from "components/sn-sales/hooks/useGetEmployeeOptions";
import AvatarGroup, { AvatarProps } from "components/shared/AvatarGroup";
import PlusIcon from "icons/PlusIcon";
import { useFormContext } from "react-hook-form";
import { Option, User } from "constant/types";
import { useSaleDetail } from "store/sales/selectors";

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
  value: User[];
  onAssign: (name: string, data: User[]) => void;
};

const DisplayItem = ({ users }: { users: User[] }) => {
  const { employeeOptions } = useGetEmployeeOptions();
  const salesT = useTranslations(NS_SALES);

  const avatars: AvatarProps[] = users?.map((option) => {
    const user = employeeOptions.find((item) => item.value === option.id);
    return {
      src: user?.avatar ?? UserPlaceholderImage.src,
    };
  });
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {avatars?.length === 0 ? (
        <Text variant="body2">{salesT("detail.tab.assign")}</Text>
      ) : (
        <AvatarGroup max={3} size={24} fontSize={14} avatars={avatars || []} />
      )}
      <PlusIcon />
    </Stack>
  );
};

const Assign = (props: AssignProps) => {
  const { onAssign: onChange, value } = props;
  const { saleDetail } = useSaleDetail();
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
    const selectedItem = value.find((item) => item.id === user.value);
    const newSeleted = [...value];
    if (selectedItem) {
      newSeleted.splice(newSeleted.indexOf(selectedItem), 1);
    } else {
      newSeleted.push({
        id: user.value as string,
        fullname: user.label,
        email: "",
        avatar: {
          link: user.avatar as string,
        },
      } as User);
    }
    onChange && onChange("members", newSeleted);
  };

  return (
    <PopoverLayout label={<DisplayItem users={value} />} ref={buttonRef}>
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
          const checked = value?.some((member) => option.value === member.id);
          const isDisabled = saleDetail?.owner?.id === option.value;
          return (
            <MenuItem
              component={ButtonBase}
              onClick={() => onAssign(option)}
              sx={defaultSx.item}
              key={option.value}
              disabled={isDisabled}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                width="100%"
              >
                <Checkbox checked={checked} />
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

export default memo(Assign);
