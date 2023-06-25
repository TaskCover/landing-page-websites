"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { reorder, DragAndDrop, Drop, Drag } from "./components";
import { Button, Checkbox, Text, TextProps } from "components/shared";
import { Stack, StackProps } from "@mui/material";
import Avatar from "components/Avatar";
import { formatNumber, getMessageErrorByAPI } from "utils/index";
import TextStatus from "components/TextStatus";
import { CellProps, TableLayout } from "components/Table";
import React from "react";
import DragParent from "./components/DragParent";
import PlusIcon from "icons/PlusIcon";
import { DropResult } from "react-beautiful-dnd";
import {
  COLOR_STATUS,
  DEFAULT_PAGING,
  NS_COMMON,
  NS_PROJECT,
  TEXT_STATUS,
} from "constant/index";
import { useTaskDetail, useTasksOfProject } from "store/project/selectors";
import useQueryParams from "hooks/useQueryParams";
import { useRouter } from "next-intl/client";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Form from "./Form";
import { DataAction } from "constant/enums";
import { Task, TaskList } from "store/project/reducer";
import { useSnackbar } from "store/app/selectors";
import Detail from "./Detail";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    onCreateTask,
    id,
    onGetTasksOfProject,
    onMoveTask,
  } = useTasksOfProject();
  const { task, onUpdateTaskDetail } = useTaskDetail();

  const { initQuery, isReady } = useQueryParams();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const params = useParams();

  const { onAddSnackbar } = useSnackbar();

  const projectId = useMemo(() => params.id, [params.id]);

  const [dataList, setDataList] = useState<TaskList[]>([]);
  const [selectedList, setSelectedList] = useState<
    {
      taskId?: string;
      subTaskId?: string;
      taskListId?: string;
    }[]
  >([]);
  const [sx, setSx] = useState({
    task: {},
    subTask: {},
  });

  const [dataIds, setDataIds] = useState<{
    taskId?: string;
    taskListId?: string;
  }>({});

  const isShow = useMemo(
    () => Boolean(dataIds?.taskId && dataIds?.taskListId),
    [dataIds?.taskId, dataIds?.taskListId],
  );

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: projectT("detailTasks.form.title.name"),
        width: "30%",
        align: "left",
      },
      { value: commonT("form.title.assigner"), width: "15%", align: "left" },
      {
        value: projectT("detailTasks.form.title.expectCompletionTime"),
        width: "12.5%",
      },
      { value: projectT("detailTasks.form.title.timeTaken"), width: "12.5%" },
      { value: commonT("status"), width: "15%" },
      { value: commonT("form.title.note"), width: "15%" },
    ],
    [commonT, projectT],
  );

  const headerList = useMemo(() => {
    return isMdSmaller ? [] : desktopHeaderList;
  }, [desktopHeaderList, isMdSmaller]) as CellProps[];

  const onSetTask = (taskListId?: string, task?: Task) => {
    return () => {
      onUpdateTaskDetail(
        taskListId && task ? { ...task, taskListId } : undefined,
      );
    };
  };

  const onToggleTaskList = (
    newChecked: boolean,
    taskListId: string,
    tasks: Task[],
  ) => {
    return () => {
      let newSelectedList = [...selectedList];

      if (newChecked) {
        const additionalSelectedList = [];
        tasks.forEach((task) => {
          if (task?.sub_tasks?.length) {
            task?.sub_tasks?.forEach((subTask) => {
              newSelectedList.push({
                taskListId,
                taskId: task.id,
                subTaskId: subTask.id,
              });
            });
          } else {
            newSelectedList.push({
              taskListId,
              taskId: task.id,
            });
          }
        });
        newSelectedList = [...newSelectedList, ...additionalSelectedList];
      } else if (tasks?.length) {
        const taskIds = tasks.map((task) => task.id);
        newSelectedList = newSelectedList.filter(
          (selected) => !selected?.taskId || !taskIds.includes(selected.taskId),
        );
      }
      setSelectedList(newSelectedList);
    };
  };
  const onToggleTask = (
    newChecked: boolean,
    taskListId: string,
    taskId: string,
    subTasks?: Task[],
  ) => {
    return () => {
      let newSelectedList = [...selectedList];

      if (newChecked) {
        const additionalSelectedList =
          subTasks?.map((subTask) => ({
            taskListId,
            taskId,
            subTaskId: subTask.id,
          })) ?? [];
        newSelectedList = [...newSelectedList, ...additionalSelectedList];
      } else if (subTasks?.length) {
        const subTaskIds = subTasks.map((subTask) => subTask.id);
        newSelectedList = newSelectedList.filter(
          (selected) =>
            !selected?.subTaskId || !subTaskIds.includes(selected.subTaskId),
        );
      }
      setSelectedList(newSelectedList);
    };
  };
  const onToggleSubTask = (
    taskListId: string,
    taskId: string,
    subTaskId: string,
  ) => {
    return () => {
      const newSelectedList = [...selectedList];
      const indexSelected = selectedList.findIndex(
        (item) =>
          item?.taskListId === taskListId &&
          item?.taskId === taskId &&
          item?.subTaskId === subTaskId,
      );

      if (indexSelected === -1) {
        newSelectedList.push({ taskListId, taskId, subTaskId });
      } else {
        newSelectedList.splice(indexSelected, 1);
      }
      setSelectedList(newSelectedList);
    };
  };

  const onMoveTaskList = async (
    sourceTaskListId: string,
    destinationTaskListId: string,
    taskId: string,
    updatedDataList: TaskList[],
  ) => {
    try {
      const isSuccess = await onMoveTask(
        sourceTaskListId,
        destinationTaskListId,
        [taskId],
      );
      if (isSuccess === true) {
        setDataList(updatedDataList);
        onAddSnackbar(
          projectT("detailTasks.notification.moveSuccess"),
          "success",
        );
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { type, source, destination } = result;
    if (!destination) return;

    const sourceTaskListId = source.droppableId;
    const destinationTaskListId = destination.droppableId;

    if (sourceTaskListId === destinationTaskListId) return;

    const indexSourceTaskList = dataList.findIndex(
      (taskListItem) => taskListItem.id === sourceTaskListId,
    );
    const taskId = dataList?.[indexSourceTaskList]?.tasks?.[source.index]?.id;

    // Reordering items
    if (type === DROPPABLE_TASK) {
      // If drag and dropping within the same category
      if (sourceTaskListId === destinationTaskListId) {
        const updatedOrder = reorder(
          dataList.find((taskListItem) => taskListItem.id === sourceTaskListId)
            ?.tasks ?? [],
          source.index,
          destination.index,
        );
        const updatedDataList = dataList.map((taskListItem) =>
          taskListItem.id !== sourceTaskListId
            ? taskListItem
            : { ...taskListItem, tasks: updatedOrder },
        );
        onMoveTaskList(
          sourceTaskListId,
          destinationTaskListId,
          taskId,
          updatedDataList,
        );
      } else {
        const sourceOrder = [
          ...(dataList.find(
            (taskListItem) => taskListItem.id === sourceTaskListId,
          )?.tasks ?? []),
        ];
        const destinationOrder = [
          ...(dataList.find(
            (taskListItem) => taskListItem.id === destinationTaskListId,
          )?.tasks ?? []),
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [removed] = sourceOrder.splice(source.index, 1) as any;

        destinationOrder.splice(destination.index, 0, removed);

        destinationOrder[removed] = sourceOrder[removed];
        delete sourceOrder[removed];

        const updatedDataList = dataList.map((taskListItem) =>
          taskListItem.id === sourceTaskListId
            ? { ...taskListItem, tasks: sourceOrder }
            : taskListItem.id === destinationTaskListId
            ? { ...taskListItem, tasks: destinationOrder }
            : taskListItem,
        );

        onMoveTaskList(
          sourceTaskListId,
          destinationTaskListId,
          taskId,
          updatedDataList,
        );
      }
    }
  };

  const onSetDataIds = (taskListId?: string, taskId?: string) => {
    return () => {
      setDataIds({ taskId, taskListId });
    };
  };

  const onLayout = useCallback((refsData) => {
    const newSx = refsData?.reduce(
      (out, widthValue, index) => {
        const widthTask = index === 0 ? widthValue - 72 : widthValue;
        const widthSubTask = index === 0 ? widthValue - 96 : widthValue;
        out.task[`& > :nth-of-type(${index + 1})`] = {
          minWidth: widthTask,
          width: widthTask,
          maxWidth: widthTask,
          overflowX: "hidden",
        };
        out.subTask[`& > :nth-of-type(${index + 1})`] = {
          minWidth: widthSubTask,
          width: widthSubTask,
          maxWidth: widthSubTask,
          overflowX: "hidden",
        };
        return out;
      },
      { task: {}, subTask: {} },
    );
    setSx(newSx);
  }, []);

  useEffect(() => {
    setDataList(items);
  }, [items]);

  useEffect(() => {
    if (!isReady || !projectId || id === projectId) return;
    onGetTasksOfProject(projectId, { ...DEFAULT_PAGING, ...initQuery });
  }, [id, initQuery, isReady, onGetTasksOfProject, projectId]);

  return (
    <Stack flex={1} pb={3}>
      <TableLayout
        onLayout={onLayout}
        headerList={headerList}
        flex="unset"
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        display={{ xs: "none", md: "flex" }}
      >
        <></>
      </TableLayout>

      <DragAndDrop onDragEnd={onDragEnd}>
        <Drop id="droppable" type="droppable-taskList">
          {dataList.map((taskListItem, taskListIndex) => {
            const taskIds = selectedList.map((selected) => selected?.taskId);
            const isChecked = Boolean(
              taskListItem.tasks?.length &&
                taskListItem.tasks?.every((task) => taskIds.includes(task.id)),
            );
            return (
              <DragParent
                className="draggable-taskList"
                key={taskListItem.id}
                id={taskListItem.id}
                index={taskListIndex}
                name={taskListItem.name}
                count={taskListItem.tasks.length}
                checked={isChecked}
                onChange={onToggleTaskList(
                  !isChecked,
                  taskListItem.id,
                  taskListItem.tasks,
                )}
              >
                <Drop
                  key={taskListItem.id}
                  id={taskListItem.id}
                  type={DROPPABLE_TASK}
                >
                  {taskListItem.tasks.map((task, taskIndex) => {
                    const subTaskIds = selectedList.map(
                      (selected) => selected?.subTaskId,
                    );
                    const isChecked = Boolean(
                      task.sub_tasks?.length &&
                        task.sub_tasks?.every((subTask) =>
                          subTaskIds.includes(subTask.id),
                        ),
                    );
                    return (
                      <Drag
                        className="draggable"
                        key={task.id}
                        id={task.id}
                        index={taskIndex}
                        checked={isChecked}
                        onChange={onToggleTask(
                          !isChecked,
                          taskListItem.id,
                          task.id,
                          task?.sub_tasks,
                        )}
                      >
                        <Stack width="100%">
                          <Stack
                            direction={{ md: "row" }}
                            alignItems={{ xs: "flex-start", md: "center" }}
                            minHeight={48}
                            width="100%"
                            sx={sx.task}
                          >
                            <Content
                              color="text.primary"
                              fontWeight={600}
                              textAlign="left"
                              noWrap
                              tooltip={task.name}
                              onClick={onSetTask(taskListItem.id, task)}
                            >
                              {task.name}
                            </Content>
                            <Assigner>{task?.owner?.fullname}</Assigner>
                            <Content>
                              {formatNumber(task.estimated_hours)}
                            </Content>
                            <Content>
                              {formatNumber(task?.working_hours)}
                            </Content>
                            <TextStatus
                              color={COLOR_STATUS[task.status]}
                              text={TEXT_STATUS[task.status]}
                              component="p"
                            />
                            <Content
                              textAlign="left"
                              noWrap
                              tooltip={task.description}
                            >
                              {task.description}
                            </Content>
                          </Stack>
                          {task?.sub_tasks?.map((subTask) => {
                            const isChecked = selectedList.some(
                              (item) => item?.subTaskId === subTask.id,
                            );
                            return (
                              <Stack
                                key={subTask.id}
                                direction="row"
                                alignItems="center"
                                minHeight={48}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onChange={onToggleSubTask(
                                    taskListItem.id,
                                    task.id,
                                    subTask.id,
                                  )}
                                />
                                <Stack
                                  direction={{ md: "row" }}
                                  alignItems={{
                                    xs: "flex-start",
                                    md: "center",
                                  }}
                                  sx={sx.subTask}
                                >
                                  <Content
                                    color="text.primary"
                                    fontWeight={600}
                                    textAlign="left"
                                    noWrap
                                    tooltip={subTask.name}
                                    onClick={onSetTask(
                                      taskListItem.id,
                                      subTask,
                                    )}
                                  >
                                    {subTask.name}
                                  </Content>
                                  <Assigner src={subTask?.owner?.avatar?.link}>
                                    {subTask?.owner?.fullname}
                                  </Assigner>
                                  <Content>
                                    {formatNumber(subTask.estimated_hours)}
                                  </Content>
                                  <Content>
                                    {formatNumber(subTask?.working_hours)}
                                  </Content>
                                  <TextStatus
                                    color={COLOR_STATUS[subTask.status]}
                                    text={TEXT_STATUS[subTask.status]}
                                    component="p"
                                  />
                                  <Content
                                    textAlign="left"
                                    noWrap
                                    tooltip={subTask.description}
                                  >
                                    {subTask.description}
                                  </Content>
                                </Stack>
                              </Stack>
                            );
                          })}
                          <Button
                            onClick={onSetDataIds(taskListItem.id, task.id)}
                            startIcon={<PlusIcon />}
                            variant="text"
                            size="small"
                            color="secondary"
                            sx={{ mr: 4 }}
                          >
                            {projectT("detailTasks.addNewTask")}
                          </Button>
                        </Stack>
                      </Drag>
                    );
                  })}
                </Drop>
              </DragParent>
            );
          })}
        </Drop>
      </DragAndDrop>
      {isShow && (
        <Form
          open
          onClose={onSetDataIds()}
          type={DataAction.CREATE}
          onSubmit={onCreateTask}
          taskListId={dataIds.taskListId as string}
          taskId={dataIds?.taskId}
        />
      )}
      <Detail />
    </Stack>
  );
};

export default memo(ItemList);

const DROPPABLE_TASK = "droppable-task";

const Assigner = ({
  children,
  src,
  ...rest
}: StackProps & { src?: string }) => {
  if (!children) return <Content />;
  return (
    <Stack
      component="p"
      direction="row"
      alignItems="center"
      spacing={1.25}
      px={2}
      {...rest}
    >
      <Avatar size={24} src={src} />
      <Text variant="body2" component="span" overflow="hidden" color="grey.400">
        {children}
      </Text>
    </Stack>
  );
};

const Content = (props: TextProps) => {
  const { children = "--", sx, onClick, ...rest } = props;

  const additionalSx = useMemo(() => (onClick ? sxLink : {}), [onClick]);

  return (
    <Text
      px={2}
      onClick={onClick}
      variant="body2"
      color="grey.400"
      textAlign="center"
      overflow="hidden"
      sx={{ ...additionalSx, ...sx }}
      {...rest}
    >
      {typeof children === "number" ? formatNumber(children) : children}
    </Text>
  );
};

const sxLink = {
  cursor: "pointer",
  color: "text.primary",
  "&:hover": {
    color: "primary.main",
  },
};
