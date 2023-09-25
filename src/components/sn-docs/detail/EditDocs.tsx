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
  const [height, setHeight] = useState(58);
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
      setHeight(elementHeight || 58);
    }
  }, [titleRef?.current, title]);

  return (
    <Box
      sx={{
        width: {
          md: "70%",
          xs: "100%",
        },
        position: "relative",
        // Title
        ".edit-title .ql-toolbar": {
          display: "none",
        },
        ".edit-title .ql-container": {
          background: "white !important",
          border: "none",
          paddingLeft: {
            md: "32px",
            xs: "0",
          },
        },
        ".edit-title": {
          position: "absolute",
          width: "100%",
          top: "80px",
          zIndex: 1,
        },
        ".edit-title .ql-editor::before": {
          paddingLeft: {
            md: "32px",
            xs: "0",
          },
          fontSize: {
            md: "32px !important",
            xs: "24px !important",
          },
          fontWeight: 700,
        },
        ".edit-title .ql-editor": {
          fontSize: {
            md: "32px !important",
            xs: "24px !important",
          },
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
          marginTop: `${70 + (height - 58)}px`,
          background: "white !important",
          border: "none",
          paddingLeft: {
            md: "32px",
            xs: "0",
          },
        },
        ".edit-content .ql-editor::before": {
          paddingLeft: {
            md: "32px",
            xs: "0",
          },
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
