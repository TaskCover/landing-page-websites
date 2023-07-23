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
import { FILE_ACCEPT, IMAGES_ACCEPT } from "constant/index";
import AttachmentPreview from "components/AttachmentPreview";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ImageImportIcon from "icons/ImageImportIcon";
import UploadFileIcon from "icons/UploadFileIcon";
import ChatEmoji, { Emoji } from "./ChatEmoji";

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

const ACCEPT_MEDIA = [...IMAGES_ACCEPT, "video/mp4"];
const TOOLBAR = [
  ["bold", "italic", "underline", "strike"],
  ["link", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
];

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
  const inputMediaRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const urlFiles = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  const onChangeFile = (
    event: ChangeEvent<HTMLInputElement>,
    type: string[],
  ) => {
    if (!event.target.files?.length) return;
    let newFiles = Array.from(event.target.files);

    newFiles = newFiles.reduce(
      (out: File[], file) => {
        if (type?.includes(file.type)) {
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
    strict: true,
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
      quill?.root.focus();
      if (event.key === "Enter" && !event.shiftKey) {
        onEnterText?.(quill?.root.innerHTML || "");
        quill?.setText("");
        setValue("");
      }
    },
    [onEnterText, quill],
  );

  const handleChaneEmoji = (emoji: Emoji) => {
    const newText = `${value}${emoji.native}`;
    quill?.insertText(quill?.getLength() - 1, newText);
    quill?.root.focus();
  };

  useEffect(() => {
    quill?.focus();
    quillRefCurr?.addEventListener("keydown", handleKeyDown);
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
          "& .ql-editor": {
            paddingRight: "7rem",
          },
          "& .ql-blank::before": {
            color: "#BABCC6",
          },
        },
      }}
    >
      {isLoading ? "loading..." : null}
      <Box position="relative">
        <Box
          component={"span"}
          ref={quillRef}
          sx={{
            color: "black",
            flexDirection: "column",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: "1rem",
            bottom: "0.7rem",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
          }}
        >
          <ChatEmoji onChange={handleChaneEmoji} />
          <ImageImportIcon
            sx={{
              fill: "transparent",
              cursor: "pointer",
            }}
            onClick={() => {
              inputMediaRef?.current?.click();
            }}
          />
          <UploadFileIcon
            sx={{
              fill: "transparent",
              cursor: "pointer",
            }}
            onClick={() => {
              inputFileRef?.current?.click();
            }}
          />
        </Box>
      </Box>
      <Stack
        direction="row"
        flex={1}
        flexWrap="nowrap"
        overflow="auto"
        display={urlFiles?.length > 0 ? "flex" : "none"}
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
        accept={ACCEPT_MEDIA.join(",")}
        display="none"
        ref={inputMediaRef}
        onChange={(e) => onChangeFile(e, ACCEPT_MEDIA)}
      />
      <Box
        multiple
        component="input"
        type="file"
        accept={FILE_ACCEPT.join(",")}
        display="none"
        ref={inputFileRef}
        onChange={(e) => onChangeFile(e, FILE_ACCEPT)}
      />
      {children}
    </Stack>
  );
};

export default ChatEditor;
