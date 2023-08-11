import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useChat } from "store/chat/selectors";
import FileGroupIcon from "icons/FileGroupIcon";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const FileList = () => {
  const { onSetTypeList, typeList } = useChat();

  const { chatAttachments, dataTransfer, onGetChatAttachments } = useChat();

  React.useEffect(() => {
    onGetChatAttachments({
      roomId: dataTransfer?._id,
      fileType: "file",
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
            display: "flex",
            justifyItems: "center",
          }}
        >
          <FileGroupIcon />
          <Typography
            sx={{
              marginLeft: "1rem",
              color: "var(--black, #212121)",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Chat Mobile App.docx
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default FileList;
