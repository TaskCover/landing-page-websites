import { memo, useState, MouseEvent, useId } from "react";
import {
  Box,
  ButtonBase,
  Divider,
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
            minWidth: 216,
            maxWidth: 300,
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
          p={2}
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderColor: "grey.100",
            borderBottomLeftRadius: 1,
            borderBottomRightRadius: 1,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} py={2}>
            <Avatar size={60} alt={user.fullname} />
            <Stack>
              <Text variant="h6" color="grey.400">
                {user.fullname}
              </Text>
              <Text variant="caption" color="grey.400">
                {user?.position?.name ?? "--"}
              </Text>
              <Text variant="body2" color="grey.400">
                {user.email}
              </Text>
            </Stack>
          </Stack>
          <Divider sx={{ backgroundColor: "grey.100" }} />
          <MenuList component={Box} sx={{ pb: 0 }}>
            {OPTIONS.map((item) => (
              <MenuItem
                className="row-center"
                component={Link}
                onClick={onClose}
                href={item.href}
                sx={{
                  py: 1,
                  px: 0,

                  color: "grey.400",
                  "& svg": {
                    color: "grey.400",
                  },
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                }}
                key={item.href}
                underline="none"
              >
                {item.icon}
                <Text ml={1.5} variant="body2" color="inherit">
                  {item.label}
                </Text>
              </MenuItem>
            ))}
            <MenuItem
              component={ButtonBase}
              onClick={onSignOut}
              sx={{
                width: "100%",
                py: 1,
                px: 0,
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "transparent",
                  "& svg": {
                    color: "grey.900",
                  },
                },
              }}
            >
              <SignOutIcon />
              <Text ml={1.5} variant="body2" color="inherit">
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
