"use client";
/* eslint-disable react/display-name */
import { BubbleMenu, Editor } from "@tiptap/react";
import { generalButtons } from "./buttons";
import styles from "./bubbleMenu.module.scss";
import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import MenuBarHeader, {
  MenuBarHeaderEdit,
} from "components/sn-docs/news/page-body/MenuBarHeader";

export const CustomBubbleMenu = ({ editor }) => {
  const { theme } = useContext(ThemeContext);

  const memoizedButtons = useMemo(() => {
    return generalButtons.map((btn) => (
      <div
        className={`${styles.bubble_menu_button}`}
        onClick={() => btn.action(editor)}
        key={btn.tooltip}
      >
        <div className={`${styles[btn.iconDetail[1]]}`}>
          {btn.iconDetail[0]}
        </div>
      </div>
    ));
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      className={`${styles.bubble_menu} ${styles[theme]}`}
      tippyOptions={{
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
    >
      <MenuBarHeaderEdit editor={editor}></MenuBarHeaderEdit>
    </BubbleMenu>
  );
};
