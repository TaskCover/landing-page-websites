/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Editor } from "@tiptap/core";
import React, {
  Fragment,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import IconBold from "../asset/iconsMenuTipTap/IconBold";
import IconItaic from "../asset/iconsMenuTipTap/IconItaic";
import IconLineText from "../asset/iconsMenuTipTap/IconLineText";
import IconLineTextCenter from "../asset/iconsMenuTipTap/IconLineTextCenter";
import IconLink from "../asset/iconsMenuTipTap/IconLink";
import IconLi from "../asset/iconsMenuTipTap/IconLi";
import IconCode from "../asset/iconsMenuTipTap/IconCode";
import IconComment from "../asset/iconsMenuTipTap/IconComment";
import { Box } from "@mui/material";
import styles from "../tiptap/menu/bubble-menu/nodeTypeDropDown.module.scss";
import toggleButtonStyles from "../tiptap/menu/bubble-menu/nodeTypeToggle.module.scss";

import Tippy from "@tippyjs/react";
import { ThemeContext } from "../context/ThemeContext";
import DownIcon from "../asset/icons/DownIcon";
import IconLi2 from "../asset/iconsMenuTipTap/IconLi2";

const MenuBarHeader = ({ editor }: { editor: Editor }) => {
  // const items = [
  //   {
  //     icon: "bold",
  //     title: "Bold",
  //     action: () => editor.chain().focus().toggleBold().run(),
  //     isActive: () => editor?.isActive("bold"),
  //   },
  //   {
  //     icon: "italic",
  //     title: "Italic",
  //     action: () => editor.chain().focus().toggleItalic().run(),
  //     isActive: () => editor?.isActive("italic"),
  //   },
  //   {
  //     icon: "strikethrough",
  //     title: "Strike",
  //     action: () => editor.chain().focus().toggleStrike().run(),
  //     isActive: () => editor?.isActive("strike"),
  //   },
  //   {
  //     icon: "code-view",
  //     title: "Code",
  //     action: () => editor.chain().focus().toggleCode().run(),
  //     isActive: () => editor?.isActive("code"),
  //   },
  //   {
  //     icon: "mark-pen-line",
  //     title: "Highlight",
  //     action: () => editor.chain().focus().toggleHighlight().run(),
  //     isActive: () => editor?.isActive("highlight"),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     icon: "h-1",
  //     title: "Heading 1",
  //     action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //     isActive: () => editor?.isActive("heading", { level: 1 }),
  //   },
  //   {
  //     icon: "h-2",
  //     title: "Heading 2",
  //     action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  //     isActive: () => editor?.isActive("heading", { level: 2 }),
  //   },
  //   {
  //     icon: "paragraph",
  //     title: "Paragraph",
  //     action: () => editor.chain().focus().setParagraph().run(),
  //     isActive: () => editor?.isActive("paragraph"),
  //   },
  //   {
  //     icon: "list-unordered",
  //     title: "Bullet List",
  //     action: () => editor.chain().focus().toggleBulletList().run(),
  //     isActive: () => editor?.isActive("bulletList"),
  //   },
  //   {
  //     icon: "list-ordered",
  //     title: "Ordered List",
  //     action: () => editor.chain().focus().toggleOrderedList().run(),
  //     isActive: () => editor?.isActive("orderedList"),
  //   },
  //   {
  //     icon: "list-check-2",
  //     title: "Task List",
  //     action: () => editor.chain().focus().toggleTaskList().run(),
  //     isActive: () => editor?.isActive("taskList"),
  //   },
  //   {
  //     icon: "code-box-line",
  //     title: "Code Block",
  //     action: () => editor.chain().focus().toggleCode().run(),
  //     isActive: () => editor?.isActive("codeBlock"),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     icon: "double-quotes-l",
  //     title: "Blockquote",
  //     action: () => editor.chain().focus().toggleBlockquote().run(),
  //     isActive: () => editor?.isActive("blockquote"),
  //   },
  //   {
  //     icon: "separator",
  //     title: "Horizontal Rule",
  //     action: () => editor.chain().focus().setHorizontalRule().run(),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     icon: "text-wrap",
  //     title: "Hard Break",
  //     action: () => editor.chain().focus().setHardBreak().run(),
  //   },
  //   {
  //     icon: "format-clear",
  //     title: "Clear Format",
  //     action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     icon: "arrow-go-back-line",
  //     title: "Undo",
  //     action: () => editor.chain().focus().undo().run(),
  //   },
  //   {
  //     icon: "arrow-go-forward-line",
  //     title: "Redo",
  //     action: () => editor.chain().focus().redo().run(),
  //   },
  // ];

  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        gap: {
          sm: "16px",
          xs: "8px",
        },
        background: "white",
        py: "3px",
        px: {
          sm: "16px",
          xs: "8px",
        },
        boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "4px",
        button: {
          bgcolor: "transparent",
          outline: "none",
          border: "none",
          cursor: "pointer",
          p: "4px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        "button.active": {
          bgcolor: "#E1F0FF",
        },
      }}
    >
      <Tippy
        appendTo={document.body}
        trigger="click"
        interactive
        animation="shift-toward-subtle"
        placement="bottom-start"
        content={
          <div className={`${styles.bubble_menu}  ${styles[theme]}`}>
            <div
              className={`${styles.bubble_dropdown_item}`}
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              <div className={`${styles.bubble_dropdown_button}`}>
                <div className={`${styles.info}`}>
                  <div></div>
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Text
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.bubble_dropdown_item}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <div className={`${styles.bubble_dropdown_button}`}>
                <div className={`${styles.info}`}>
                  <div></div>
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Heading 1
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.bubble_dropdown_item}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <div className={`${styles.bubble_dropdown_button}`}>
                <div className={`${styles.info}`}>
                  <div></div>
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Heading 2
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.bubble_dropdown_item}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <div className={`${styles.bubble_dropdown_button}`}>
                <div className={`${styles.info}`}>
                  <div></div>
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Heading 3
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div
          className={`${toggleButtonStyles.bubble_toggle_dropdown} ${toggleButtonStyles[theme]}`}
        >
          <span className="truncate">Text</span>
          <div className={`${toggleButtonStyles.icon}`}>
            <DownIcon />
          </div>
        </div>
      </Tippy>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <IconBold></IconBold>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <IconItaic></IconItaic>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "active" : ""}
      >
        <IconLineText></IconLineText>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <IconLineTextCenter></IconLineTextCenter>
      </button>
      <button
        onClick={() =>
          editor.isActive("link")
            ? setLink()
            : editor.chain().focus().unsetLink()
        }
        className={editor.isActive("link") ? "active" : ""}
      >
        <IconLink></IconLink>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <IconLi></IconLi>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <IconLi2></IconLi2>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <IconComment></IconComment>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <IconCode></IconCode>
      </button>
    </Box>
  );
};

export default MenuBarHeader;
