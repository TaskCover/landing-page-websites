import { memo } from "react";
import { Stack } from "@mui/material";
import { AccountInfo, Drawer } from "./components";
import AppLogo from "components/AppLogo";

const Header = () => {
  return (
    <Stack
      height={HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="grey.100"
      bgcolor="common.white"
      direction="row"
      justifyContent="space-between"
      py={{ sm: 1.125 }}
      px={3}
      width="100%"
    >
      <AppLogo height={48} className="only-mobile" />
      <AccountInfo />
      <Drawer />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
