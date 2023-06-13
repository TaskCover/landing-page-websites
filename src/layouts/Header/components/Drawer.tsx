import { memo } from "react";
import {
  IconButton,
  Drawer as MuiDrawer,
  Stack,
  drawerClasses,
} from "@mui/material";
import { Menu } from "layouts/components";
import useToggle from "hooks/useToggle";
import BarsIcon from "icons/BarsIcon";
import CloseIcon from "icons/CloseIcon";
import AppLogo from "components/AppLogo";
import Image from "next/image";
import LogoImage from "public/images/img-logo.webp";
import { useAuth } from "store/app/selectors";
import { Text } from "components/shared";

const Drawer = () => {
  const [isShow, onShow, onHide] = useToggle(false);
  return (
    <>
      <IconButton onClick={onShow} className="only-mobile">
        <BarsIcon color="primary" />
      </IconButton>
      <MuiDrawer
        anchor="left"
        sx={{
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "common.white",
            backgroundImage: "none",
            width: "100%",
            px: 3,
            py: 1.5,
          },
        }}
        open={isShow}
        onClose={onHide}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <AppLogo width={156} />
          <IconButton onClick={onHide} sx={{ color: "grey.900" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <UserInfo />

        <Menu />
      </MuiDrawer>
    </>
  );
};

export default memo(Drawer);

const UserInfo = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} py={2}>
      <Image
        src={LogoImage}
        width={64}
        height={64}
        className="rounded"
        alt={user?.fullname ?? user.email}
      />
      <Stack>
        <Text fontWeight={600}>{user?.fullname ?? "--"}</Text>
        <Text variant="body2">{user.email}</Text>
      </Stack>
    </Stack>
  );
};
