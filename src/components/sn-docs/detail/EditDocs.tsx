"use client";
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS } from "components/Editor";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { Box } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const EditDocs = () => {
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(69);
  const [content, setContent] = useState("");
  const titleRef: any = useRef(null);
  const contentRef: any = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        // [{ indent: "-1" }, { indent: "+1" }],
        [
          { color: [] },
          { background: ["transparent", ...COLORS] },
          // { script: "sub" },
          // { script: "super" },
          "attachment",
          "link",
          "image",
          "video",
          "clean",
        ],
      ],
    }),
    [],
  );

  useEffect(() => {
    if (titleRef.current) {
      // Lấy chiều cao của phần tử tham chiếu và cập nhật state
      const elementHeight = titleRef.current.offsetHeight;
      setHeight(elementHeight || 69);
    }
  }, [titleRef?.current]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        // Title
        ".edit-title .ql-toolbar": {
          display: "none",
        },
        ".edit-title .ql-container": {
          background: "white !important",
          border: "none",
          paddingLeft: "32px",
        },
        ".edit-title": {
          position: "absolute",
          width: "100%",
          top: "80px",
          zIndex: 1,
        },
        ".edit-title .ql-editor::before": {
          paddingLeft: "32px",
          fontSize: "32px !important",
          fontWeight: 700,
        },
        ".edit-title .ql-editor": {
          fontSize: "32px !important",
          fontWeight: 700,
        },

        // content
        ".edit-content .ql-toolbar": {
          border: "none !important",
          borderRadius: "6px !important",
          borderBottom: "1px solid var(--Gray1, #ECECF3) !important",
          boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
        },
        ".edit-content .ql-container": {
          marginTop: `${70 + (height - 69)}px`,
          background: "white !important",
          border: "none",
          padding: "32px",
        },
        ".edit-content .ql-editor::before": {
          paddingLeft: "32px",
        },
      }}
      className="entry-content"
    >
      <div ref={titleRef} className="edit-title">
        <ReactQuill
          theme="snow"
          placeholder="Enter document title..."
          value={title}
          onChange={setTitle}
        ></ReactQuill>
      </div>
      <ReactQuill
        placeholder="Enter document content..."
        modules={modules}
        className="edit-content"
        theme="snow"
        ref={contentRef}
        value={content}
        onChange={setContent}
      ></ReactQuill>
    </Box>
  );
};

export default memo(EditDocs);
