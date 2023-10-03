"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import { Editor } from "@tiptap/core";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import "./styles.css";
import { useAppSelector } from "store/hooks";
import { setPage } from "store/docs/reducer";

export const Tiptap = ({ editor }: { editor: any }) => {
  // const pageInfo = useAppSelector((state) => state.doc.pageInfo);
  // const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  // const openLinkModal = () => setIsAddingNewLink(true);
  // const dispatch = useDispatch();
  // const [pageContent, setPageContent] = useState<any>(null);

  // const logContent = useCallback(
  //   (e: Editor) => handleContentUpdate(e.getJSON()),
  //   [],
  // );

  // const handleContentUpdate = (content: any) => {
  //   setPageContent(content);
  // };

  // useEffect(() => {
  //   const savePageContent = debounce((content) => {
  //     if (pageInfo?.content !== content) {
  //       const pageData = {
  //         content,
  //         pageId: pageInfo?.id!,
  //       };
  //       dispatch(setPage(pageContent));
  //     }
  //   }, 2000);

  //   savePageContent(pageContent);

  //   return () => {
  //     savePageContent.cancel();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [handleContentUpdate]);

  // const editor = useEditor({
  //   extensions: getExtensions({ openLinkModal }),
  //   editorProps: {
  //     attributes: {
  //       class: `main-editor`,
  //       spellCheck: "false",
  //       suppressContentEditableWarning: "true",
  //     },
  //   },
  //   onUpdate: ({ editor: e }) => {
  //     logContent(e);
  //   },
  // });

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     editor?.setEditable(!pageInfo?.pageSettings?.lock!);
  //     editor?.commands.setContent(pageInfo?.content);
  //     setPageContent(pageInfo?.content);
  //   }, 0);

  //   return () => clearTimeout(timeoutId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageInfo]);

  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
