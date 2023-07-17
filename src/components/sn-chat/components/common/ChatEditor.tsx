"use client";

import { Box, Stack } from "@mui/material";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";
import { IMAGES_ACCEPT } from "constant/index";
import AttachmentPreview from "components/AttachmentPreview";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export type EditorProps = {
  hasAttachment?: boolean;
  children?: React.ReactNode;
  files?: File[];
  noCss?: boolean;
  isLoading: boolean;
  initalValue: string;
  onChangeFiles?: (files: File[]) => void;
  onEnterText?: (text: string) => void;
};

const ChatEditor = (props: EditorProps) => {
  const {
    hasAttachment,
    onChangeFiles,
    onEnterText,
    children,
    files = [],
    noCss,
    initalValue,
    isLoading,
    ...rest
  } = props;

  const [value, setValue] = useState(initalValue);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const urlFiles = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    let newFiles = Array.from(event.target.files);

    newFiles = newFiles.reduce(
      (out: File[], file) => {
        if (ACCEPTS.includes(file.type)) {
          out.push(file);
        }
        return out;
      },
      [...files],
    );
    onChangeFiles && onChangeFiles(newFiles);
  };

  const onRemove = (index: number) => {
    return () => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      onChangeFiles && onChangeFiles(newFiles);
    };
  };

  const toolbarAttachment = useMemo(
    () => ({
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["attachment"],
      ],
      handlers: {
        attachment: () => {
          inputFileRef?.current?.click();
        },
      },
    }),
    [],
  );

  const toolbar = useMemo(
    () => (hasAttachment ? toolbarAttachment : TOOLBAR),
    [hasAttachment, toolbarAttachment],
  );

  const { quill, quillRef } = useQuill({
    strict: false,
    modules: {
      toolbar,
      keyboard: {
        bindings: {
          shift_enter: {
            key: 13,
            handler: function (range, context) {
              quill?.insertText(range.index, "\n");
            },
          },
        },
      },
    },
    placeholder: "Type Message...",
  });

  const quillRefCurr = quillRef.current;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        onEnterText?.(value);
        quill?.setText("");
        setValue("");
      }
    },
    [onEnterText, quill, value],
  );

  useEffect(() => {
    quillRefCurr?.addEventListener("keydown", handleKeyDown);
    quill?.on("text-change", function (delta, oldDelta, source) {
      setValue(quill.getText());
    });
    return () => {
      quillRefCurr?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, quill, quillRefCurr]);

  useEffect(() => {
    if (initalValue) {
      quill?.setText(initalValue);
    }
  }, [initalValue, quill]);

  return (
    <Stack
      className="editor"
      sx={{
        "& .ql-snow": {
          border: "unset !important",
          borderTop: "1px solid #ECECF3!important",
          borderRadius: "unset !important",
        },
        "& .ql-container": {
          "& .ql-blank::before": {
            color: "#BABCC6",
          },
        },
      }}
    >
      {isLoading ? "loading..." : null}
      <Box
        ref={quillRef}
        sx={{
          color: "black",
          flexDirection: "column",
        }}
      />
      <Stack
        direction="row"
        flex={1}
        flexWrap="wrap"
        display={urlFiles?.length > 0 ? "block" : "none"}
        p={noCss ? 0 : 1}
        sx={
          noCss
            ? {}
            : {
                border: "1px solid",
                borderColor: "grey.A200",
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                borderTop: "none",
              }
        }
      >
        {urlFiles.map((attachment, index) => (
          <AttachmentPreview
            key={attachment}
            src={attachment}
            name={files[index].name}
            onRemove={onRemove(index)}
          />
        ))}
      </Stack>
      <Box
        multiple
        component="input"
        type="file"
        accept={ACCEPTS.join(",")}
        display="none"
        ref={inputFileRef}
        onChange={onChangeFile}
      />
      {children}
    </Stack>
  );
};

export default ChatEditor;

const ACCEPTS = [...IMAGES_ACCEPT, "video/mp4"];

const TOOLBAR = [
  ["bold", "italic", "underline", "strike"],
  ["link", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
];
