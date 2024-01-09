import { memo, useEffect, useMemo, useState } from "react";
import { Container, Stack } from "@mui/material";
import { AccountInfo, Drawer } from "./components";
import AppLogo from "components/AppLogo";
import { Search } from "components/Filters";
import { Text } from "components/shared";
import { useHeaderConfig, useSidebar } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import useWindowSize from "hooks/useWindowSize";
import Link from "components/Link";
import ChevronIcon from "icons/ChevronIcon";
import SwitchLanguage from "components/SwitchLanguage";
import { useProjects } from "store/project/selectors";
import { useRouter } from "next-intl/client";
import { getPath } from "utils/index";
import { HOME_PATH, PROJECTS_PATH } from "constant/paths";
import { DataStatus } from "constant/enums";
import useToggle from "hooks/useToggle";
import SwitchTheme from "components/SwitchTheme";
import Menu from "layouts/components/Menu";
import { SignInTrialHeader } from "layouts/components";

const Header = () => {
  const { push } = useRouter();
  const { pageSize, filters, status, onGetProjects } = useProjects();
  const { isExpandedSidebar, onToggleExpandSidebar } = useSidebar();
  const { isLgSmaller, isMdSmaller } = useBreakpoint();
  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );
  return (
    <Container>
      <Stack
        height={HEADER_HEIGHT}
        bgcolor="transparent"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Link href={HOME_PATH} underline="none" display="block">
          <AppLogo width={156} />
        </Link>
        <Menu />
        {isMdSmaller ? <></> : <SignInTrialHeader />}
      </Stack>
    </Container>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 96;
