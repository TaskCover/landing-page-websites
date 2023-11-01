import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import useTheme from "hooks/useTheme";
import FileBasicIcon from "icons/FileBasicIcon";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";

const FileContent = () => {
  const { mediaList, mediaListStatus, onGetChatAttachments } = useChat();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  useEffect(() => {
    const handleGetAttachment = async () => {
      try {
        await onGetChatAttachments({ fileType: "file" });
      } catch (error) {
        onAddSnackbar(
          typeof error === "string" ? error : commonT(AN_ERROR_TRY_AGAIN),
          "error",
        );
      }
    };

    handleGetAttachment();
  }, [onAddSnackbar, onGetChatAttachments, commonT]);

  const fileClone = useMemo(() => {
    return mediaList?.filter((file) => file.name && file.path);
  }, [mediaList]);

  if (
    mediaListStatus === DataStatus.LOADING ||
    mediaListStatus === DataStatus.FAILED
  ) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  const {isDarkMode} = useTheme();
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
      {fileClone.length > 0 ? (
        fileClone?.map((item, index) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
              alignItems="center"
              py=".5rem"
              gap="1rem"
            >
              <FileBasicIcon
                sx={{
                  fill: "transparent",
                  color: "#666666",
                }}
              />
              <Link
                href={item.path}
                target="_blank"
                sx={{
                  color: isDarkMode ? 'white' : "#212121",
                  overflowWrap: "anywhere",
                  fontWeight: 600,
                  textDecoration: "auto",
                }}
              >
                {item.name}
              </Link>
            </Box>
          );
        })
      ) : (
        <Typography textAlign="center">{commonT("noData")}</Typography>
      )}
    </Box>
  );
};

export default FileContent;
