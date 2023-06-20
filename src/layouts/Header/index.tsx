import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { AccountInfo, Drawer } from "./components";
import AppLogo from "components/AppLogo";
import { Search } from "components/Filters";
import { Text } from "components/shared";
import { useHeaderConfig } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import useWindowSize from "hooks/useWindowSize";
import Link from "components/Link";
import ChevronIcon from "icons/ChevronIcon";

const Header = () => {
  const { title, searchPlaceholder, prevPath } = useHeaderConfig();
  const { breakpoint } = useBreakpoint();
  const { width } = useWindowSize();

  return (
    <Stack
      height={HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="grey.100"
      bgcolor="common.white"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      width="100%"
    >
      <AppLogo height={48} className="only-mobile" />
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {!!prevPath && (
          <Link
            href={prevPath}
            sx={{ height: 24, display: { xs: "none", sm: "initial" } }}
          >
            <ChevronIcon
              sx={{ color: "text.primary", transform: "rotate(90deg)" }}
              fontSize="medium"
            />
          </Link>
        )}
        <Text variant="h5" display={{ xs: "none", sm: "initial" }}>
          {title ?? ""}
        </Text>
      </Stack>
      {/* {breakpoint}-{width} */}
      <Stack direction="row" alignItems="center" spacing={8}>
        {!!searchPlaceholder && (
          <Search
            name="search"
            sx={{ display: { xs: "none", sm: "initial" } }}
          />
        )}
        <AccountInfo />
      </Stack>
      <Drawer />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
