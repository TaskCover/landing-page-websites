"use client";

import { Box } from "@mui/material";
import React from "react";
import HeaderMobile from "../HeaderMobile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { HeaderMobileProps, MobileScreenType } from "../../type";
import { MobileScreen } from "../../const";
import { useParams, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const styleIcon = { color: "white", fontSize: "24px", cursor: "pointer" };
const ChattingRoomMobileLayout: React.FC<Props> = ({ children }) => {
  const params = useParams();
  const pathName = usePathname();

  const detectPropsWithScreen = () => {
    const propsScreenHandler: Partial<{
      [key in MobileScreenType]: () => HeaderMobileProps;
    }> = {
      [MobileScreen.CHAT]: () => {
        return {
          title: "Chat",
          prefix: <ArrowBackIosNewIcon sx={styleIcon} />,
          suffix: <ControlPointIcon sx={styleIcon} />,
        };
      },
    };

    return propsScreenHandler?.["CHAT"]?.();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderMobile {...detectPropsWithScreen()} />
      {children}
    </Box>
  );
};

export default ChattingRoomMobileLayout;
