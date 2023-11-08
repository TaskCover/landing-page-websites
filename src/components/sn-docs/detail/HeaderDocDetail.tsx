/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import _ from "lodash";
import { Box, Button, Input, Stack, TextField } from "@mui/material";
import { Text, Tooltip } from "components/shared";
import useTheme from "hooks/useTheme";
import BackIcon from "icons/BackIcon";
import CommentIcon from "icons/CommentIcon";
import CopyIcon from "icons/CopyIcon";
import MoreDotIcon from "icons/MoreDotIcon";
import MoreIcon from "icons/MoreIcon";
import OpenSidebarIcon from "icons/OpenSidebarIcon";
import ShareIcon from "icons/ShareIcon";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModalShare from "./LeftSlide/modal/ModalShare";
import { IDocDetail } from "./DocDetail";
import { useTranslations } from "next-intl";
import { NS_DOCS } from "constant/index";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { changeProjectId, changeTitle } from "store/docs/reducer";
import TextFieldSelect from "components/shared/TextFieldSelect";
import { useProjects } from "store/project/selectors";
import { useDispatch } from "react-redux";

const HeaderDocDetail = ({ setOpenComment, setOpenSlider }: IDocDetail) => {
  const [openShare, setOpenShare] = useState(false);
  const router = useRouter();
  const docsT = useTranslations(NS_DOCS);
  const dispatch = useAppDispatch();
  const title = useAppSelector((e) => e.doc.title);
  const { project_id } = useAppSelector((state) => state.doc);
  const [valueCopy, copy] = useCopyToClipboard();
  const handleChange = (e) => {
    dispatch(changeTitle(e));
  };
  const [projectOptions, setProjectOptions] = useState<any[]>([]);
  const { items: projects, onGetProjects } = useProjects();
  const [valueProject, setValueProject] = useState<any>("");

  useEffect(() => {
    if (!_.isEmpty(projects)) {
      const resolveProjects = _.map(projects, (project) => {
        return {
          label: project?.name,
          value: project?.id,
        };
      });
      setProjectOptions(resolveProjects);
    }
  }, [projects]);

  useEffect(() => {
    onGetProjects({ pageSize: -1, pageIndex: 0 });
  }, []);

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
          mt={{ md: 1, lg: 1.5 }}
          mb={{ xs: 1.5, md: 1, lg: 1.5 }}
          py={"16px"}
          bgcolor={"background.paper"}
        >
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
              }}
            >
              <BackIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => router.back()}
              ></BackIcon>
              {/* Select Project */}
              <TextFieldSelect
                hiddenIcon
                options={projectOptions}
                sx={{
                  bgcolor: "transparent",
                  flex: 1,
                  width: "170px",
                  maxWidth: "170px",
                  overflow: "hidden",
                  height: "auto",
                  label: {
                    border: "none",
                    padding: 0,
                    height: "auto",
                  },
                  input: {
                    border: "none",
                    padding: 0,
                    height: "auto",
                  },
                  ".MuiInputBase-root": {
                    backgroundColor: "background.paper",
                  },
                  ".MuiSelect-select": {
                    padding: "0px",
                  },
                }}
                value={project_id}
                onChange={(e) => {
                  dispatch(changeProjectId(e.target.value as string));
                  setValueProject(e.target.value);
                }}
              />
              <Text>/</Text>
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
            <TextFieldSelect
              hiddenIcon
              options={projectOptions}
              sx={{
                bgcolor: "transparent",
                flex: 1,
                width: "150px",
                maxWidth: "150px",
                overflow: "hidden",
                height: "auto",
                label: {
                  border: "none",
                  padding: 0,
                  height: "auto",
                },
                input: {
                  border: "none",
                  padding: 0,
                  height: "auto",
                },
                ".MuiInputBase-root": {
                  backgroundColor: "background.paper",
                },
                ".MuiSelect-select": {
                  padding: "0px",
                },
              }}
              value={project_id}
              onChange={(e) => {
                dispatch(changeProjectId(e.target.value as string));
                setValueProject(e.target.value);
              }}
            />
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
