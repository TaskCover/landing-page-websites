"use client";

import { Box } from "@mui/material";
import React from "react";
import HeaderMobile from "../HeaderMobile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { HeaderMobileProps, MobileScreenType } from "../../type";
import { MobileScreen } from "../../const";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { useAuth } from "store/app/selectors";
import useTheme from "hooks/useTheme";

interface Props {
  children: React.ReactNode;
  setOpenAddGroup?: (value: boolean) => void;
}

const styleIcon = { color: "white", fontSize: "24px", cursor: "pointer" };
const ChattingRoomMobileLayout: React.FC<Props> = ({
  children,
  setOpenAddGroup,
}) => {

  const {isDarkMode} = useTheme();
  const { onGetEmployees, items } = useEmployeesOfCompany();
  const { user } = useAuth();

  const getEmployeesByCompany = () => {
    if (user && user.company) {
      onGetEmployees(user?.company ?? "", { pageIndex: 0, pageSize: 30 });
    }
  };

  const detectPropsWithScreen = () => {
    const propsScreenHandler: Partial<{
      [key in MobileScreenType]: () => HeaderMobileProps;
    }> = {
      [MobileScreen.CHAT]: () => {
        return {
          title: "Chat",
          prefix: (
            <ArrowBackIosNewIcon
              sx={styleIcon}
              onClick={() => setOpenAddGroup && setOpenAddGroup(false)}
            />
          ),
          suffix: (
            <ControlPointIcon
              sx={styleIcon}
              onClick={() => setOpenAddGroup && setOpenAddGroup(true)}
            />
          ),
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
        bgcolor: isDarkMode ? "var(--mui-palette-grey-50)" : 'white',
      }}
    >
      <HeaderMobile {...detectPropsWithScreen()} />
      {children}
    </Box>
  );
};

export default ChattingRoomMobileLayout;
