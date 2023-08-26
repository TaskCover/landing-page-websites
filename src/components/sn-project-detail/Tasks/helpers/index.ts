import { Selected } from "components/sn-project-detail/Tasks/components";

export const isTaskListChecked = (selected: Selected[], id: string) => {
  return selected.some(item => item?.taskListId === id && !item?.taskId && !item?.subTaskId)
}

export const isTaskChecked = (selected: Selected[], id: string) => {
  return selected.some(item => item?.taskId === id && !item?.subTaskId)
}

export const isSubTaskChecked = (selected: Selected[], id: string) => {
  return selected.some(item => item?.subTaskId === id)
}
