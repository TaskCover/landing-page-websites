import { Box, InputBase, Paper, IconButton } from "@mui/material";
import BoxChatUser from "components/BoxChatUser";
import SearchIcon from "icons/SearchIcon";
import React from "react";

const Sidebar = () => {
  const renderSearchArea = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#3699FF",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            height: "40px",
            width: "273px",
            borderRadius: "8px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <InputBase
            size="small"
            placeholder="search name"
            sx={{
              backgroundColor: "white",
            }}
          />
        </Paper>
      </Box>
    );
  };

  const renderUsers = () => {
    return (
      <>
        <BoxChatUser
          name="Nguyen Quoc Duy"
          currentMess="mess new"
          isHasNewMessage
          isOnline
          timeSendMess="3"
          isChoose
        />
        <BoxChatUser
          name="Nguyen Quoc Duy"
          currentMess="mess new"
          isHasNewMessage
          timeSendMess="3"
        />
      </>
    );
  };

  return (
    <Box style={{ width: "20%" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {renderSearchArea()}
        {renderUsers()}
      </Box>
    </Box>
  );
};

export default Sidebar;
