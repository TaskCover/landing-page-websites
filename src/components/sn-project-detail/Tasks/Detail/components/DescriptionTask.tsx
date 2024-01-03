import { Stack } from "@mui/material";
import { Button, Editor } from "components/shared";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { memo, useEffect, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useTaskDetail } from "store/project/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { replaceDescriptionBr } from "../../helpers";

type DescriptionTaskProps = {
  onClose: () => void;
  open: boolean;
  textEdit?: string;
  title?: string;
  sx?: object;
  taskId?: string;
  taskListId?: string;
  subTaskId?: string;
};

const DescriptionTask = (props: DescriptionTaskProps) => {
  const { open, onClose: onCloseProps, textEdit, title, sx } = props;
  const [text, setText] = useState<string | undefined>(textEdit ?? "");
  const commonT = useTranslations(NS_COMMON);
  const { onAddSnackbar } = useSnackbar();

  const { task, taskListId, taskId, subTaskId, onUpdateTask } = useTaskDetail();
  const onChangeText = (_, newValue?: string) => {
    setText(newValue);
  };

  const onClose = () => {
    onCloseProps();
    setText("");
  };

  const onSubmit = async () => {
    try {
      if ((!taskListId || !taskId) && (!props.taskId || !props.taskListId)) {
        throw AN_ERROR_TRY_AGAIN;
      }

      const data = { description: text };
      if (text) {
        data.description = replaceDescriptionBr(text);
      }
      const newData = await onUpdateTask(
        data,
        taskListId || props.taskListId + "",
        taskId || props.taskId + "",
        subTaskId || props.subTaskId + "",
      );
      if (newData) {
        onAddSnackbar(
          commonT("notification.success", { label: commonT("form.save") }),
          "success",
        );
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    setText(task?.description || textEdit);
  }, [task?.description, textEdit, open]);

  if (!open) return null;

  return (
    <Stack spacing={2} sx={{ ...sx }}>
      <Editor
        value={text ?? ""}
        onChange={onChangeText}
        title={title ?? ""}
        name="description"
        editorKey={DESCRIPTION_EDITOR}
      />
      <Stack direction="row" alignItems="center" spacing={3}>
        <Button
          sx={{ width: 100 }}
          onClick={onSubmit}
          type="button"
          variant="primary"
          size="small"
        >
          {commonT("form.save")}
        </Button>
        <Button
          sx={{ width: 100 }}
          onClick={onClose}
          type="button"
          variant="primaryOutlined"
          size="small"
        >
          {commonT("form.cancel")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(DescriptionTask);

const DESCRIPTION_EDITOR = "descriptionEditor";
