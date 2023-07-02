"use client";

import { ForwardedRef, forwardRef, memo, useState } from "react";
import Editor from "components/Editor";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { Stack } from "@mui/material";
import { Button } from "components/shared";
import { Endpoint, client } from "api";
import { useTaskDetail } from "store/project/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import { CommentTaskData } from "store/project/actions";

const CommentEditor = forwardRef(
  (_, ref: ForwardedRef<HTMLDivElement | null>) => {
    const commonT = useTranslations(NS_COMMON);
    const projectT = useTranslations(NS_PROJECT);
    const { task, taskListId, subTaskId, taskId, onCommentTask } =
      useTaskDetail();
    const { onAddSnackbar } = useSnackbar();

    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);

    const onChange = (value: string) => {
      setContent(value);
    };
    const onChangeFiles = (files: File[]) => {
      setFiles(files);
    };

    const onSubmit = async () => {
      if (!taskListId || !taskId) return;

      try {
        const data = {
          task: taskId,
          task_list: taskListId,
          sub_task: subTaskId,
          content,
        } as CommentTaskData;
        if (files.length) {
          data.attachments = [];
          const promises = files.map((file) => {
            return client.upload(Endpoint.UPLOAD_LINK, file);
          });

          const results = await Promise.allSettled(promises);
          results.forEach((result) => {
            if (result.status === "fulfilled" && result.value) {
              (data.attachments as string[]).push(result.value);
            }
          });
        }
        const newData = await onCommentTask(data);
        if (newData) {
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
        placeholder={projectT("taskDetail.writeComment")}
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
          <Button onClick={onSubmit} variant="primary" size="small">
            {projectT("taskDetail.sendComment")}
          </Button>
        </Stack>
      </Editor>
    );
  },
);

CommentEditor.displayName = "CommentEditor";

export default memo(CommentEditor);
