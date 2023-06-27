"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  reorder,
  DragAndDrop,
  Drop,
  Drag,
  TaskFormData,
  Selected,
} from "./components";
import { Button, Checkbox, Text, TextProps } from "components/shared";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import Avatar from "components/Avatar";
import { formatNumber, getMessageErrorByAPI, debounce } from "utils/index";
import TextStatus from "components/TextStatus";
import { CellProps, TableLayout } from "components/Table";
import React from "react";
import DragParent from "./components/DragParent";
import PlusIcon from "icons/PlusIcon";
import { DropResult } from "react-beautiful-dnd";
import {
  AN_ERROR_TRY_AGAIN,
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
import { TaskData } from "store/project/actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import useEventListener from "hooks/useEventListener";
import { SCROLL_ID } from "layouts/MainLayout";
import ActionsSelected from "./ActionsSelected";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    onCreateTask: onCreateTaskAction,
    id,
    onGetTasksOfProject,
    onMoveTask,
    pageIndex,
    filters,
    totalPages,
  } = useTasksOfProject();
  const { task, onUpdateTaskDetail } = useTaskDetail();

  const filtersRef = useRef<Params>({});
  const pageIndexRef = useRef<number>(pageIndex);
  const isFetchingRef = useRef<boolean>(isFetching);
  const totalPagesRef = useRef<number | undefined>(totalPages);

  const { initQuery, isReady } = useQueryParams();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const params = useParams();

  const { onAddSnackbar } = useSnackbar();

  const projectId = useMemo(() => params.id, [params.id]);

  const [dataList, setDataList] = useState<TaskList[]>([]);
  const [selectedList, setSelectedList] = useState<Selected[]>([]);
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

  const onSetTask = (
    taskData?: Task,
    taskListId?: string,
    taskId?: string,
    subTaskId?: string,
  ) => {
    return () => {
      onUpdateTaskDetail(
        taskListId && taskData && taskId
          ? { ...taskData, taskListId, taskId, subTaskId }
          : undefined,
      );
    };
  };

  const onCreateTask = async (data: TaskFormData) => {
    try {
      //TODO: CREATE SUB TASK
      if (!dataIds?.taskListId || !dataIds.taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      return await onCreateTaskAction(
        data,
        dataIds.taskListId,
        dataIds?.taskId,
      );
    } catch (error) {
      throw error;
    }
  };

  const onToggleTaskList = (newChecked: boolean, taskList: TaskList) => {
    return () => {
      let newSelectedList = [...selectedList];

      if (newChecked) {
        newSelectedList.push({
          taskListId: taskList.id,
          taskListName: taskList.name,
        });
        const additionalSelectedList = [];
        if (taskList.tasks?.length) {
          taskList.tasks.forEach((task) => {
            const isExisted = newSelectedList.some(
              (selected) => !selected?.subTaskId && selected.taskId === task.id,
            );
            if (!isExisted) {
              newSelectedList.push({
                taskListId: taskList.id,
                taskId: task.id,
                taskName: task.name,
                taskListName: taskList.name,
              });
            }

            if (task?.sub_tasks?.length) {
              task?.sub_tasks?.forEach((subTask) => {
                const isExisted = newSelectedList.some(
                  (selected) => selected?.subTaskId === subTask.id,
                );
                if (!isExisted) {
                  newSelectedList.push({
                    taskListId: taskList.id,
                    taskListName: taskList.name,
                    taskId: task.id,
                    taskName: task.name,
                    subTaskId: subTask.id,
                    subTaskName: subTask.name,
                  });
                }
              });
            }
          });
        }

        newSelectedList = [...newSelectedList, ...additionalSelectedList];
      } else {
        const indexDeleted = newSelectedList.findIndex(
          (selected) =>
            !selected?.subTaskId &&
            !selected?.taskId &&
            selected.taskListId === taskList.id,
        );

        if (indexDeleted !== -1) {
          newSelectedList.splice(indexDeleted, 1);
        }

        // if (taskList.tasks?.length) {
        //   const taskIds = taskList.tasks.map((task) => task.id);
        //   newSelectedList = newSelectedList.filter(
        //     (selected) =>
        //       !selected?.taskId || !taskIds.includes(selected.taskId),
        //   );
        // } else {
        //   newSelectedList = newSelectedList.filter(
        //     (selected) => selected?.taskListId !== taskList.id,
        //   );
        // }
      }
      setSelectedList(newSelectedList);
    };
  };

  const onToggleTask = (
    newChecked: boolean,
    taskList: TaskList,
    task: Task,
    subTasks?: Task[],
  ) => {
    return () => {
      let newSelectedList = [...selectedList];
      if (newChecked) {
        newSelectedList.push({
          taskId: task.id,
          taskName: task.name,
          taskListId: taskList.id,
          taskListName: taskList.name,
        });
        if (subTasks?.length) {
          newSelectedList = subTasks.reduce(
            (out, subTask) => {
              const isExisted = out.some(
                (outItem) => outItem?.subTaskId === subTask.id,
              );

              if (!isExisted) {
                out.push({
                  taskId: task.id,
                  taskName: task.name,
                  taskListId: taskList.id,
                  taskListName: taskList.name,
                  subTaskId: subTask.id,
                  subTaskName: subTask.name,
                });
              }
              return out;
            },
            [...newSelectedList],
          );
        }
      } else {
        const indexDeleted = newSelectedList.findIndex(
          (selected) => !selected?.subTaskId && selected.taskId === task.id,
        );

        if (indexDeleted !== -1) {
          newSelectedList.splice(indexDeleted, 1);
        }

        // newSelectedList = newSelectedList.filter(
        //   (selected) => selected?.taskId !== task.id,
        // );
      }

      setSelectedList(newSelectedList);
    };
  };

  const onToggleSubTask = (taskList: TaskList, task: Task, subTask: Task) => {
    return () => {
      const newSelectedList = [...selectedList];
      const indexSelected = selectedList.findIndex(
        (item) =>
          item?.taskListId === taskList.id &&
          item?.taskId === task.id &&
          item?.subTaskId === subTask.id,
      );

      if (indexSelected === -1) {
        newSelectedList.push({
          taskId: task.id,
          taskName: task.name,
          taskListId: taskList.id,
          taskListName: taskList.name,
          subTaskId: subTask.id,
          subTaskName: subTask.name,
        });
      } else {
        newSelectedList.splice(indexSelected, 1);
        const indexTask = selectedList.findIndex(
          (selected) => !selected?.subTaskId && selected.taskId === task.id,
        );
        if (indexTask !== -1) {
          newSelectedList.splice(indexTask, 1);
        }
      }
      setSelectedList(newSelectedList);
    };
  };

  const onResetSelected = () => {
    setSelectedList([]);
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

  const onScroll = debounce(
    useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => {
        if (
          isFetchingRef.current ||
          !totalPagesRef.current ||
          pageIndexRef.current >= totalPagesRef.current
        )
          return;
        const { scrollTop, clientHeight, scrollHeight } = event.target;

        if (scrollTop + clientHeight >= scrollHeight - WRONG_NUMBER) {
          onGetTasksOfProject(projectId, {
            ...filtersRef.current,
            pageIndex: pageIndexRef.current + 1,
            pageSize: PAGE_SIZE,
          });
        }
      },
      [projectId, onGetTasksOfProject],
    ),
    250,
  );

  useEventListener("scroll", onScroll, SCROLL_ID);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    pageIndexRef.current = pageIndex;
  }, [pageIndex]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  useEffect(() => {
    setDataList(items);
  }, [items]);

  useEffect(() => {
    if (!isReady || !projectId) return;

    onGetTasksOfProject(projectId, {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      ...initQuery,
    });
  }, [id, initQuery, isReady, onGetTasksOfProject, projectId]);

  return (
    <Stack flex={1} pb={3}>
      {!!selectedList.length && (
        <ActionsSelected
          selectedList={selectedList}
          onReset={onResetSelected}
        />
      )}
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
            const isChecked = selectedList.some(
              (selected) =>
                !selected?.subTaskId &&
                !selected.taskId &&
                selected?.taskListId === taskListItem.id,
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
                onChange={onToggleTaskList(!isChecked, taskListItem)}
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
                    const isCheckedSelf = selectedList.some(
                      (selected) =>
                        !selected?.subTaskId && selected?.taskId === task.id,
                    );

                    const isChecked = Boolean(
                      task.sub_tasks?.length
                        ? task.sub_tasks.every((subTask) =>
                            subTaskIds.includes(subTask.id),
                          ) && isCheckedSelf
                        : isCheckedSelf,
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
                          taskListItem,
                          task,
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
                              onClick={onSetTask(
                                task,
                                taskListItem.id,
                                task.id,
                              )}
                            >
                              {task.name}
                            </Content>
                            <Assigner>{task?.owner?.fullname}</Assigner>
                            <Content>
                              {formatNumber(task?.estimated_hours)}
                            </Content>
                            <Content>
                              {formatNumber(task?.working_hours)}
                            </Content>
                            <TextStatus
                              color={COLOR_STATUS[task.status]}
                              text={TEXT_STATUS[task.status]}
                              component="p"
                            />
                            <Description>{task?.description}</Description>
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
                                    taskListItem,
                                    task,
                                    subTask,
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
                                      subTask,
                                      taskListItem.id,
                                      task.id,
                                      subTask.id,
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
                                  <Description>
                                    {subTask.description}
                                  </Description>
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

const Description = (props: BoxProps) => {
  const { children = "--" } = props;
  if (!children) return <Content />;

  return (
    <Box
      component="p"
      sx={{
        fontSize: 14,
        px: 2,
        m: 0,
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

const sxLink = {
  cursor: "pointer",
  color: "text.primary",
  "&:hover": {
    color: "primary.main",
  },
};
const WRONG_NUMBER = 10;
const PAGE_SIZE = 20;
