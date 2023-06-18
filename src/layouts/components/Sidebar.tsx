import { memo, useMemo } from "react";
import { Stack, StackProps } from "@mui/material";
import DoubleArrowIcon from "icons/DoubleArrowIcon";
import Menu from "./Menu";
import AppLogo from "components/AppLogo";
import Link from "components/Link";
import { HOME_PATH, UPGRADE_ACCOUNT_PATH } from "constant/paths";
import CrownIcon from "icons/CrownIcon";
import { Button, IconButton } from "components/shared";
import { useSidebar } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";

const Sidebar = (props: StackProps) => {
  const { isExpandedSidebar, onToggleExpandSidebar } = useSidebar();
  const { isLgSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  const onToggle = () => {
    onToggleExpandSidebar();
  };

  return (
    <Stack
      height="100%"
      p={isShowLarge ? { lg: 2.5, xl: 3 } : 1.25}
      sx={{
        transition: "width .3s",
        backgroundColor: "common.white",
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
      }}
      alignItems="center"
      width={isShowLarge ? LARGE_SIZE : SMALL_SIZE}
      maxWidth={340}
      overflow="auto"
      spacing={3}
      display={{ xs: "none", sm: "flex" }}
      {...props}
    >
      <Stack
        width={{ lg: "100%" }}
        direction="row"
        alignItems="center"
        justifyContent={isShowLarge ? "space-between" : "center"}
      >
        <Link href={HOME_PATH} underline="none">
          <AppLogo
            width={isShowLarge ? 156 : 32}
            height={isShowLarge ? undefined : 32}
            icon={!isShowLarge}
          />
        </Link>
        {!isLgSmaller && (
          <IconButton
            onClick={onToggle}
            noPadding
            tooltip={isExpandedSidebar ? "Shrink" : "Expand"}
          >
            <DoubleArrowIcon
              fontSize="medium"
              color="success"
              sx={{
                transform: isExpandedSidebar ? undefined : "rotate(-180deg)",
              }}
            />
          </IconButton>
        )}
      </Stack>

      <Link
        href={UPGRADE_ACCOUNT_PATH}
        underline="none"
        sx={{ width: isShowLarge ? "100%" : undefined }}
      >
        {isShowLarge ? (
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
