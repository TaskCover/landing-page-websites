import Box, { BoxProps } from "@mui/material/Box";
import Avatar from "components/Avatar";
import { MessageInfo, Url } from "store/chat/type";

interface MessageLayoutProps {
  sessionId: string;
  message: MessageInfo;
  children: React.ReactNode;
  avatarPartner: string | undefined;
  hasNextMessageFromSameUser: boolean;
  messageProps: BoxProps;
}
const MessageLayout = ({
  sessionId,
  message,
  children,
  avatarPartner,
  hasNextMessageFromSameUser,
  messageProps,
}: MessageLayoutProps) => {
  const isCurrentUser = message.u.username === sessionId;
  const { sx, ...props } = messageProps || {};

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          alignItems: "flex-end",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          "&:last-child": {
            paddingBottom: "1rem",
          },
          ...sx,
        }}
        {...props}
      >
        {/* Message content */}
        {children}
        {/* Avartar partner */}
        {!isCurrentUser && (
          <Box
            order={isCurrentUser ? "2" : "1"}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {!isCurrentUser && (
              <Avatar
                alt="Avatar"
                size={30}
                src={avatarPartner}
                style={{
                  borderRadius: "10px",
                  visibility: hasNextMessageFromSameUser ? "hidden" : "visible",
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MessageLayout;
