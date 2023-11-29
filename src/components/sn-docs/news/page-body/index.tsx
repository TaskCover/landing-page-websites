"use client";

import { Box } from "@mui/material";
import { Editor } from "@tiptap/react";
import { IDocDetail } from "components/sn-docs/detail/DocDetail";
import DrawSlider from "components/sn-docs/detail/DrawSlider";
import useTheme from "hooks/useTheme";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDocs } from "store/docs/selectors";
import { useAppSelector } from "store/hooks";
import ChangeCover from "../change-cover-panel";
import { ThemeContext } from "../context/ThemeContext";
import { Tiptap } from "../tiptap/Tiptap";
import styles from "./scss/pageBody.module.scss";
/* eslint-disable no-var */
import DrawComment, {
  LayoutSlider,
} from "components/sn-docs/detail/DrawComment";
import useDebounce from "hooks/useDebounce";
import {
  changeContentDoc,
  changeDescription,
  resetDocDetail,
} from "store/docs/reducer";
import useDocEditor from "../hook/useDocEditor";
import { NewPageContext } from "../context/NewPageContext";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const PageBody = ({ openSlider, setOpenSlider }: IDocDetail) => {
  const pageInfo = useAppSelector((state) => state.doc.pageInfo);
  const {
    content,
    id,
    title: name,
    description,
    project_id,
  } = useAppSelector((state) => state.doc);
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { openComment } = useContext(NewPageContext);
  const [minHeight, setMinHeight] = useState("100vh");
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const { handleUpdateDoc } = useDocs();
  const [handleTitleChange] = useDebounce((value: string): void => {
    dispatch(changeDescription(value));
  }, 200);

  useEffect(() => {
    const data = {
      content: content,
      name: name || "No Name",
      description: description,
      project_id: project_id,
    };
    if (mounted) {
      if (id) {
        handleUpdateDoc(data, id);
      } else {
      }
    } else {
      setMounted(true);
    }
  }, [description, content, name, project_id]);

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  const editor = useDocEditor() as Editor;

  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight: number = window.innerHeight;
      const elementPosition: DOMRect | undefined = document
        .getElementById("is-edit-text")
        ?.getBoundingClientRect();
      if (elementPosition) {
        const newMinHeight: string =
          windowHeight - (elementPosition.top + 50) + "px"; //
        setMinHeight(newMinHeight);
      }
    };

    window.addEventListener("scroll", updateMinHeight);
    window.addEventListener("resize", updateMinHeight);
    updateMinHeight();

    return () => {
      window.removeEventListener("scroll", updateMinHeight);
      window.removeEventListener("resize", updateMinHeight);
      dispatch(resetDocDetail());
    };
  }, []);

  return (
    <Box
      sx={{
        paddingBottom: {
          sm: "0",
          xs: "160px",
        },
        width: {
          sm: "70%",
          xs: "100%",
        },
      }}
    >
      <div className={`${styles.content}} ${styles[theme]}`}>
        <Box
          sx={{
            position: "relative",
            bgcolor: isDarkMode ? "#191919" : "white",
            padding: {
              sm: "32px 40px",
              xs: "12px",
            },
            minHeight: minHeight,
          }}
          id="is-edit-text"
          className={` ${styles.page_content} ${
            pageInfo?.pageSettings?.fullWidth ? "" : styles.full_width
          }
          ${pageInfo?.pageSettings?.smallText ? styles.small_text : ""}
          ${styles[pageInfo?.pageSettings?.font!]}
          `}
        >
          {openComment && (
            <LayoutSlider heightToolbar={minHeight}>
              <DrawComment />
            </LayoutSlider>
          )}
          {openSlider && (
            <LayoutSlider heightToolbar={minHeight}>
              <DrawSlider setOpenSlider={setOpenSlider}></DrawSlider>
            </LayoutSlider>
          )}
          <form className={`${styles.form_title}`}>
            <input
              id="title"
              type="text"
              defaultValue={description}
              placeholder="Enter document title..."
              onChange={(e) => handleTitleChange(e.target.value)}
              maxLength={36}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div className={`${styles.editor}`}>
            <Tiptap editor={editor} />
          </div>
        </Box>
      </div>
      <ChangeCover
        open={openChangeCover}
        onClose={() => setOpenChangeCover(false)}
      />
    </Box>
  );
};

export default PageBody;
