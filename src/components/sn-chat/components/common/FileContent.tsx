import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import { DataStatus } from "constant/enums";
import FileBasicIcon from "icons/FileBasicIcon";
import { useEffect, useMemo } from "react";
import { useChat } from "store/chat/selectors";

const FileContent = () => {
  const { mediaList, mediaListStatus, onGetChatAttachments } = useChat();

  useEffect(() => {
    onGetChatAttachments({ fileType: "file" });
  }, [onGetChatAttachments]);

  const fileClone = useMemo(() => {
    return mediaList?.filter((file) => file.path);
  }, [mediaList]);

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
      {mediaListStatus === DataStatus.LOADING ||
      mediaListStatus === DataStatus.FAILED ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : (
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
                  color: "#212121",
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
      )}
    </Box>
  );
};

export default FileContent;
