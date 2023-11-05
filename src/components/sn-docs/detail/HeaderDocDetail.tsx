"use client";
import BackIcon from "icons/BackIcon";
import CommentIcon from "icons/CommentIcon";
import CopyIcon from "icons/CopyIcon";
import ModalShare from "./LeftSlide/modal/ModalShare";
import MoreIcon from "icons/MoreIcon";
import OpenSidebarIcon from "icons/OpenSidebarIcon";
import React, { useState } from "react";
import SelectProjectInDoc from "./SelectProjectInDoc";
import ShareIcon from "icons/ShareIcon";
import { Box, Stack, TextField } from "@mui/material";
import { changeTitle } from "store/docs/reducer";
import { IDocDetail } from "./DocDetail";
import { NS_DOCS } from "constant/index";
import { Text, Tooltip } from "components/shared";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useBreakpoint from "hooks/useBreakpoint";
/* eslint-disable @typescript-eslint/no-explicit-any */

const HeaderDocDetail = ({ setOpenComment, setOpenSlider }: IDocDetail) => {
  const [openShare, setOpenShare] = useState(false);
  const router = useRouter();
  const docsT = useTranslations(NS_DOCS);
  const dispatch = useAppDispatch();
  const title = useAppSelector((e) => e.doc.title);
  const [valueCopy, copy] = useCopyToClipboard();
  const handleChange = (e) => {
    dispatch(changeTitle(e));
  };
  const { isSmSmaller } = useBreakpoint();
  return (
    <>
      <ModalShare
        setOpenShare={setOpenShare}
        openShare={openShare}
      ></ModalShare>
      <Box px={{ md: 3 }}>
        <Stack
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="grey.100"
          spacing={{ xs: 2, md: 3 }}
          px={1}
          mb={{ xs: 1.5, md: 1, lg: 1.5 }}
          py={"16px"}
          bgcolor={"background.paper"}
        >
          {isSmSmaller && (
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                },
                height: {
                  sm: "0px",
                },
                alignItems: "center",
              }}
            >
              <BackIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => router.back()}
              ></BackIcon>
              <SelectProjectInDoc></SelectProjectInDoc>
              <Text pr={"2px"}>/</Text>
              <TextField
                variant="outlined"
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  input: {
                    padding: 0,
                  },
                  padding: 0,
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                value={title}
                onChange={(e) => handleChange(e.target.value)}
              ></TextField>
            </Box>
          )}

          <Box
            sx={{
              px: {
                xs: "10px",
              },
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
              }}
            >
              <BackIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => router.back()}
              ></BackIcon>
              <SelectProjectInDoc></SelectProjectInDoc>
              <Text pl={"3px"} pr={"6px"}>
                /
              </Text>
              <TextField
                placeholder="Nhập Tên DocgetExtensions"
                variant="outlined"
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  input: {
                    padding: 0,
                  },
                  padding: 0,
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                value={title}
                onChange={(e) => handleChange(e.target.value)}
              ></TextField>
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
                <Tooltip title={docsT("createDoc.share")}>
                  <Box onClick={() => setOpenShare(true)} sx={styleButton}>
                    <ShareIcon></ShareIcon>
                  </Box>
                </Tooltip>
                <Tooltip
                  title={
                    valueCopy ? "Đã sao chép" : docsT("createDoc.copyLink")
                  }
                >
                  <Box
                    onClick={() => {
                      copy(window.location.href);
                      setTimeout(() => {
                        copy(null);
                      }, 5000);
                    }}
                    sx={styleButton}
                  >
                    <CopyIcon></CopyIcon>
                  </Box>
                </Tooltip>
                <Tooltip title={docsT("createDoc.comment")}>
                  <Box
                    onClick={() => setOpenComment((value) => !value)}
                    sx={styleButton}
                  >
                    <CommentIcon></CommentIcon>
                  </Box>
                </Tooltip>
                <Tooltip title={docsT("createDoc.slider")}>
                  <Box
                    onClick={() => setOpenSlider((value) => !value)}
                    sx={styleButton}
                  >
                    <OpenSidebarIcon></OpenSidebarIcon>
                  </Box>
                </Tooltip>
                <Tooltip title={docsT("createDoc.more")}>
                  <Box sx={styleButton}>
                    <MoreIcon></MoreIcon>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
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

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<any>(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
