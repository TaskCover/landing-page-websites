import { memo } from "react";
import { Stack } from "@mui/material";
import { AccountInfo } from "./components";

const Header = () => {
  return (
    <Stack
      height={HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="grey.100"
      bgcolor="common.white"
      direction="row"
      justifyContent="flex-end"
      py={1.125}
      px={3}
    >
      <AccountInfo />
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 50;
