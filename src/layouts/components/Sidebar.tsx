import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import DoubleArrowIcon from "icons/DoubleArrowIcon";
import Menu from "./Menu";
import AppLogo from "components/AppLogo";
import Link from "components/Link";
import { HOME_PATH } from "constant/paths";

const Sidebar = (props: StackProps) => {
  return (
    <Stack
      height="100%"
      p={{ lg: 2.5, xl: 3 }}
      sx={{
        backgroundColor: "common.white",
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
      }}
      alignItems="center"
      minWidth="23.5vw"
      width="23.5vw"
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
          <AppLogo width={156} />
        </Link>

        <DoubleArrowIcon fontSize="medium" color="success" />
      </Stack>
      <Menu />
    </Stack>
  );
};

export default memo(Sidebar);
