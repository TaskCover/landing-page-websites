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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onSetTypeList(newValue);
  };

  return (
    <>
      <Box
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
    </>
  );
};

export default FileList;
