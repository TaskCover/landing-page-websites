"use client";
import ChangeCover from "../change-cover-panel";
import DrawSlider from "components/sn-docs/detail/DrawSlider";
import React, { useContext, useEffect, useState } from "react";
import styles from "./pageBody.module.scss";
import useTheme from "hooks/useTheme";
import { Box } from "@mui/material";
import { getExtensions } from "../tiptap/extensions/starter-kit";
import { IDocDetail } from "components/sn-docs/detail/DocDetail";
import { ThemeContext } from "../context/ThemeContext";
import { Tiptap } from "../tiptap/Tiptap";
import { useAppSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { useDocs } from "store/docs/selectors";
import { useEditor } from "@tiptap/react";
/* eslint-disable no-var */
import {
  changeContentDoc,
  changeDescription,
  resetDocDetail,
} from "store/docs/reducer";
import DrawComment, {
  LayoutSlider,
} from "components/sn-docs/detail/DrawCommet";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const PageBody = ({
  openComment,
  openSlider,
  setOpenComment,
  setOpenSlider,
}: IDocDetail) => {
  const pageInfo = useAppSelector((state) => state.doc.pageInfo);
  const {
    content,
    id,
    title: name,
    description,
    project_id,
  } = useAppSelector((state) => state.doc);
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);
  const { theme } = useContext(ThemeContext);
  const [minHeight, setMinHeight] = useState("100vh");
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const { handleUpdateDoc } = useDocs();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeDescription(e.target.value));
  };

  const handleContentUpdate = (content: any) => {
    dispatch(changeContentDoc(content));
  };

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

  const editor = useEditor({
    content: content,
    extensions: getExtensions({ openLinkModal }),
    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: ({ editor }) => {
      handleContentUpdate(editor.getHTML());
    },
  });

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
              <DrawComment setOpenComment={setOpenComment}></DrawComment>
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
              value={description}
              placeholder="Enter document title..."
              onChange={handleTitleChange}
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
