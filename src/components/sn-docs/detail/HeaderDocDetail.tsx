"use client";

import { Box, Button, Stack } from "@mui/material";
import { Text, Tooltip } from "components/shared";
import useTheme from "hooks/useTheme";
import BackIcon from "icons/BackIcon";
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
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={{ xs: 2, md: 3 }}
        px={{ md: 3 }}
        pt={{ md: 1, lg: 1.5 }}
        pb={{ xs: 1.5, md: 1, lg: 1.5 }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            alignItems: "center",
          }}
        >
          <BackIcon></BackIcon>
          <Text variant={{ xs: "h3", md: "h4" }}>{"Project abc"}</Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >
            <BackIcon></BackIcon>
            <Text variant={{ xs: "h4", md: "h5" }}>{"Project abc"}</Text>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: {
                md: "flex-end",
                xs: "space-between",
              },
              gap: {
                md: "20px",
                xs: "12px",
              },
            }}
          >
            <Text color={"success.main"}>Full access</Text>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  md: "20px",
                  xs: "12px",
                },
              }}
            >
              <Tooltip title={"Chia sẻ"}>
                <Box sx={styleButton}>
                  <ShareIcon></ShareIcon>
                </Box>
              </Tooltip>
              <Tooltip title={"Copy link"}>
                <Box sx={styleButton}>
                  <CopyIcon></CopyIcon>
                </Box>
              </Tooltip>
              <Tooltip title={"Bình luận"}>
                <Box sx={styleButton}>
                  <CommentIcon></CommentIcon>
                </Box>
              </Tooltip>
              <Tooltip title={"Mở slide"}>
                <Box sx={styleButton}>
                  <OpenSidebarIcon></OpenSidebarIcon>
                </Box>
              </Tooltip>
              <Tooltip title={"Thêm"}>
                <Box sx={styleButton}>
                  <MoreIcon></MoreIcon>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};
const styleButton = {
  padding: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

export default HeaderDocDetail;
