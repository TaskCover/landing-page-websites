"use client";
import DownIcon from "../asset/icons/DownIcon";
import IconBold from "../asset/iconsMenuTipTap/IconBold";
import IconCode from "../asset/iconsMenuTipTap/IconCode";
import IconComment from "../asset/iconsMenuTipTap/IconComment";
import IconItaic from "../asset/iconsMenuTipTap/IconItaic";
import IconLi from "../asset/iconsMenuTipTap/IconLi";
import IconLi2 from "../asset/iconsMenuTipTap/IconLi2";
import IconLineText from "../asset/iconsMenuTipTap/IconLineText";
import IconLineTextCenter from "../asset/iconsMenuTipTap/IconLineTextCenter";
import IconLink from "../asset/iconsMenuTipTap/IconLink";
import styles from "../tiptap/menu/bubble-menu/nodeTypeDropDown.module.scss";
import Tippy from "@tippyjs/react";
import toggleButtonStyles from "../tiptap/menu/bubble-menu/nodeTypeToggle.module.scss";
import { Box } from "@mui/material";
import { Editor } from "@tiptap/core";
import { ThemeContext } from "../context/ThemeContext";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text } from "components/shared";

const MenuBarHeader = ({ editor }: { editor: Editor }) => {
  const { theme } = useContext(ThemeContext);

  const isOnlyParagraph =
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList") &&
    !editor.isActive("heading");
  const h1 = editor.isActive("heading", { level: 1 });
  const h2 = editor.isActive("heading", { level: 2 });
  const h3 = editor.isActive("heading", { level: 3 });

  const text = useMemo(() => {
    if (isOnlyParagraph) {
      return "Normal";
    }
    if (h1) {
      return "Heading 1";
    }
    if (h2) {
      return "Heading 2";
    }
    if (h3) {
      return "Heading 3";
    }
  }, [isOnlyParagraph, h1, h2, h3]);

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <Box
      sx={{
        position: {
          sm: "sticky",
          xs: "fixed",
        },
        top: {
          sm: "16px",
          xs: "unset",
        },
        bottom: {
          sm: "unset",
          xs: "16px",
        },
        left: {
          sm: "unset",
          xs: "16px",
        },
        right: {
          sm: "unset",
          xs: "16px",
        },
        flexWrap: "wrap",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "white",
        zIndex: "10",
        rowGap: {
          sm: "16px",
          xs: "6px",
        },
        columnGap: {
          sm: "6px",
          xs: "2px",
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
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Normal
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
          <Text>{text}</Text>
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
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <IconLineTextCenter></IconLineTextCenter>
      </button>
      <button
        value="link"
        aria-label="link"
        onClick={() =>
          editor.isActive("link")
            ? editor.chain().focus().unsetLink().run()
            : setLink()
        }
        className={editor.isActive("link") ? "active" : ""}
      >
        <IconLink></IconLink>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        <IconLi></IconLi>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        <IconLi2></IconLi2>
      </button>
      <button>
        <IconComment></IconComment>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "active" : ""}
      >
        <IconCode></IconCode>
      </button>
    </Box>
  );
};
export const MenuBarHeaderEdit = ({ editor }: { editor: Editor }) => {
  const { theme } = useContext(ThemeContext);

  const isOnlyParagraph =
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList") &&
    !editor.isActive("heading");
  const h1 = editor.isActive("heading", { level: 1 });
  const h2 = editor.isActive("heading", { level: 2 });
  const h3 = editor.isActive("heading", { level: 3 });

  const text = useMemo(() => {
    if (isOnlyParagraph) {
      return "Normal";
    }
    if (h1) {
      return "Heading 1";
    }
    if (h2) {
      return "Heading 2";
    }
    if (h3) {
      return "Heading 3";
    }
  }, [isOnlyParagraph, h1, h2, h3]);

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "white",
        zIndex: "10",
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
                  <span className={`${styles.bubble_dropdown_button_label}`}>
                    Normal
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
          <Text>{text}</Text>
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
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <IconLineTextCenter></IconLineTextCenter>
      </button>
      <button
        value="link"
        aria-label="link"
        onClick={() =>
          editor.isActive("link")
            ? editor.chain().focus().unsetLink().run()
            : setLink()
        }
        className={editor.isActive("link") ? "active" : ""}
      >
        <IconLink></IconLink>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        <IconLi></IconLi>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        <IconLi2></IconLi2>
      </button>
      <button>
        <IconComment></IconComment>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "active" : ""}
      >
        <IconCode></IconCode>
      </button>
    </Box>
  );
};

export default MenuBarHeader;
