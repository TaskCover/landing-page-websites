"use client";

import { Box, InputBase, Stack } from "@mui/material";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";
import {
  ACCEPT_MEDIA,
  FILE_ACCEPT,
  NS_CHAT_BOX,
  NS_COMMON,
} from "constant/index";
import AttachmentPreview from "components/AttachmentPreview";
import "quill/dist/quill.snow.css";
import ImageImportIcon from "icons/ImageImportIcon";
import UploadFileIcon from "icons/UploadFileIcon";
import ChatEmoji, { Emoji } from "./ChatEmoji";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import { useChat } from "store/chat/selectors";
import { useTranslations } from "next-intl";
import useTheme from "hooks/useTheme";
import SendMesIcon from "icons/SendMesIcon";
import { Input } from "components/shared";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false },
);

hljs.configure({
  // optionally configure hljs
  languages: [
    "javascript",
    "php",
    "go",
    "typescript",
    "css",
    "xml",
    "yaml",
    "swift",
    "sql",
    "shell",
    "scss",
    "scala",
    "rust",
    "ruby",
    "python",
    "perl",
    "nginx",
    "markdown",
    "less",
    "kotlin",
    "cpp",
    "csharp",
    "c",
    "bash",
  ],
});

const ACCEPT_ALL = [...FILE_ACCEPT, ...ACCEPT_MEDIA];
const TOOLBAR = [
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  { list: "bullet" },
  { list: "ordered" },
  "clean",
];

export type EditorProps = {
  hasAttachment?: boolean;
  children?: React.ReactNode;
  files?: File[];
  noCss?: boolean;
  isLoading: boolean;
  initalValue: string | undefined;
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
  } = props;
  const { onGetUnReadMessages, dataTransfer } = useChat();
  const commonChatBox = useTranslations(NS_CHAT_BOX);

  const { isDarkMode } = useTheme();

  const quillRef = useRef<ReactQuill>(null);
  const inputMediaRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const urlFiles = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );
  const toolbarAttachment = useMemo(
    () => ({
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["link"],
        [{ list: "bullet" }, { list: "ordered" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["attachment"],
        ["link", "image", "video"],
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

  const quillEditor = quillRef.current?.getEditor();

  const onChangeFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>, type: string[]) => {
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
      if (inputMediaRef.current) {
        inputMediaRef.current.value = "";
      }
      quillEditor?.focus();
    },
    [files, onChangeFiles, quillEditor],
  );

  const onRemove = useCallback(
    (index: number) => {
      return () => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        onChangeFiles && onChangeFiles(newFiles);
      };
    },
    [files, onChangeFiles],
  );

  const handleMessage = useCallback(() => {
    const parser = new DOMParser();
    const html = parser.parseFromString(
      quillEditor?.root.innerHTML || "",
      "text/html",
    );
    const body = html.body;
    const arrIndexRemove: number[] = [];
    for (let i = body.children.length - 1; i > -1; i--) {
      const element = body.children[i] as HTMLElement;
      if (element.tagName === "P" && element.innerText.trim() === "") {
        arrIndexRemove.push(i);
      } else {
        break;
      }
    }

    for (const i of arrIndexRemove) {
      body.children[i]?.remove();
    }

    onEnterText?.(body.innerHTML);
    quillEditor?.deleteText(0, quillEditor?.getLength());
    setValue("");
  }, [onEnterText, quillEditor]);

  const getUnReadMessage = useCallback(async () => {
    await onGetUnReadMessages({
      type: dataTransfer?.t ?? "d",
    });
  }, [dataTransfer?.t, onGetUnReadMessages]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        getUnReadMessage();
        handleMessage();
      }
    },
    [handleMessage],
  );

  const handleChaneEmoji = useCallback(
    (emoji: Emoji) => {
      quillEditor?.focus();
      const selection = quillEditor?.getSelection();
      const newText = `${emoji.native}`;
      let i = 1;
      if (selection?.index === undefined || selection?.index === 0) {
        i = 0;
      } else {
        i = selection?.index;
      }
      quillEditor?.insertText(i, newText);
    },
    [quillEditor],
  );

  useEffect(() => {
    quillEditor?.focus();
    if (initalValue) {
      setValue(initalValue);
    }
  }, [initalValue, quillEditor]);

  const modules = useMemo(() => {
    return {
      toolbar,
      syntax: {
        highlight: (text) => {
          return hljs.highlightAuto(text).value;
        },
      },
      keyboard: {
        bindings: {
          enter: {
            key: 13,
            handler: function (range, context) {
              return false;
            },
          },
          shift_enter: {
            key: 13,
            shiftKey: true,
            handler: function (range, context) {
              return true;
            },
          },
        },
      },
    };
  }, [toolbar]);

  useEffect(() => {
    setValue("");
  }, [dataTransfer]);

  return (
    <Stack
      // direction={isChatDesktop ? "column-reverse" : "column"}
      className="editor"
      sx={{
        "& .quill": {
          flexDirection: "column",
          padding: "16px",
          maxHeight: "200px",
        },
        "& .ql-snow": {
          border: "unset !important",
          borderTop: "1px solid #ECECF3!important",
          borderRadius: "unset !important",
          width: "100%!important",
        },
        "& .ql-container": {
          position: "unset!important",
          display: "block",
          "& .ql-editor": {
            padding: "2px 24px 2px 8px",

            backgroundColor: "#E1F0FF",
            width: "296px!important",
            height: "40px!important",
            borderRadius: "100px !important",

            "&.ql-blank::before": {
              color: "#999",
              padding: "2px 24px 2px 8px",
              alignItems: "center",
              display: "flex",
              width: "296px!important",
              height: "40px!important",
            },
            "& p": {
              alignItems: "center",
              display: "flex",
              height: "100%",
              marginRight: "16px",
            },
          },
          "& .ql-tooltip": {
            right: "0",
            zIndex: 100,
            left: "0!important",
            width: "fit-content",
          },
        },
        "& .ql-formats": {
          marginRight: "15px",
          display: "flex",
          gap: "16px",
          justifyContent: "center",
        },
      }}
    >
      {isLoading ? "loading..." : null}
      <Box position="relative">
        <Box className="text-editor">
          <QuillNoSSRWrapper
            forwardedRef={quillRef}
            theme="snow"
            modules={modules}
            placeholder={commonChatBox("chatBox.typeMessage")}
            formats={[
              "bold",
              "italic",
              "underline",
              "strike",
              "link",
              "bullet",
              "ordered",
              "list",
              "link",
              "image",
              "video",
            ]}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "1rem",
            bottom: "32px",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
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
          {/* <SendMesIcon
            sx={{
              fill: "transparent",
              cursor: "pointer",
            }}
            onClick={handleMessage}
          /> */}
        </Box>
      </Box>
      <Stack
        direction="row"
        flex={1}
        flexWrap="nowrap"
        overflow="auto"
        p={noCss ? 0 : 1}
        display={urlFiles?.length > 0 ? "flex" : "none"}
        sx={
          noCss
            ? {}
            : {
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
        onChange={(e) => onChangeFile(e, ACCEPT_ALL)}
      />
      <Box
        multiple
        component="input"
        type="file"
        accept={FILE_ACCEPT.join(",")}
        display="none"
        ref={inputFileRef}
        onChange={(e) => onChangeFile(e, ACCEPT_ALL)}
      />
      {children}
    </Stack>
  );
};

export default ChatEditor;
