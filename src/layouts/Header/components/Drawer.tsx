import { memo, useEffect } from "react";
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
import { useAuth } from "store/app/selectors";
import { Button, Text } from "components/shared";
import Avatar from "components/Avatar";
import useBreakpoint from "hooks/useBreakpoint";
import Link from "components/Link";
import { HOME_PATH, UPGRADE_ACCOUNT_PATH } from "constant/paths";
import CrownIcon from "icons/CrownIcon";
import { Permission } from "constant/enums";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { usePathname } from "next/navigation";

const Drawer = () => {
  const [isShow, onShow, onHide] = useToggle(false);

  const pathname = usePathname();
  const { isSmSmaller } = useBreakpoint();
  const { user } = useAuth();
  const commonT = useTranslations(NS_COMMON);

  useEffect(() => {
    if (!isSmSmaller) {
      onHide();
    }
  }, [isSmSmaller, onHide, pathname]);

  return (
    <>
      <IconButton onClick={onShow} className="only-mobile" sx={{ height: 40 }}>
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
          <Link href={HOME_PATH} underline="none">
            <AppLogo width={156} />
          </Link>

          <IconButton onClick={onHide} sx={{ color: "grey.900" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <UserInfo />

        {!user?.roles?.includes(Permission.EU) && (
          <Link
            href={UPGRADE_ACCOUNT_PATH}
            underline="none"
            sx={{ mb: 2, mt: 1 }}
          >
            <Button
              variant="secondary"
              startIcon={<CrownIcon sx={{ fontSize: 20 }} />}
              size="small"
              fullWidth
            >
              {commonT("upgradeAccount")}
            </Button>
          </Link>
        )}

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
      <Avatar size={64} alt={user.fullname} src={user?.avatar?.link} />
      <Stack>
        <Text fontWeight={600}>{user.fullname}</Text>
        <Text variant="body2">{user.email}</Text>
      </Stack>
    </Stack>
  );
};
