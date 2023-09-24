"use client";

import { COLORS } from "components/Editor";
import React, { memo, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { Box, Stack } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const EditDocs = () => {
  const [content, setContent] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: ["transparent", ...COLORS] }], // dropdown with defaults from theme
        ["attachment"],
        ["link", "image"],
        ["clean"],
      ],
    }),
    [],
  );

  return (
    <Box
      sx={{
        width: "100%",
      }}
      className="entry-content"
    >
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </Box>
  );
};

export default memo(EditDocs);
