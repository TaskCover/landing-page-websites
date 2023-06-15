import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { AccountInfo, Drawer } from "./components";
import AppLogo from "components/AppLogo";
import { Search } from "components/Filters";
import { Text } from "components/shared";
import { useHeaderConfig } from "store/app/selectors";
import { usePathname } from "next/navigation";

const Header = () => {
  const { title, searchPlaceholder } = useHeaderConfig();

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
      <Text variant="h5">{title ?? ""}</Text>
      <Stack direction="row" alignItems="center" spacing={8}>
        {!!searchPlaceholder && <Search name="search" sx={{ pt: 0.75 }} />}
        <AccountInfo />
      </Stack>
      <Drawer />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
