"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EditorContent } from "@tiptap/react";
import CustomBubbleMenu from "./menu/bubble-menu";
import "./styles.css";
import EditorStyled from "./style";

export const Tiptap = ({ editor }: { editor: any }) => {
  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
