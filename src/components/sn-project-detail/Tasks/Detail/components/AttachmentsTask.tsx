import { ChangeEvent, memo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Text, Collapse, Button } from "components/shared";
import { NS_PROJECT, AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import AttachmentPreview from "./AttachmentPreview";
import { useTaskDetail } from "store/project/selectors";
import PlusIcon from "icons/PlusIcon";
import { client, Endpoint } from "api";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import useToggle from "hooks/useToggle";
import ConfirmDialog from "components/ConfirmDialog";
import Loading from "components/Loading";

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
  const [msg, setMsg] = useState<string>("");

  const onChooseFile = () => {
    inputFileRef?.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileExtensions = Array.from(files).map((file) =>
      getExtension(file.name),
    );
    const hasValid = fileExtensions.some((extension) =>
      SUPPORTS.includes(extension),
    );

    if (!hasValid) {
      onAddSnackbar(commonT("aFewFilesInvalid"), "error");
      return;
    }
    try {
      setMsg(commonT("processingUpload"));
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
        if (!taskListId || !taskId) {
          throw AN_ERROR_TRY_AGAIN;
        }
        const newAttachments = [...(task?.attachments ?? []), ...attachments];
        await onUpdateTask(
          { attachments: newAttachments },
          taskListId,
          taskId,
          subTaskId,
        );
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    } finally {
      setMsg("");
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
            <Text color="text.primary" variant="h6" textTransform="uppercase">
              {`${projectT("taskDetail.attachments")} (${
                task?.attachments_down?.length ?? 0
              })`}
            </Text>
          }
        >
          <Stack direction="row" gap={1.5} flex={1} flexWrap="wrap" mt={2}>
            {task?.attachments_down.map((attachment, index) => (
              <AttachmentPreview
                key={attachment?.link}
                src={attachment?.link}
                name={attachment?.name}
                onRemove={onRemove(index)}
                size={40}
                showName
                containerProps={{
                  bgcolor: "grey.50",
                  p: 1.25,
                }}
              />
            ))}
          </Stack>
          <Button
            onClick={onChooseFile}
            sx={{
              mt: 2,
              p: "0!important",
              minHeight: "30px!important",
              color: "text.primary",
            }}
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
      <Loading open={!!msg} message={msg} />
    </>
  );
};

export default memo(AttachmentsTask);

const SUPPORTS = [
  "doc",
  "docx",
  "xlsx",
  "xls",
  "csv",
  "mp3",
  "mp4",
  "png",
  "jpeg",
  "jpg",
  "pdf",
  "ppt",
  "pptx",
  "zip",
  "rar",
];
const getExtension = (name: string) => {
  const arr = name.split(".");
  return arr[arr.length - 1];
};
