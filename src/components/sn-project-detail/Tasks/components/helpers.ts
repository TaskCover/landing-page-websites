import { TaskData } from "store/project/actions";
import { formatDate } from "utils/index";

export const reorder = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export type TaskFormData = Omit<TaskData, "taskListId" | "task">;

export type Selected = {
  taskListId?: string;
  taskListName?: string;

  taskId?: string;
  taskName?: string;

  subTaskId?: string;
  subTaskName?: string;
};

export const genTime = () => formatDate(Date.now(), "HH:mm:ss.ms dd/MM/yyyy");
