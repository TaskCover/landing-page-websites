import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import Image from "next/image";
import AppLogoImage from "public/images/img-app-logo.webp";
import DoubleArrowIcon from "icons/DoubleArrowIcon";

// import Menu from "./Menu";

const Sidebar = (props: StackProps) => {
  return (
    <Stack
      justifyContent="space-between"
      height="100%"
      py={3}
      sx={{
        backgroundColor: "common.white",
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
      }}
      alignItems="center"
      minWidth={300}
      width={300}
      overflow="auto"
      {...props}
    >
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2.5}
      >
        <Image src={AppLogoImage} alt="App Logo" width={156} />
        <DoubleArrowIcon fontSize="medium" color="success" />
      </Stack>
      {/* <Menu /> */}
    </Stack>
  );
};

export default memo(Sidebar);
