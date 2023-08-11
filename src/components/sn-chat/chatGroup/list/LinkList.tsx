import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useChat } from "store/chat/selectors";
import Media from "components/Media";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LinkList = () => {
  const { onSetTypeList, typeList } = useChat();

  const { chatAttachments, dataTransfer, onGetChatAttachments } = useChat();

  React.useEffect(() => {
    onGetChatAttachments({
      roomId: dataTransfer?._id,
      fileType: "link",
      roomType: "p",
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onSetTypeList(newValue);
  };

  return (
    <>
      {chatAttachments?.files?.map((file, index) => (
        <Box
          key={index}
          sx={{
            margin: "0 8px",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid var(--gray-1, #ECECF3)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Media size={54} borderRadius="0.625rem" />
            <Typography
              sx={{
                color: "var(--brand-primary, #3699FF)",
                fontSize: "0.875rem",
                fontWeight: 400,
                marginLeft: "1rem",
              }}
            >
              https://www.figma.com/community file/1094158825418681136
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default LinkList;
