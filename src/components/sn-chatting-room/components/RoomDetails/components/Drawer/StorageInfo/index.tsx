import { Box } from "@mui/material";
import useGetScreenMode from "hooks/useGetScreenMode";
import { FC } from "react";
import { DrawerInfoChatProps } from "..";
import InfoHeader from "../AccountInfo/InfoHeader";
import MediaContent from "components/sn-chat/components/common/MediaContent";
import FileContent from "components/sn-chat/components/common/FileContent";
import LinkContent from "components/sn-chat/components/common/LinkContent";
import useTheme from "hooks/useTheme";

const TYPES = [
  {
    text: "Media file",
    type: "media",
  },
  {
    text: "Link",
    type: "link",
  },
  {
    text: "File",
    type: "file",
  },
];

const StorageInfo: FC<DrawerInfoChatProps> = (props) => {
  const { extraDesktopMode } = useGetScreenMode();
  const {isDarkMode} =  useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: extraDesktopMode ? "424px" : "272px",
        height: extraDesktopMode ? "948px" : "681px",
        gap: "12px",
        backgroundColor: isDarkMode ? "#313130": "var(--Gray0, #F7F7FD)",
      }}
    >
      <InfoHeader
        onClose={props.onClose}
        currentConversation={props.currentConversation}
        title="Chat detail info"
      />
      <Box
        sx={{
          display: "flex",
          gap: "12px",
        }}
      >
        {TYPES.map((type) => (
          <Box
            gap="10px"
            key={type.type}
            sx={{
              padding: "5px 10px",
              borderRadius: "30px",
              border: `1px solid ${
                type?.type === props.type ? "#3699FF" : "#999999"
              }`,
              color: type?.type === props.type ? "#3699FF" : "#999999",
              minWidth: "78px",
              textAlign: "center",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() =>
              props?.onChangeTypeDrawer && props?.onChangeTypeDrawer(type?.type)
            }
          >
            {type.text}
          </Box>
        ))}
      </Box>
      <Box>
        {props?.type === "media" && <MediaContent /> }
        {props?.type === 'link' && <LinkContent />}
        {props?.type === 'file' && <FileContent />}
      </Box>
    </Box>
  );
};

export default StorageInfo;
