import { Box, Stack } from "@mui/material";
import CogsOutlineIcon from "icons/CogsOutlineIcon";
import HomeOutlinedIcon from "icons/HomeOutlinedIcon";
import UserOutlineIcon from "icons/UserOutlineIcon";
import { PropsWithChildren, useState } from "react";
import { HomeTab } from "./RightSidebar/HomeTab";
import { ClientTab } from "./RightSidebar/ClientTab";
import { SettingTab } from "./RightSidebar/SettingTab";

enum Tabs {
  Home,
  Client,
  Setting,
}

export const BudgetRightSidebar = () => {
  const [tabActive, setTabActive] = useState<Tabs>(Tabs.Home);

  return (
    <Box>
      <Stack direction="row" gap={2}>
        <ButtonHeader
          isActive={tabActive === Tabs.Home}
          onClick={() => setTabActive(Tabs.Home)}
        >
          <HomeOutlinedIcon />
        </ButtonHeader>
        <ButtonHeader
          isActive={tabActive === Tabs.Client}
          onClick={() => setTabActive(Tabs.Client)}
        >
          <UserOutlineIcon />
        </ButtonHeader>
        <ButtonHeader
          isActive={tabActive === Tabs.Setting}
          onClick={() => setTabActive(Tabs.Setting)}
        >
          <CogsOutlineIcon />
        </ButtonHeader>
      </Stack>
      <Box>
        {tabActive === Tabs.Home && <HomeTab />}
        {tabActive === Tabs.Client && <ClientTab />}
        {tabActive === Tabs.Setting && <SettingTab />}
      </Box>
    </Box>
  );
};

const ButtonHeader = ({
  children,
  isActive = false,
  onClick,
}: PropsWithChildren<{ isActive?: boolean; onClick?: () => void }>) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 1,
        color: isActive ? "primary.main" : "grey.700",
        fontSize: "28px",
        position: "relative",
        cursor: "pointer",
        "&:after": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: isActive ? "75%" : 0,
          opacity: isActive ? 1 : 0,
          height: "2px",
          bgcolor: "primary.main",
          transform: "translateX(-50%)",
          transition: "all .2s",
        },
        "&:hover": {
          color: "primary.main",
          "&:after": {
            opacity: 1,
            width: "75%",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};
