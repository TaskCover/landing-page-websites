import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import DoubleArrowIcon from "icons/DoubleArrowIcon";
import Menu from "./Menu";
import AppLogo from "components/AppLogo";
import Link from "components/Link";
import { HOME_PATH, UPGRADE_ACCOUNT_PATH } from "constant/paths";
import CrownIcon from "icons/CrownIcon";
import { Button, IconButton } from "components/shared";
import { useSidebar } from "store/app/selectors";

const Sidebar = (props: StackProps) => {
  const { isExpandedSidebar, onToggleExpandSidebar } = useSidebar();

  const onToggle = () => {
    onToggleExpandSidebar();
  };

  return (
    <Stack
      height="100%"
      p={isExpandedSidebar ? { lg: 2.5, xl: 3 } : 1.25}
      sx={{
        transition: "width .3s",
        backgroundColor: "common.white",
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
      }}
      alignItems="center"
      width={isExpandedSidebar ? LARGE_SIZE : SMALL_SIZE}
      maxWidth={340}
      overflow="auto"
      spacing={3}
      display={{ xs: "none", sm: "flex" }}
      {...props}
    >
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href={HOME_PATH} underline="none">
          <AppLogo
            width={isExpandedSidebar ? 156 : 32}
            height={isExpandedSidebar ? undefined : 32}
            icon={!isExpandedSidebar}
          />
        </Link>

        <IconButton
          onClick={onToggle}
          noPadding
          tooltip={isExpandedSidebar ? "Thu lại" : "Mở rộng"}
        >
          <DoubleArrowIcon
            fontSize="medium"
            color="success"
            sx={{
              transform: isExpandedSidebar ? undefined : "rotate(-180deg)",
            }}
          />
        </IconButton>
      </Stack>

      <Link
        href={UPGRADE_ACCOUNT_PATH}
        underline="none"
        sx={{ width: isExpandedSidebar ? "100%" : undefined }}
      >
        {isExpandedSidebar ? (
          <Button
            variant="primary"
            startIcon={
              <CrownIcon
                sx={{ fontSize: "24px!important", color: "common.white" }}
                filled
              />
            }
            size="small"
            fullWidth
          >
            Upgrade account
          </Button>
        ) : (
          <IconButton
            variant="contained"
            size="small"
            sx={{ backgroundColor: "primary.light" }}
          >
            <CrownIcon color="primary" />
          </IconButton>
        )}
      </Link>

      <Menu />
    </Stack>
  );
};

export default memo(Sidebar);

const LARGE_SIZE = 340;
const SMALL_SIZE = 80;
