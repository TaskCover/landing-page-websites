"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Editor, EditorContent } from "@tiptap/react";
import CustomBubbleMenu from "./menu/bubble-menu";
import "./styles.css";
import { useRef } from "react";

export const Tiptap = ({ editor }: { editor: Editor }) => {
  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
