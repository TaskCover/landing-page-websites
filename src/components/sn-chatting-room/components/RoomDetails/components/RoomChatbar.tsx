"use client";

import { Box, Stack } from "@mui/material";
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react";
import "react-quill/dist/quill.snow.css";
import { ACCEPT_MEDIA, FILE_ACCEPT } from "constant/index";
import AttachmentPreview from "components/AttachmentPreview";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ImageImportIcon from "icons/ImageImportIcon";
import UploadFileIcon from "icons/UploadFileIcon";
import ChatEmoji, { Emoji } from "components/sn-chat/components/chat/ChatEmoji";
import hljs from "highlight.js";

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
    ["bold", "italic", "underline", "strike"],
    ["link", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
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

const RoomChatBar = (props: EditorProps) => {
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

    const inputMediaRef = useRef<HTMLInputElement | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const urlFiles = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files],
    );
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
            syntax: {
                highlight: (text) => hljs.highlightAuto(text).value,
            },
            toolbar,
            keyboard: {
                bindings: {
                    shift_enter: {
                        key: 13,
                        shiftKey: true,
                        handler: function (range, context) {
                            // quill?.insertText(range.index - 1, "\n");
                            return true;
                        },
                    },
                },
            },
        },
        placeholder: "Type Message...",
        formats: [
            "bold",
            "italic",
            "underline",
            "strike",
            "link",
            "code-block",
            "list",
            "ordered",
            "bullet",
        ],
    });
    const quillRefCurr = quillRef.current;

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
        },
        [files, onChangeFiles],
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

    const handleKeyDown = useCallback(
        (event) => {
            const listText = quill?.getContents().ops || [];
            const lastText = listText[listText.length - 1];
            const lastUpdate = {
                ...lastText,
                insert: lastText.insert.trim() + "\n",
            };
            if (event.key === "Enter" && !event.shiftKey) {
                listText.splice(listText.length - 1, 1, lastUpdate);
                quill?.setContents({ ...quill?.getContents(), ops: listText });
                const text = quill?.getText().trim() ? quill.root.innerHTML : "";
                onEnterText?.(text);
                quill?.setText("");
            }
        },
        [onEnterText, quill],
    );

    const handleChaneEmoji = useCallback(
        (emoji: Emoji) => {
            const newText = `${emoji.native}`;
            quill?.insertText(quill?.getLength() - 1, newText);
            quill?.root.focus();
        },
        [quill],
    );

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
                    position: "unset!important",
                    maxHeight: "150px",
                    display: "block",
                    "& .ql-editor": {
                        paddingRight: "7rem",
                    },
                    "& .ql-blank::before": {
                        color: "#BABCC6",
                    },
                    "& .ql-tooltip": {
                        right: "0",
                        zIndex: 100,
                        left: "0!important",
                        width: "fit-content",
                    },
                },
            }}
        >
            {isLoading ? "loading..." : null}
            <Box position="relative">
                <Box
                    component={"div"}
                    ref={quillRef}
                    sx={{
                        color: "black !important",
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

export default RoomChatBar;
