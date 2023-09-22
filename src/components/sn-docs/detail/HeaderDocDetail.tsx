"use client";

import { Box, Button, Stack } from "@mui/material";
import { Text, Tooltip } from "components/shared";
import useTheme from "hooks/useTheme";
import CommentIcon from "icons/CommentIcon";
import CopyIcon from "icons/CopyIcon";
import MoreDotIcon from "icons/MoreDotIcon";
import MoreIcon from "icons/MoreIcon";
import OpenSidebarIcon from "icons/OpenSidebarIcon";
import ShareIcon from "icons/ShareIcon";
import React, { useState } from "react";

const HeaderDocDetail = () => {
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={{ xs: 2, md: 3 }}
        px={{ md: 3 }}
        pt={{ md: 1, lg: 1.5 }}
        pb={{ xs: 1.5, md: 1, lg: 1.5 }}
      >
        <Text variant={{ xs: "h3", md: "h4" }}>{"Project abc"}</Text>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text display={{ md: "none" }} variant={{ xs: "h4", md: "h5" }}>
            {"Project abc"}
          </Text>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text mr={4} color={"success.main"}>
              Full access
            </Text>
            <Tooltip title={"Chia sẻ"}>
              <Button variant="text">
                <ShareIcon></ShareIcon>
              </Button>
            </Tooltip>
            <Tooltip title={"Chia sẻ"}>
              <Button variant="text">
                <CopyIcon></CopyIcon>
              </Button>
            </Tooltip>
            <Tooltip title={"Bình luận"}>
              <Button variant="text">
                <CommentIcon></CommentIcon>
              </Button>
            </Tooltip>
            <Tooltip title={"Mở slide"}>
              <Button variant="text">
                <OpenSidebarIcon></OpenSidebarIcon>
              </Button>
            </Tooltip>
            <Tooltip title={"Thêm"}>
              <Button variant="text">
                <MoreIcon></MoreIcon>
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default HeaderDocDetail;
