"use client";

import {
  ForwardedRef,
  forwardRef,
  memo,
  useMemo,
  useRef,
  useState,
} from "react";
import Editor from "components/Editor";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, NS_SALES } from "constant/index";
import { Stack } from "@mui/material";
import { Button } from "components/shared";
import { useSnackbar } from "store/app/selectors";
import { UnprivilegedEditor } from "react-quill";
import {
  useSaleDetail,
  useSalesComment,
  useSalesTodo,
} from "store/sales/selectors";
import SalesDetail from "components/sn-sales-detail/SaleDetail";
import { CommentData, DealData } from "store/sales/actions";
import { Endpoint, client } from "api";
import { getMessageErrorByAPI } from "utils/index";
import { useFormContext } from "react-hook-form";
import moment from "moment";
import { SaleState, Sales } from "store/sales/reducer";

const CommentEditor = forwardRef(
  (_, ref: ForwardedRef<HTMLDivElement | null>) => {
    const commonT = useTranslations(NS_COMMON);
    const salesT = useTranslations(NS_SALES);
    const { onAddSnackbar } = useSnackbar();

    const editorRef = useRef<UnprivilegedEditor | undefined>();
    const { control, setValue } = useFormContext();
    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);

    const onChange = (value: string, delta, _, editor: UnprivilegedEditor) => {
      const isEmpty = value === VALUE_AS_EMPTY;
      setContent(isEmpty ? "" : value);
      editorRef.current = editor;
    };
    const onChangeFiles = (files: File[]) => {
      setFiles(files);
    };

    const { saleDetail } = useSaleDetail();
    const { onCreateComment } = useSalesComment();

    const disabled = useMemo(
      () =>
        (!content?.trim()?.length ||
          !editorRef.current?.getText()?.trim()?.length) &&
        !files.length,
      [content, files.length],
    );

    const onSubmit = async () => {
      //   if (!taskListId || !taskId) return;
      try {
        const data = {
          deal_id: saleDetail?.id || "",
          content: editorRef.current?.getHTML() ?? content,
        } as CommentData;
        if (files.length) {
          data.attachment = [];
          const promises = files.map((file) => {
            return client.upload(Endpoint.UPLOAD_LINK, file);
          });
          const results = await Promise.allSettled(promises);
          results.forEach((result) => {
            if (result.status === "fulfilled" && result.value) {
              (data.attachment as string[]).push(result.value);
            }
          });
        }
        const newData = await onCreateComment(data);
        if (newData) {
          //   onGetTaskList(taskListId);
          const newComments: Sales["comments"] = newData.deal_update.comments;
          newComments.sort((a, b) =>
            moment(b.created_time).isAfter(a.created_time) ? 1 : -1,
          );
          console.log("newComments", newComments);
          setValue("comments", newComments);
          setContent("");
          setFiles([]);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((ref as any)?.current as HTMLDivElement)?.scrollIntoView();
        }
      } catch (error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      }
    };

    return (
      <Editor
        hasAttachment
        placeholder={salesT("detail.comment.placeholder")}
        onChange={onChange}
        onChangeFiles={onChangeFiles}
        value={content}
        files={files}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button
            disabled={disabled}
            onClick={onSubmit}
            variant="primary"
            size="small"
          >
            {salesT("detail.comment.submit")}
          </Button>
        </Stack>
      </Editor>
    );
  },
);

CommentEditor.displayName = "CommentEditor";

export default memo(CommentEditor);

const VALUE_AS_EMPTY = "<p><br></p>";
