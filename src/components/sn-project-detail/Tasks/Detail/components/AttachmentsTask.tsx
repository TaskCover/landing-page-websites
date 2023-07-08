import React, { ChangeEvent, memo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Text, Collapse, Button } from "components/shared";
import { NS_PROJECT, AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import AttachmentPreview from "components/AttachmentPreview";
import { useTaskDetail } from "store/project/selectors";
import PlusIcon from "icons/PlusIcon";
import { client, Endpoint } from "api";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import useToggle from "hooks/useToggle";
import ConfirmDialog from "components/ConfirmDialog";

type AttachmentsTaskProps = {
  id: string;
};

const AttachmentsTask = (props: AttachmentsTaskProps) => {
  const { id } = props;
  const projectT = useTranslations(NS_PROJECT);
  const { task, taskListId, taskId, subTaskId, onUpdateTask } = useTaskDetail();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  const [indexDeleted, setIndexDeleted] = useState<number | undefined>();

  const onChooseFile = () => {
    inputFileRef?.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const attachments: string[] = [];
    const promises = Array.from(files).map((file) => {
      return client.upload(Endpoint.UPLOAD_LINK, file);
    });

    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        attachments.push(result.value);
      }
    });

    if (attachments.length) {
      try {
        if (!taskListId || !taskId) {
          throw AN_ERROR_TRY_AGAIN;
        }
        await onUpdateTask({ attachments }, taskListId, taskId, subTaskId);
      } catch (error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      }
    }
  };

  const onRemove = (index: number) => {
    return () => {
      setIndexDeleted(index);
    };
  };

  const onResetIndexDeleted = () => {
    setIndexDeleted(undefined);
  };

  const onDelete = async () => {
    try {
      if (
        !taskListId ||
        !taskId ||
        !task?.attachments?.length ||
        indexDeleted === undefined
      ) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const attachments = [...task?.attachments];
      attachments.splice(indexDeleted, 1);
      await onUpdateTask({ attachments }, taskListId, taskId, subTaskId);

      onResetIndexDeleted();
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  return (
    <>
      {!!task?.attachments_down?.length && (
        <Collapse
          initCollapse
          label={
            <Text color="text.primary" variant="h6">
              {`${projectT("taskDetail.attachments")} (${
                task?.attachments_down?.length ?? 0
              })`}
            </Text>
          }
        >
          <Stack direction="row" gap={1.5} flex={1} flexWrap="wrap">
            {task?.attachments_down.map((attachment, index) => (
              <AttachmentPreview
                key={attachment?.link}
                src={attachment?.link}
                name={attachment?.name}
                onRemove={onRemove(index)}
              />
            ))}
          </Stack>
          <Button
            onClick={onChooseFile}
            sx={{ mt: 2, p: "0!important", minHeight: "30px!important" }}
            variant="text"
            startIcon={<PlusIcon />}
            size="small"
          >
            {projectT("taskDetail.clickToUploadFile")}
          </Button>
        </Collapse>
      )}
      <Box
        id={id}
        type="file"
        component="input"
        display="none"
        onChange={onChangeFile}
        ref={inputFileRef}
        multiple
      />
      <ConfirmDialog
        onSubmit={onDelete}
        open={indexDeleted !== undefined}
        onClose={onResetIndexDeleted}
        title={commonT("confirmDelete.title")}
        content={commonT("confirmDelete.content")}
      />
    </>
  );
};

export default memo(AttachmentsTask);
