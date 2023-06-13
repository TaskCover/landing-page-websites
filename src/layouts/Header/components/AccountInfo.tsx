import { memo, useState, MouseEvent, useId, useEffect, useMemo } from "react";
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
import Image from "next/image";
import LogoImage from "public/images/img-logo.webp";
import { useAuth } from "store/app/selectors";

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
        <Image
          src={LogoImage}
          height={32}
          width={32}
          className="rounded"
          alt={user?.fullname ?? "Logo"}
        />

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
            width: 280,
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
            <MenuItem
              component={ButtonBase}
              onClick={onSignOut}
              sx={{
                width: "100%",
                "&:hover": {
                  "& svg": {
                    color: "grey.900",
                  },
                },
              }}
            >
              <Text ml={1.5} variant="body2" fontWeight={600}>
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
