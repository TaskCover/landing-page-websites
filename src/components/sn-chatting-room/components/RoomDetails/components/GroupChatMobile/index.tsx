import { Avatar, Box, Drawer, IconButton, Typography } from "@mui/material";
import GroupChatHeaderMobile from "./GroupChatHeaderMobile";
import { useGroupChat } from "./useGroupChat";
import EditGroupNameIcon from "icons/EditGroupNameIcon";
import GroupChatItemMobile from "./GroupChatItemMobile";
import MembersMobile from "../MembersMobile";
import { IChatItemInfo } from "store/chat/type";

interface ChatDetailUserMobileProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

const GroupChatMobile: React.FC<ChatDetailUserMobileProps> = ({
  isOpen,
  onClose,
  currentConversation,
}) => {
  const {
    onOpenDrawer,
    closeDrawer,
    isDrawerOpen,
    topMenuItems,
    midMenuItems,
    bottomMenuItems,
  } = useGroupChat();

  const arrayAvatar = [
    {
      id: 1,
      avatar: currentConversation?.avatar,
    },
    {
      id: 2,
      avatar: currentConversation?.avatar,
    },
    {
      id: 3,
      avatar: currentConversation?.avatar,
    },
  ];

  const styleDrawerOpen = isOpen ? { width: "100%" } : { width: "0" };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          width: "100%",
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
            gap: "10px",
          }}
        >
          <GroupChatHeaderMobile onClose={onClose} />
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "129px",
                height: "55px",
                flexShrink: "0",
              }}
            >
              {arrayAvatar.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    position: "absolute",
                    left: `${index * 37}px`, // Adjust the left position as needed
                    zIndex: `${index + 1}`,
                  }}
                >
                  <Avatar
                    src={item.avatar}
                    sx={{
                      height: "55px",
                      width: "55px",
                      flexShrink: "0",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Typography variant="h4">Group X</Typography>
              <IconButton
                sx={{
                  width: "16px",
                  height: "16px",
                }}
              >
                <EditGroupNameIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            gap: "24px",
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F7F7FD",
            }}
          >
            {topMenuItems.map((item, index) => (
              <GroupChatItemMobile
                key={index}
                icon={item.icon}
                text={item.text}
                stroke={item.stroke}
              />
            ))}
          </Box>
          <Box
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F7F7FD",
            }}
          >
            {midMenuItems.map((item, index) => (
              <Box key={index}>
                <GroupChatItemMobile
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  borderBottom={item.borderBottom}
                  stroke={item.stroke}
                  onOpenDrawer={onOpenDrawer}
                  isDrawerOpen={isDrawerOpen}
                />
                {item.borderBottom && (
                  <Box
                    sx={{
                      width: "85%",
                      margin: "0 auto",
                      borderBottom: "1px solid #ECECF3",
                    }}
                  ></Box>
                )}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F7F7FD",
            }}
          >
            {bottomMenuItems.map((item, index) => (
              <Box key={index}>
                <GroupChatItemMobile
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  stroke={item.stroke}
                  borderBottom={item.borderBottom}
                />
                {item.borderBottom && (
                  <Box
                    sx={{
                      width: "85%",
                      margin: "0 auto",
                      borderBottom: "1px solid #ECECF3",
                    }}
                  ></Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
        <MembersMobile
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          currentConversation={currentConversation}
        />
      </Box>
    </Drawer>
  );
};

export default GroupChatMobile;
