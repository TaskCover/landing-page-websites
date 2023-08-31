import { Stack } from "@mui/material";
import Loading from "components/Loading";
import { Collapse, Text } from "components/shared";
import { NS_SALES } from "constant/index";
import useToggle from "hooks/useToggle";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useSaleDetail } from "store/sales/selectors";

const TodoList = () => {
  const { saleDetail } = useSaleDetail();
  const [isProcessing, onProcessingTrue, onProcessingFalse] = useToggle();
  const salesT = useTranslations(NS_SALES);

  const onSubmit = async (nameValue: string) => {
    // if (!taskListId || !taskId) return;
    // try {
    //   onProcessingTrue();
    //   const newTodoList = [
    //     ...(task?.todo_list ?? []),
    //     {
    //       name: nameValue,
    //     },
    //   ] as TaskData["todo_list"];
    //   return await onUpdateTask(
    //     { todo_list: newTodoList },
    //     taskListId,
    //     taskId,
    //     subTaskId,
    //   );
    // } catch (error) {
    //   onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    // } finally {
    //   onProcessingFalse();
    // }
  };

  const onDragEnd = async (result: DropResult) => {
    // if (!taskListId || !taskId) return;
    // const { source, destination } = result;
    // if (!destination) return;
    // const newData = [...(task?.todo_list ?? [])];
    // const updatedOrder = reorder(
    //   newData,
    //   source.index,
    //   destination.index,
    // ) as Todo[];
    // const id_priorities = updatedOrder.map((item) => item.id);
    // try {
    //   onProcessingTrue();
    //   await onUpdateOrderTodo({
    //     task_list: taskListId,
    //     task: taskId,
    //     sub_task: subTaskId,
    //     id_priorities,
    //   });
    //   onGetTaskList(taskListId);
    //   onUpdateTaskDetail({
    //     taskId,
    //     taskListId,
    //     subTaskId,
    //     ...task,
    //     todo_list: updatedOrder,
    //   } as TaskDetail);
    // } catch (error) {
    //   onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    // } finally {
    //   onProcessingFalse();
    // }
    // newData = newData.map((todoItem) =>
    //   taskListItem.id !== sourceTaskListId
    //     ? taskListItem
    //     : { ...taskListItem, tasks: updatedOrder },
    // );
    // setDataList(updatedDataList);
  };

  if (!open) return null;

  return (
    <>
      <Collapse
        initCollapse
        label={
          <Text color="text.primary" variant="h6" textTransform="uppercase">
            {`${salesT("taskDetail.toDoList")} (${
              saleDetail?.todo_list?.length ?? 0
            })`}
          </Text>
        }
      >
        <Stack mt={2} maxWidth="100%" overflow="auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {/* {task?.todo_list?.map((toDo, index) => (
                    <SubItem
                      key={toDo.id}
                      {...toDo}
                      todoId={toDo.id}
                      index={index}
                    />
                  ))} */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Stack direction="row" alignItems="center" spacing={1}>
            <PlusIcon />
            {/* <TodoName
              onSubmit={onSubmit}
              autoFocus={!task?.todo_list?.length}
            /> */}
          </Stack>
        </Stack>
      </Collapse>
      <Loading open={isProcessing} />
    </>
  );
};

export default memo(TodoList);
