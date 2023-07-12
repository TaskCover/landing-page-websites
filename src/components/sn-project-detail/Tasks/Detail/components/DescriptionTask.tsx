import { memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useTaskDetail } from "store/project/selectors";
import { Editor, Button } from "components/shared";
import { useTranslations } from "next-intl";
import { AN_ERROR_TRY_AGAIN, NS_COMMON, NS_PROJECT } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";

type DescriptionTaskProps = {
  onClose: () => void;
  open: boolean;
};

const DescriptionTask = (props: DescriptionTaskProps) => {
  const { open, onClose: onCloseProps } = props;
  const [text, setText] = useState<string | undefined>();

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
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateTask(
        { description: text },
        taskListId,
        taskId,
        subTaskId,
      );
      if (newData) {
        onAddSnackbar(
          commonT("notification.success", { label: commonT("form.save") }),
          "success",
        );
        onClose();
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  useEffect(() => {
    setText(task?.description);
  }, [task?.description]);

  if (!open) return null;

  return (
    <Stack spacing={2}>
      <Editor
        value={text ?? ""}
        onChange={onChangeText}
        title=""
        name="description"
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
