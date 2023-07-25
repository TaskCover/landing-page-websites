import { memo, useEffect, useState } from "react";
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
import SwitchLanguage from "components/SwitchLanguage";
import { useProjects } from "store/project/selectors";
import { useRouter } from "next-intl/client";
import { getPath } from "utils/index";
import { HOME_PATH, PROJECTS_PATH } from "constant/paths";
import { DataStatus } from "constant/enums";
import useToggle from "hooks/useToggle";
import SwitchTheme from "components/SwitchTheme";

const Header = () => {
  const { title, searchPlaceholder, prevPath, key } = useHeaderConfig();
  const { breakpoint } = useBreakpoint();
  const { push } = useRouter();
  const { pageSize, filters, status, onGetProjects } = useProjects();

  const [isFocused, onFocused, onUnFocused] = useToggle();

  const onSearch = (name: string, newValue?: string) => {
    const isFirstFetchedSuccess = status === DataStatus.SUCCEEDED;
    const queries = {
      pageIndex: 1,
      pageSize,
      [name]: newValue,
    };
    if (isFirstFetchedSuccess) {
      onGetProjects(queries);
    }
    const path = getPath(PROJECTS_PATH, queries);
    push(path);
  };

  return (
    <Stack
      height={HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="grey.100"
      bgcolor="background.paper"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 2, md: 3 }}
      width="100%"
    >
      <Link href={HOME_PATH} underline="none">
        <AppLogo height={48} className="only-mobile" />
      </Link>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        overflow="hidden"
        flex={1}
      >
        {prevPath ? (
          <Link
            href={prevPath}
            sx={{ height: 24, display: { xs: "none", sm: "initial" } }}
          >
            <ChevronIcon
              sx={{ color: "text.primary", transform: "rotate(90deg)" }}
              fontSize="medium"
            />
            {!!title && (
              <Text
                variant="h5"
                sx={{ verticalAlign: "super" }}
                display={{ xs: "none", sm: "initial" }}
                noWrap
              >
                {title ?? ""}
              </Text>
            )}
          </Link>
        ) : (
          <Text variant="h5" display={{ xs: "none", sm: "initial" }} noWrap>
            {title ?? ""}
          </Text>
        )}
      </Stack>
      {/* {breakpoint}-{width} */}
      <Stack direction="row" alignItems="center" spacing={3}>
        {Boolean(searchPlaceholder && key) && (
          <Search
            sx={{ display: { xs: "none", sm: "initial" } }}
            placeholder={searchPlaceholder}
            name={key as string}
            onChange={onSearch}
            InputProps={{
              onFocus: onFocused,
              onBlur: onUnFocused,
            }}
            hasClear={false}
            emitWhenEnter={isFocused}
            value={filters?.[key as string]}
          />
        )}
        <Stack direction="row" alignItems="center" spacing={2}>
          <SwitchLanguage />
          <SwitchTheme />
        </Stack>
        <AccountInfo />
      </Stack>
      <Drawer />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
