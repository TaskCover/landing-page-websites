"use client";
import ChangeCover from "../change-cover-panel";
import MenuBarHeader from "./MenuBarHeader";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./pageBody.module.scss";
import { debounce } from "lodash";
import { Editor } from "@tiptap/core";
import { getExtensions } from "../tiptap/extensions/starter-kit";
import { PageState, setPage } from "store/docs/reducer";
import { ThemeContext } from "../context/ThemeContext";
import { Tiptap } from "../tiptap/Tiptap";
import { useAppSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { useEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import { IDocDetail } from "components/sn-docs/detail/DocDetail";
import DrawComment, {
  LayoutSlider,
} from "components/sn-docs/detail/DrawCommet";
import DrawSlider from "components/sn-docs/detail/DrawSlider";
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
  const [title, setTitle] = useState<string>(pageInfo?.title!);
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const [pageContent, setPageContent] = useState<any>(null);
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const openLinkModal = () => setIsAddingNewLink(true);
  const { theme } = useContext(ThemeContext);
  const [minHeight, setMinHeight] = useState("100vh");

  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setTitle(pageInfo?.title!);
  }, [pageInfo?.title]);

  useEffect(() => {
    const saveVerticalPosition = debounce((verticalPosition: number) => {
      if (pageInfo?.coverPicture.verticalPosition !== verticalPosition) {
        const pageData = {
          pageId: pageInfo!.id,
          url: pageInfo?.coverPicture.url!,
          verticalPosition,
        };
        const updatedPage: PageState = {
          ...pageInfo!,
          coverPicture: {
            ...pageInfo!.coverPicture,
            verticalPosition: verticalPosition,
          },
        };
        dispatch(setPage(updatedPage));
      }
    }, 1000);

    if (verticalPosition !== 0) {
      localStorage.setItem("imagePosition", JSON.stringify(verticalPosition));
      saveVerticalPosition(verticalPosition);
    }

    return () => {
      saveVerticalPosition.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalPosition]);

  useEffect(() => {
    const savedPosition = localStorage.getItem("imagePosition");
    if (savedPosition) {
      setVerticalPosition(parseInt(JSON.parse(savedPosition)));
    }
  }, []);

  const handleContentUpdate = (content: any) => {
    setPageContent(content);
  };

  const logContent = useCallback(
    (e: Editor) => handleContentUpdate(e.getJSON()),
    [],
  );

  useEffect(() => {
    const savePageContent = debounce((content) => {
      if (pageInfo?.content !== content) {
        const pageData = {
          content,
          pageId: pageInfo?.id!,
        };
        dispatch(setPage(pageContent));
      }
    }, 2000);

    savePageContent(pageContent);

    return () => {
      savePageContent.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleContentUpdate]);

  const editor = useEditor({
    extensions: getExtensions({ openLinkModal }),
    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: ({ editor: e }) => {
      logContent(e);
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      editor?.setEditable(!pageInfo?.pageSettings?.lock!);
      editor?.commands.setContent(pageInfo?.content);
      setPageContent(pageInfo?.content);
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight: number = window.innerHeight; // Chiều cao của viewport
      const elementPosition: DOMRect | undefined = document
        .getElementById("is-edit-text")
        ?.getBoundingClientRect(); // Vị trí của phần tử trong viewport
      if (elementPosition) {
        const newMinHeight: string =
          windowHeight - (elementPosition.top + 50) + "px"; // Tính toán giá trị mới cho minHeight
        setMinHeight(newMinHeight);
      }
    };

    window.addEventListener("scroll", updateMinHeight);
    window.addEventListener("resize", updateMinHeight);

    // Đảm bảo cập nhật ban đầu khi trang được tải
    updateMinHeight();

    // Clean up listeners khi component unmount
    return () => {
      window.removeEventListener("scroll", updateMinHeight);
      window.removeEventListener("resize", updateMinHeight);
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
        {editor && <MenuBarHeader editor={editor as Editor} />}
        <Box
          sx={{
            position: "relative",
            background: "white",
            marginTop: "16px",
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
              value={title}
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
