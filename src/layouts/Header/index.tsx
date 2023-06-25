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
import { PROJECTS_PATH } from "constant/paths";
import { DataStatus } from "constant/enums";
import useToggle from "hooks/useToggle";

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
            emitWhenEnter={isFocused}
            value={filters?.[key as string]}
          />
        )}
        <SwitchLanguage />
        <AccountInfo />
      </Stack>
      <Drawer />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
