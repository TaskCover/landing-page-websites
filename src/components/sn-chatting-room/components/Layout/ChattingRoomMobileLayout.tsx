"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderMobile from "../HeaderMobile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { HeaderMobileProps, MobileScreenType } from "../../type";
import { MobileScreen } from "../../const";
import { useParams, usePathname } from "next/navigation";
import AddMemberToGroup from "../RoomDetails/components/AddMemberToGroup";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { useAuth } from "store/app/selectors";

interface Props {
  children: React.ReactNode;
}

const styleIcon = { color: "white", fontSize: "24px", cursor: "pointer" };
const ChattingRoomMobileLayout: React.FC<Props> = ({ children }) => {
  const params = useParams();
  const pathName = usePathname();

  const { onGetEmployees, items } = useEmployeesOfCompany();
  const { user } = useAuth();

  const getEmployeesByCompany = () => {
    if (user && user.company) {
      onGetEmployees(user?.company ?? "", { pageIndex: 0, pageSize: 30 });
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    getEmployeesByCompany();
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const detectPropsWithScreen = () => {
    const propsScreenHandler: Partial<{
      [key in MobileScreenType]: () => HeaderMobileProps;
    }> = {
      [MobileScreen.CHAT]: () => {
        return {
          title: "Chat",
          prefix: <ArrowBackIosNewIcon sx={styleIcon} />,
          suffix: (
            <ControlPointIcon sx={styleIcon} onClick={handleOpenDrawer} />
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
      }}
    >
      <HeaderMobile {...detectPropsWithScreen()} />
      {children}
      <AddMemberToGroup
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        items={items}
      />
    </Box>
  );
};

export default ChattingRoomMobileLayout;
