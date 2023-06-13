import { memo, useState, MouseEvent, useId } from "react";
import {
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  popoverClasses,
  Stack,
} from "@mui/material";
import { Text } from "components/shared";
import ChevronIcon from "icons/ChevronIcon";
import { useAuth } from "store/app/selectors";
import Link from "components/Link";
import UserIcon from "icons/UserIcon";
import { ACCOUNT_INFO_PATH, CHANGE_PASSWORD_PATH } from "constant/paths";
import SignOutIcon from "icons/SignOutIcon";
import Avatar from "components/Avatar";
import KeyIcon from "icons/KeyIcon";

const AccountInfo = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const { user, onSignOut } = useAuth();

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <>
      <Stack
        component={ButtonBase}
        disableRipple
        direction="row"
        alignItems="center"
        borderRadius={1}
        spacing={1}
        color="common.white"
        sx={{
          cursor: "pointer",
        }}
        onClick={onOpen}
        ml="auto"
        display={{ xs: "none", sm: "flex" }}
      >
        <Avatar size={32} alt={user.fullname} />

        <ChevronIcon fontSize="medium" sx={{ color: "grey.900" }} />
      </Stack>

      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            width: 200,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
            },
          },
        }}
      >
        <Stack
          pt={2}
          borderRadius={2}
          sx={{
            border: "1px solid",
            borderColor: "grey.100",
          }}
        >
          <Text px={2} variant="body2" fontWeight={600}>
            Xin chào {user?.fullname ?? user.email}
          </Text>
          <MenuList component={Box}>
            {OPTIONS.map((item) => (
              <MenuItem
                className="row-center"
                component={Link}
                onClick={onClose}
                href={item.href}
                sx={{
                  px: 2,
                  py: 1.5,

                  "& svg:not(:last-child)": {
                    color: "grey.900",
                  },
                }}
                key={item.href}
                underline="none"
              >
                {item.icon}
                <Text ml={1.5} variant="body2">
                  {item.label}
                </Text>
              </MenuItem>
            ))}
            <MenuItem
              component={ButtonBase}
              onClick={onSignOut}
              sx={{
                width: "100%",
                py: 1.5,
                "&:hover": {
                  "& svg": {
                    color: "grey.900",
                  },
                },
              }}
            >
              <SignOutIcon color="error" />
              <Text ml={1.5} variant="body2" color="error.main">
                Sign out
              </Text>
            </MenuItem>
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(AccountInfo);

export const OPTIONS = [
  { label: "Thông tin tài khoản", icon: <UserIcon />, href: ACCOUNT_INFO_PATH },
  {
    label: "Thay đổi mật khẩu",
    icon: <KeyIcon />,
    href: CHANGE_PASSWORD_PATH,
  },
];
