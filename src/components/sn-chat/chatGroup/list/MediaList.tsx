import * as React from "react";
import Box from "@mui/material/Box";
import { useChat } from "store/chat/selectors";
import Media from "components/Media";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const MediaList = () => {
  const { onSetTypeList, typeList } = useChat();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onSetTypeList(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <Media
          size={90}
          // src={user?.avatar?.link}
          // alt={user.fullname}
        />
        <Media
          size={90}
          // src={user?.avatar?.link}
          // alt={user.fullname}
        />
        <Media
          size={90}
          // src={user?.avatar?.link}
          // alt={user.fullname}
        />
        <Media
          size={90}
          // src={user?.avatar?.link}
          // alt={user.fullname}
        />
        <Media
          size={90}
          // src={user?.avatar?.link}
          // alt={user.fullname}
        />
      </Box>
    </>
  );
};

export default MediaList;
