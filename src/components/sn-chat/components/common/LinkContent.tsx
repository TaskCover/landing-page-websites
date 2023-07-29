import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import Media from "components/Media";
import { DataStatus } from "constant/enums";
import { useEffect, useMemo } from "react";
import { useAuth } from "store/app/selectors";
import { useChat } from "store/chat/selectors";

const LinkContent = () => {
  const { chatLinks, chatLinksStatus, onGetChatUrls } = useChat();

  useEffect(() => {
    onGetChatUrls();
  }, [onGetChatUrls]);

  const chatLinkClone = useMemo(() => {
    return chatLinks?.reduce((result, current) => {
      const { urls, ...rest } = current;
      const url = current.urls.map((item) => ({ ...rest, ...item }));
      return [...result, ...url];
    }, [] as unknown as { url: string; meta: {}; messageId: string; ts: string }[]);
  }, [chatLinks]);

  return (
    <Box
      sx={{
        overflow: "auto",
        maxHeight: "calc(600px - 77px - 59px - 16px)",
        height: "100%",
        paddingLeft: "1rem",
        paddingRight: "0.3rem",
      }}
    >
      {chatLinksStatus === DataStatus.LOADING ||
      chatLinksStatus === DataStatus.FAILED ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : (
        chatLinkClone?.map((item, index) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
              alignItems="center"
              py=".5rem"
              gap="1rem"
              borderBottom="1px solid #ECECF3"
            >
              <Media
                size={64}
                style={{
                  minWidth: "64px",
                  borderRadius: "10px",
                }}
              />
              <Link
                href={item.url}
                target="_blank"
                sx={{
                  overflowWrap: "anywhere",
                }}
              >
                {item.url}
              </Link>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default LinkContent;
