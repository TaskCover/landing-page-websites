import { Drawer, Box, Typography, Avatar } from "@mui/material";
import AccountInfoHeader from "./AccountInfoHeader";
import { IChatItemInfo } from "store/chat/type";
import AccountInfoItem from "./AccountInfoItem";
import { useChat } from "store/chat/selectors";
import { useEffect } from "react";
import { UserInfo } from "store/app/reducer";
import { useTranslations } from "next-intl";
import { NS_AUTH } from "constant/index";

interface AccountInfoProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

interface InfoItem {
  label: string;
  value: string;
}

const mapperDataToInfo = (partnerInfo: Partial<UserInfo>) => ({
  fullName: partnerInfo.fullname,
  email: partnerInfo.email,
  position: partnerInfo.position?.name,
  phone: partnerInfo.phone
})


const AccountInfo: React.FC<AccountInfoProps> = (props) => {
  const styleDrawerOpen = props.isOpen ? { width: "272px" } : { width: "0" };
  const { partnerInfo } = useChat()
  const t = useTranslations(NS_AUTH)
  
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          top: "50px",
          width: "272px",
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="persistent"
      anchor="right"
      open={props.isOpen}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "272px",
          height: "677px",
          gap: "12px",
        }}
      >
        <AccountInfoHeader
          onClose={props.onClose}
          currentConversation={props.currentConversation}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Avatar
            src={props.currentConversation?.avatar}
            sx={{
              height: "80px",
              width: "80px",
              flexShrink: "0",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "stretch",
            flexDirection: "column",
            padding: "0px 12px",
          }}
        >
          {partnerInfo && Object.keys(mapperDataToInfo(partnerInfo))?.map((key) => (
            <AccountInfoItem
              key={key}
              label={t(`signup.form.title.${key}`)}
              value={mapperDataToInfo(partnerInfo)[key]}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AccountInfo;
