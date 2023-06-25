import { memo, useMemo } from "react";
import { IconButton } from "components/shared";
import { useTaskDetail } from "store/project/selectors";
import { DataAction } from "constant/enums";
import useToggle from "hooks/useToggle";
import Form from "components/sn-project-detail/Tasks/Form";
import PencilIcon from "icons/PencilIcon";
import { TaskData } from "store/project/actions";

type EditTaskProps = {};

const EditTask = (props: EditTaskProps) => {
  const [isShow, onShow, onHide] = useToggle();

  const {
    task,
    taskListId,
    onUpdateTaskDetail,
    onUpdateTask: onUpdateTaskAction,
  } = useTaskDetail();

  const initValues = useMemo(
    () =>
      task
        ? {
            name: task.name,
            estimated_hours: task?.estimated_hours,
            owner: task?.owner?.id,
            start_date: task?.start_date,
            end_date: task?.end_date,
            description: task?.description,
          }
        : undefined,
    [task],
  );

  const onUpdateTask = async (
    values: TaskData,
    taskListId: string,
    taskId?: string,
  ) => {
    if (!taskId) return;
    return await onUpdateTaskAction(values, taskListId, taskId);
  };

  if (!taskListId || !task) return null;

  return (
    <>
      <IconButton
        onClick={onShow}
        sx={{ bgcolor: "grey.50", p: 0.5, borderRadius: 1 }}
      >
        <PencilIcon sx={{ fontSize: 24 }} />
      </IconButton>

      {isShow && (
        <Form
          open
          onClose={onHide}
          type={DataAction.UPDATE}
          initialValues={initValues}
          taskListId={taskListId}
          taskId={task.id}
          onSubmit={onUpdateTask}
        />
      )}
    </>
  );
};

export default memo(EditTask);
