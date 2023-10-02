"use client";
import styles from "./pageBody.module.scss";
import ChangeCover from "../change-cover-panel";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { PageState, setPage } from "store/docs/reducer";
import { Tiptap } from "../tiptap/Tiptap";
import { useAppSelector } from "store/hooks";
import { useDispatch } from "react-redux";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const PageBody = () => {
  const pageInfo = useAppSelector((state) => state.doc.pageInfo);
  const [emojiCode, setEmojiCode] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(pageInfo?.title!);
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [openChangeCover, setOpenChangeCover] = useState<boolean>(false);
  const dispatch = useDispatch();

  const alo = useAppSelector((state) => state.doc.pageInfo);
  console.log("🚀 ~ file: PageBody.tsx:23 ~ PageBody ~ alo:", alo);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setEmojiCode(null);
  }, [emojiCode]);

  useEffect(() => {
    setTitle(pageInfo?.title!);
  }, [pageInfo?.title]);

  useEffect(() => {
    const saveVerticalPosition = debounce((verticalPosition: number) => {
      if (pageInfo?.coverPicture.verticalPosition !== verticalPosition) {
        const pageData = {
          pageId: pageInfo!.id,
          url: pageInfo?.coverPicture.url!,
          verticalPosition,
        };
        const updatedPage: PageState = {
          ...pageInfo!,
          coverPicture: {
            ...pageInfo!.coverPicture,
            verticalPosition: verticalPosition,
          },
        };
        dispatch(setPage(updatedPage));
      }
    }, 5000);

    if (verticalPosition !== 0) {
      localStorage.setItem("imagePosition", JSON.stringify(verticalPosition));
      saveVerticalPosition(verticalPosition);
    }

    return () => {
      saveVerticalPosition.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalPosition]);

  useEffect(() => {
    const savedPosition = localStorage.getItem("imagePosition");
    if (savedPosition) {
      setVerticalPosition(parseInt(JSON.parse(savedPosition)));
    }
  }, []);

  return (
    <>
      <div className={`${styles.content}}`}>
        <div
          className={`${styles.page_content} ${
            pageInfo?.pageSettings?.fullWidth ? "" : styles.full_width
          }
          ${pageInfo?.pageSettings?.smallText ? styles.small_text : ""}
          ${styles[pageInfo?.pageSettings?.font!]}
          `}
        >
          <form className={`${styles.form_title}`}>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Untitled"
              onChange={handleTitleChange}
              maxLength={36}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div className={`${styles.editor}`}>
            <Tiptap />
          </div>
        </div>
      </div>
      <ChangeCover
        open={openChangeCover}
        onClose={() => setOpenChangeCover(false)}
      />
    </>
  );
};

export default PageBody;
