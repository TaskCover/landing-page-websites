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
import { useRouter } from "next/navigation";
import ModalShare from "./LeftSlide/modal/ModalShare";

const HeaderDocDetail = () => {
  const [openShare, setOpenShare] = useState(false);
  const router = useRouter();
  return (
    <>
      <ModalShare
        setOpenShare={setOpenShare}
        openShare={openShare}
      ></ModalShare>
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
              sm: "none",
            },
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <BackIcon></BackIcon>
          <Text
            onClick={() => router.back()}
            sx={{
              cursor: "pointer",
            }}
            variant={{ xs: "h3", sm: "h4" }}
          >
            {"Project abc"}
          </Text>
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
                sm: "flex",
              },
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            <BackIcon></BackIcon>
            <Text variant={{ xs: "h4", sm: "h5" }}>{"Project abc"}</Text>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: {
                sm: "flex-end",
                xs: "space-between",
              },
              gap: {
                sm: "20px",
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
                  sm: "20px",
                  xs: "12px",
                },
              }}
            >
              <Tooltip title={"Chia sẻ"}>
                <Box onClick={() => setOpenShare(true)} sx={styleButton}>
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
