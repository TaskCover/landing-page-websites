import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import Media from "components/Media";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";

const LinkContent = () => {
  const { chatLinks, chatLinksStatus, onGetChatUrls } = useChat();
  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);

  useEffect(() => {
    const handleGetUrl = async () => {
      try {
        await onGetChatUrls();
      } catch (error) {
        onAddSnackbar(
          typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
          "error",
        );
      }
    };

    handleGetUrl();
  }, [onAddSnackbar, onGetChatUrls, t]);

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
        maxHeight: "100%",
        height: "100%",
        paddingLeft: "1rem",
        paddingRight: "0.3rem",
      }}
    >
      {chatLinksStatus === DataStatus.LOADING ||
      chatLinksStatus === DataStatus.FAILED ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : chatLinkClone?.length > 0 ? (
        chatLinkClone.map((item, index) => {
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
      ) : (
        <Typography textAlign="center">No Data...</Typography>
      )}
    </Box>
  );
};

export default LinkContent;
