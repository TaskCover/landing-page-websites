import { Drawer, Box, Typography, Avatar } from "@mui/material";
import AccountInfoHeader from "./AccountInfoHeader";
import { IChatItemInfo } from "store/chat/type";
import AccountInfoItem from "./AccountInfoItem";

interface AccountInfoProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

interface InfoItem {
  label: string;
  value: string;
}

const infoItems: InfoItem[] = [
  {
    label: "Name",
    value: "Nguyen Van A",
  },
  {
    label: "Chức vụ",
    value: "CEO 12",
  },
  {
    label: "Số điện thoại",
    value: "0332429173",
  },
  {
    label: "Email",
    value: "eu@fpt.com",
  },
];

const AccountInfo: React.FC<AccountInfoProps> = (props) => {
  const styleDrawerOpen = props.isOpen ? { width: "272px" } : { width: "0" };

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
          {infoItems.map((item, index) => (
            <AccountInfoItem
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AccountInfo;
