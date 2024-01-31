import { Container, Stack } from "@mui/material";
import AppLogo from "components/AppLogo";
import Link from "components/Link";
import { HOME_PATH } from "constant/paths";
import useBreakpoint from "hooks/useBreakpoint";
import { MenuMobile, SignInTrialHeader } from "layouts/components";
import Menu from "layouts/components/Menu";
import { memo } from "react";

const Header = () => {
  const { isMdSmaller } = useBreakpoint();
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
        <MenuMobile />
        {isMdSmaller ? <></> : <SignInTrialHeader />}
      </Stack>
    </Container>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 96;
