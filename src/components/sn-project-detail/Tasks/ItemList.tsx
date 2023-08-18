"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  reorder,
  TaskFormData,
  Selected,
  DroppableTaskList,
  DraggableTask,
  TASK_TEXT_STATUS,
  MoreList,
} from "./components";
import { Button, Checkbox, Text, TextProps } from "components/shared";
import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  StackProps,
  TextField,
} from "@mui/material";
import Avatar from "components/Avatar";
import {
  formatNumber,
  getMessageErrorByAPI,
  debounce,
  formatDate,
  checkIsMobile,
} from "utils/index";
import { CellProps, TableLayout } from "components/Table";
import React from "react";
import PlusIcon from "icons/PlusIcon";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  AN_ERROR_TRY_AGAIN,
  COLOR_STATUS,
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
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import useEventListener from "hooks/useEventListener";
import { SCROLL_ID } from "constant/index";
import ActionsSelected from "./ActionsSelected";
import Loading from "components/Loading";
import useToggle from "hooks/useToggle";
import FixedLayout from "components/FixedLayout";
import FormControlLabel from "@mui/material/FormControlLabel";
import useTheme from "hooks/useTheme";
import SelectStatusTask from "components/sn-projects/components/SelectStatusTask";
import AssignerTask from "components/sn-projects/components/AssignerTask";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    onCreateTask: onCreateTaskAction,
    onGetTasksOfProject,
    onMoveTask,
    pageIndex,
    filters,
    totalPages,
    onResetTasks,
  } = useTasksOfProject();
  const { onUpdateTaskDetail, onUpdateTaskParent, onGetTaskList, onUpdateTask } = useTaskDetail();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const filtersRef = useRef<Params>({});
  const pageIndexRef = useRef<number>(pageIndex);
  const isFetchingRef = useRef<boolean>(isFetching);
  const totalPagesRef = useRef<number | undefined>(totalPages);

  const { initQuery, isReady } = useQueryParams();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);
  const [isProcessing, onProcessingTrue, onProcessingFalse] = useToggle();
  const [isDragging, onDraggingTrue, onDraggingFalse] = useToggle();

  const params = useParams();
  const { isDarkMode } = useTheme();
  const { onAddSnackbar } = useSnackbar();

  const projectId = useMemo(() => params.id, [params.id]) as string;

  const [dataList, setDataList] = useState<TaskList[]>([]);
  const [selectedList, setSelectedList] = useState<Selected[]>([]);
  const [sx, setSx] = useState({
    task: {},
    subTask: {},
  });
  const [hideIds, setHideIds] = useState<string[]>([]);

  const [hoveredId, setHoveredId] = useState<string | undefined>(undefined);
  const [dataIds, setDataIds] = useState<{
    taskId?: string;
    taskListId?: string;
  }>({});

  const isShow = useMemo(
    () => Boolean(dataIds?.taskId && dataIds?.taskListId),
    [dataIds?.taskId, dataIds?.taskListId],
  );

  const [taskName, setTaskName] = useState<string>("");
  const [errorTaskName, setErrorTaskName] = useState<string>("");
  const [taskIdSelected, setTaskIdSelected] = useState<string>("");
  const noData = useMemo(
    () => !isIdle && totalItems === 0,
    [isIdle, totalItems],
  );

  const baseTop = useMemo(
    () => (selectedList.length ? 106 : 62),
    [selectedList.length],
  );
  // const baseTop = useMemo(() => 97, []);

  const handleAllChecked = () => {
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);

    setSelectedList((prevSelectedList) => {
      const newSelectedList: Selected[] = [];
      if (isAllChecked) {
        // If the new checkbox is checked, uncheck all task lists and tasks
        return [];
      } else {
        // If the new checkbox is unchecked, check all task lists and tasks
        dataList.forEach((taskListItem) => {
          // Select task list and check it
          newSelectedList.push({
            taskListId: taskListItem.id,
            taskListName: taskListItem.name,
            checked: true,
          });

          // Select tasks within the task list and check them
          taskListItem.tasks.forEach((task) => {
            newSelectedList.push({
              taskListId: taskListItem.id,
              taskId: task.id,
              taskName: task.name,
              taskListName: taskListItem.name,
              checked: true,
            });

            // Select sub tasks of the task and check them
            if (task.sub_tasks?.length) {
              task.sub_tasks.forEach((subTask) => {
                newSelectedList.push({
                  taskListId: taskListItem.id,
                  taskId: task.id,
                  taskName: task.name,
                  taskListName: taskListItem.name,
                  subTaskId: subTask.id,
                  subTaskName: subTask.name,
                  checked: true,
                });
              });
            }
          });
        });
      }
      return newSelectedList;
    });
  };

  const checkboxLabel = "";
  const checkboxProps = {
    checked: isAllChecked,
    onChange: handleAllChecked,
  };
  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: projectT("detailTasks.form.title.name"),
        width: "30%",
        align: "left",
      },
      { value: commonT("form.title.assigner"), width: "22.5%", align: "left" },
      {
        value: commonT("form.title.startDate"),
        width: "10%",
      },
      { value: commonT("form.title.endDate"), width: "10%" },
      { value: commonT("status"), width: "12.5%" },
      { value: commonT("form.title.description"), width: "15%" },
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
    taskListName?: string,
    taskName?: string
  ) => {
    return () => {
      onUpdateTaskDetail(
        taskListId && taskData && taskId
          ? { ...taskData, taskListId, taskId, subTaskId }
          : undefined,
      );
      onUpdateTaskParent(
        taskListName && taskName ? {taskListName, taskName} : undefined
      )
    };
  };

  const onCreateSubTaskQuick = async (
    data: TaskFormData,
    taskListId,
    taskId,
  ) => {
    try {
      //TODO: CREATE SUB TASK
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      return await onCreateTaskAction(data, taskListId, taskId);
    } catch (error) {
      throw error;
    }
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
        setIsAllChecked(false);
        newSelectedList = newSelectedList.filter(
          (item) => item.taskListId !== taskList.id,
        );
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
      const newSelectedList = [...selectedList];
      if (newChecked) {
        newSelectedList.push({
          taskId: task.id,
          taskName: task.name,
          taskListId: taskList.id,
          taskListName: taskList.name,
        });
      } else {
        setIsAllChecked(false);
        const indexDeleted = newSelectedList.findIndex(
          (selected) => !selected?.subTaskId && selected.taskId === task.id,
        );

        if (indexDeleted !== -1) {
          newSelectedList.splice(indexDeleted, 1);
        }
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
        setIsAllChecked(false);
        newSelectedList.splice(indexSelected, 1);
      }
      setSelectedList(newSelectedList);
    };
  };

  const onResetSelected = () => {
    setSelectedList([]);
  };

  const directlySelected = (taskListItem: TaskList, task: Task, subTask?: Task): Selected => {
    return {
      taskListId: taskListItem.id,
      taskListName: taskListItem.name,
      taskId: task.id,
      taskName: task.name,
      subTaskId: subTask?.id,
      subTaskName: subTask?.name,
      checked: true,
    }
  }

  const onMoveTaskList = async (
    sourceTaskListId: string,
    destinationTaskListId: string,
    taskId: string,
    updatedDataList: TaskList[],
    destinationTaskId?: string,
    orderTasks?: string[],
  ) => {
    try {
      onProcessingTrue();
      const isSuccess = await onMoveTask(
        sourceTaskListId,
        destinationTaskListId,
        [taskId],
        destinationTaskId,
        orderTasks,
      );
      if (isSuccess === true) {
        setDataList(updatedDataList);
        onAddSnackbar(
          projectT("detailTasks.notification.moveSuccess"),
          "success",
        );
        await onGetTaskList(sourceTaskListId);
        await onGetTaskList(destinationTaskListId);
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    } finally {
      onProcessingFalse();
    }
  };

  const onDragEnd = async (result: DropResult) => {
    onDraggingFalse();
    const { source, destination } = result;
    if (!destination) return;

    const sourceTaskListIndex = dataList.findIndex(
      (taskListItem) => taskListItem.id === source.droppableId,
    );
    let destinationTaskListIndex = dataList.findIndex(
      (taskListItem) => taskListItem.id === destination.droppableId,
    );
    const isDestinationTaskList = destinationTaskListIndex !== -1;
    if (!isDestinationTaskList) {
      destinationTaskListIndex = dataList.findIndex((taskListItem) => {
        return !!taskListItem.tasks.find(
          (taskItem) => taskItem.id === destination.droppableId,
        );
      });
    }

    if (sourceTaskListIndex === -1 || destinationTaskListIndex === -1) return;

    if (sourceTaskListIndex === destinationTaskListIndex) {
      // SAME TASK LIST

      if (source.droppableId === destination.droppableId) {
        // CHANGE ORDER TASKS
        const updatedOrder = reorder(
          dataList.find(
            (taskListItem) => taskListItem.id === source.droppableId,
          )?.tasks ?? [],
          source.index,
          destination.index,
        );
        const newDataList = dataList.map((taskListItem) =>
          taskListItem.id !== source.droppableId
            ? taskListItem
            : { ...taskListItem, tasks: updatedOrder },
        );
        // setDataList(updatedDataList);

        onMoveTaskList(
          dataList[sourceTaskListIndex].id,
          dataList[destinationTaskListIndex].id,
          dataList[sourceTaskListIndex].tasks[source.index].id,
          newDataList,
          undefined,
          newDataList[destinationTaskListIndex].tasks.map((task) => task.id),
        );
      } else {
        // MOVE TASK BECOME TO SUB TASK OF TASK
        const newTasks = [...dataList[sourceTaskListIndex].tasks];

        newTasks.splice(source.index, 1);

        const sourceTaskOrder = {
          ...dataList[sourceTaskListIndex].tasks[source.index],
        };
        if (sourceTaskOrder?.sub_tasks?.length) return;
        const destinationTaskIndex = dataList[
          sourceTaskListIndex
        ].tasks.findIndex((task) => task.id === destination.droppableId);

        const subTasks = [
          ...(dataList[sourceTaskListIndex].tasks[destinationTaskIndex]
            ?.sub_tasks ?? []),
        ];
        if (subTasks.some((subTask) => subTask.name === sourceTaskOrder.name)) {
          onAddSnackbar(
            projectT("detailTasks.nameWillBeExisted"),
            "error",
            5000,
          );
          return;
        }

        subTasks.push(sourceTaskOrder);

        newTasks[destinationTaskIndex] = {
          ...newTasks[destinationTaskIndex],
          sub_tasks: subTasks,
        };

        const newTaskList = {
          ...dataList[sourceTaskListIndex],
          tasks: newTasks,
        };

        const newDataList = [...dataList];

        newDataList[sourceTaskListIndex] = newTaskList;

        // setDataList(newDataList);

        if (
          dataList[sourceTaskListIndex].tasks[source.index].id ===
          dataList[destinationTaskListIndex].tasks[destinationTaskIndex].id
        )
          return;

        onMoveTaskList(
          dataList[sourceTaskListIndex].id,
          dataList[destinationTaskListIndex].id,
          dataList[sourceTaskListIndex].tasks[source.index].id,
          newDataList,
          dataList[destinationTaskListIndex].tasks[destinationTaskIndex].id,
        );
      }

      // onMoveTaskList(
      //   sourceTaskListId,
      //   destinationTaskListId,
      //   taskId,
      //   updatedDataList,result
      // );
    } else {
      const newSourceTasks = [...dataList[sourceTaskListIndex].tasks];

      newSourceTasks.splice(source.index, 1);

      const newSourceTaskList = {
        ...dataList[sourceTaskListIndex],
        tasks: newSourceTasks,
      };

      const sourceTaskMoved = {
        ...dataList[sourceTaskListIndex].tasks[source.index],
      };
      const newDestinationTasks = [...dataList[destinationTaskListIndex].tasks];

      let destinationTaskIndex: number | undefined;
      let orderTasks: string[] | undefined;
      if (isDestinationTaskList) {
        // CHANGE ORDER TASKS

        newDestinationTasks.splice(destination.index, 0, sourceTaskMoved);
        orderTasks = newDestinationTasks.map((task) => task.id);
      } else {
        if (sourceTaskMoved?.sub_tasks?.length) return;
        destinationTaskIndex = newDestinationTasks.findIndex(
          (task) => task.id === destination.droppableId,
        );

        const newDestinationSubTasks = [
          ...(dataList[destinationTaskListIndex].tasks[destinationTaskIndex]
            ?.sub_tasks ?? []),
        ];
        newDestinationSubTasks.push(sourceTaskMoved);

        newDestinationTasks[destinationTaskIndex] = {
          ...newDestinationTasks[destinationTaskIndex],
          sub_tasks: newDestinationSubTasks,
        };
      }

      const newDestinationTaskList = {
        ...dataList[destinationTaskListIndex],
        tasks: newDestinationTasks,
      };

      const newDataList = [...dataList];

      newDataList[sourceTaskListIndex] = newSourceTaskList;
      newDataList[destinationTaskListIndex] = newDestinationTaskList;

      onMoveTaskList(
        dataList[sourceTaskListIndex].id,
        dataList[destinationTaskListIndex].id,
        dataList[sourceTaskListIndex].tasks[source.index].id,
        newDataList,
        destinationTaskIndex !== undefined
          ? dataList[destinationTaskListIndex].tasks[destinationTaskIndex].id
          : undefined,
        orderTasks,
      );
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
        const widthTask = index === 0 ? widthValue - 107 : widthValue;
        const widthSubTask = index === 0 ? widthValue - 95 : widthValue;
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

  const changeNameTask = (event) => {
    setTaskName(event.target.value);
    setTaskIdSelected(event.target.name);
    setErrorTaskName("");
  };

  const label = useMemo(() => {
    return commonT("createNew");
  }, [commonT]);

  const onKeyDownTaskName = async (
    event: React.KeyboardEvent<HTMLDivElement>,
    taskListId,
    taskId,
  ) => {
    if (event.key !== "Enter") return;
    const nameTrimmed = taskName?.trim();
    if (nameTrimmed) {
      const newItem = await onCreateSubTaskQuick(
        {
          task_list: "",
          name: nameTrimmed,
          description: "",
          end_date: "",
          start_date: "",
        },
        taskListId,
        taskId,
      );
      if (newItem) {
        setTaskName("");
        onAddSnackbar(
          projectT("detailTasks.notification.taskSuccess", { label }),
          "success",
        );
      }
    } else {
      setErrorTaskName(
        commonT("form.error.required", {
          name: projectT("detailTasks.form.title.name"),
        }),
      );
    }
  };

  const changeAssignerTask = async ({ taskListId, taskId, subTaskId, newValue }) => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateTask(
        { owner: newValue },
        taskListId,
        taskId,
        subTaskId,
      );
      if (newData) {
        onAddSnackbar(
          projectT("taskDetail.notification.assignSuccess"),
          "success",
        );
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  }

  const changeStatusTask = async ({ taskListId, taskId, subTaskId, newValue }) => {
    try {
      if (!newValue || !taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateTask(
        { status: newValue },
        taskListId,
        taskId,
        subTaskId,
      );
      if (newData) {
        onAddSnackbar(
          projectT("detail.notification.changeStatusSuccess"),
          "success",
        );
        // setStatus(newValue)
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  }

  useEventListener("scroll", onScroll, undefined, SCROLL_ID);

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
    return () => {
      onResetTasks();
    };
  }, [onResetTasks]);

  useEffect(() => {
    if (!isReady || !projectId) return;

    onGetTasksOfProject(projectId, {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      ...initQuery,
    });
  }, [initQuery, isReady, onGetTasksOfProject, projectId]);

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
        error={error as string}
        noData={!isIdle && totalItems === 0}
        display={{ xs: "none", md: "flex" }}
        position="sticky"
        top={{ xs: baseTop + 22 }}
        zIndex={12}
        hasSelectAll
      >
        <Box
          sx={{
            backgroundColor: "grey.50",
            py: 0,
          }}
        >
          <FormControlLabel
            control={<Checkbox {...checkboxProps} />}
            label={checkboxLabel}
            style={{ marginLeft: 0 }}
          />
        </Box>
      </TableLayout>

      <DragDropContext onDragStart={onDraggingTrue} onDragEnd={onDragEnd}>
        {dataList.map((taskListItem, indexTaskList) => {
          const isChecked = selectedList.some(
            (selected) =>
              !selected?.subTaskId &&
              !selected.taskId &&
              selected?.taskListId === taskListItem.id,
          );

          return (
            <DroppableTaskList
              key={taskListItem.id}
              id={taskListItem.id}
              name={taskListItem.name}
              count={taskListItem.tasks.length}
              checked={isChecked}
              onChange={onToggleTaskList(!isChecked, taskListItem)}
              setSelectedList={setSelectedList}
              isDragging={isDragging}
              index={indexTaskList}
            >
              {taskListItem.tasks.map((task, taskIndex) => {
                const isChecked = selectedList.some(
                  (selected) =>
                    !selected?.subTaskId && selected?.taskId === task.id,
                );

                const isHide = hideIds.includes(task.id);

                return (
                  <DraggableTask
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
                    isHide={isHide}
                    isHovered={hoveredId === task.id}
                    onMouseEnter={() => setHoveredId(task.id)}
                    onMouseLeave={() => setHoveredId(undefined)}
                    setHideIds={setHideIds}
                  >
                    <Stack
                      width="100%"
                      overflow="hidden"
                      sx={{
                        // transform: "translateX(-45px)",
                        ml: -5.625,
                      }}
                    >
                      <Stack
                        direction={{ md: "row" }}
                        alignItems={{
                          xs: "flex-start",
                          md: "center",
                        }}
                        minHeight={38}
                        maxHeight={{ md: 38 }}
                        width="100%"
                        sx={{ ...sx.task, ml: 4 }}
                        // sx={sx.task}
                        overflow="hidden"
                        borderBottom={{ md: "1px solid" }}
                        borderColor={{ md: "grey.100" }}
                      >
                        <Content
                          color="text.primary"
                          fontWeight={600}
                          textAlign="left"
                          noWrap
                          tooltip={task.name}
                          onClick={onSetTask(task, taskListItem.id, task.id, undefined, taskListItem.name, task.name)}
                        >
                          {task.name}
                        </Content>
                        <Content sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                          <AssignerTask value={task?.owner?.id} onHandler={(newValue) => changeAssignerTask({ taskListId: taskListItem.id, taskId: task.id, subTaskId: '', newValue })} placeholder={task?.owner ? '' : commonT("form.title.noAssigner")} />
                        </Content>
                        <Content>{formatDate(task?.start_date)}</Content>
                        <Content>{formatDate(task?.end_date)}</Content>
                        <Content noWrap={false} whiteSpace="nowrap" sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingX: '0' }}>
                          <SelectStatusTask value={task.status} onHandler={(newValue) => changeStatusTask({ taskListId: taskListItem.id, taskId: task.id, subTaskId: '', newValue })} />
                        </Content>
                        <Content sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Description>{task?.description}</Description>
                        </Content>
                      </Stack>
                      {!isHide && (
                        <>
                          <Droppable droppableId={task.id}>
                            {(taskDropProvided) => (
                              <div
                                ref={taskDropProvided.innerRef}
                                {...taskDropProvided.droppableProps}
                                style={{ minHeight: 1 }}
                              >
                                {task?.sub_tasks?.map((subTask) => {
                                  const isChecked = selectedList.some(
                                    (item) => item?.subTaskId === subTask.id,
                                  );
                                  return (
                                    <>
                                      <Stack
                                        key={subTask.id}
                                        direction="row"
                                        alignItems="center"
                                        minHeight={38}
                                        overflow="hidden"
                                        borderBottom={{
                                          md: "1px solid",
                                        }}
                                        borderColor={{
                                          md: "grey.100",
                                        }}
                                        maxHeight={{ md: 38 }}
                                        sx={{
                                          "& >.checkbox": {
                                            opacity: isChecked ? 1 : 0,
                                            userSelect: isChecked
                                              ? undefined
                                              : "none",
                                          },
                                          "&:hover >.checkbox": {
                                            opacity: 1,
                                          },
                                        }}
                                      >
                                        <Checkbox
                                          className="checkbox"
                                          size="small"
                                          checked={isChecked}
                                          onChange={onToggleSubTask(
                                            taskListItem,
                                            task,
                                            subTask,
                                          )}
                                        />
                                        <Stack
                                          direction={{
                                            md: "row",
                                          }}
                                          alignItems={{
                                            xs: "flex-start",
                                            md: "center",
                                          }}
                                          sx={sx.subTask}
                                          overflow="hidden"
                                        >
                                          <Content
                                            color="text.primary"
                                            textAlign="left"
                                            noWrap
                                            tooltip={subTask.name}
                                            onClick={onSetTask(
                                              subTask,
                                              taskListItem.id,
                                              task.id,
                                              subTask.id,
                                              taskListItem.name,
                                              task.name
                                            )}
                                          >
                                            {subTask.name}
                                          </Content>
                                          <Content sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                                            <AssignerTask value={subTask?.owner?.id} onHandler={(newValue) => changeAssignerTask({ taskListId: taskListItem.id, taskId: task.id, subTaskId: subTask.id, newValue })} placeholder={subTask?.owner ? '' : commonT("form.title.noAssigner")} />
                                          </Content>
                                          <Content>
                                            {formatDate(subTask?.start_date)}
                                          </Content>
                                          <Content>
                                            {formatDate(subTask?.end_date)}
                                          </Content>
                                          <Content
                                            noWrap={false}
                                            whiteSpace="nowrap"
                                            sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingX: '0' }}
                                          >
                                            <SelectStatusTask value={subTask.status} onHandler={(newValue) => changeStatusTask({ taskListId: taskListItem.id, taskId: task.id, subTaskId: subTask.id, newValue })} />
                                          </Content>

                                          <Content sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                            <Description>
                                              {subTask.description}
                                            </Description>
                                          </Content>
                                        </Stack>
                                        <MoreList
                                          sx={{
                                            display: { xs: "none", md: "flex" },
                                          }}
                                          selectedList={selectedList.length ? selectedList : [directlySelected(taskListItem, task, subTask)]}
                                          onReset={onResetSelected}
                                        />
                                      </Stack>
                                    </>
                                  );
                                })}
                                {taskDropProvided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <Stack
                            width="100%"
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <PlusIcon />
                            <TextField
                              name={task.id}
                              label={projectT(
                                "detailTasks.addNewSubTaskPlaceholder",
                              )}
                              value={task.id == taskIdSelected ? taskName : ""}
                              onKeyDown={(e) =>
                                onKeyDownTaskName(e, taskListItem.id, task.id)
                              }
                              fullWidth
                              variant="filled"
                              size="small"
                              onChange={changeNameTask}
                              sx={{
                                "& >div": {
                                  bgcolor: "transparent!important",
                                  "&:after": {
                                    borderBottomColor: "green !important",
                                  },
                                  "&:before": {
                                    borderBottomColor: "#999999 !important",
                                  },
                                },
                                "& input": {
                                  fontSize: 15,
                                  paddingTop: "17px !important",
                                },
                                width: "35% !important",
                                "& label.Mui-focused": {
                                  color: "green",
                                },
                                "& >label": {
                                  fontWeight: "600 !important",
                                  fontSize: "14px",
                                  color: isDarkMode
                                    ? "#ffffff"
                                    : "#999999 !important",
                                },
                              }}
                            />
                          </Stack>

                          {!!errorTaskName && (
                            <Text variant="caption" color="error">
                              {errorTaskName}
                            </Text>
                          )}
                        </>
                      )}
                    </Stack>
                    <MoreList
                      sx={{ display: { xs: "none", md: "flex", position: 'relative', right: '26px' } }}
                      selectedList={selectedList.length ? selectedList : [directlySelected(taskListItem, task)]}
                      onReset={onResetSelected}
                    />
                  </DraggableTask>
                );
              })}
            </DroppableTaskList>
          );
        })}
        {isFetching && (
          <CircularProgress
            size={20}
            sx={{ mx: "auto", my: 1 }}
            color="primary"
          />
        )}
      </DragDropContext>

      <Loading open={isProcessing} />

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



const Content = (props: TextProps) => {
  const { children = "--", sx, onClick, ...rest } = props;

  const additionalSx = useMemo(() => (onClick ? sxLink : {}), [onClick]);

  return (
    <Text
      px={2}
      onClick={onClick}
      variant="body2"
      color="grey.400"
      textAlign={{ md: "center" }}
      overflow="hidden"
      sx={{ ...additionalSx, ...sx }}
      width="100%"
      noWrap
      {...rest}
    >
      {typeof children === "number" ? formatNumber(children) : children}
    </Text>
  );
};

const Description = (props: BoxProps) => {
  const { children = "--" } = props;
  const ref = useRef<HTMLElement | null>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useEffect(() => {
    setIsOverflow((ref.current?.scrollHeight ?? 0) > 38);
  }, []);

  if (!children) return <Content />;

  return (
    <Box
      component="p"
      ref={ref}
      sx={{
        fontSize: 14,
        px: 2,
        m: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
        whiteSpace: "nowrap",
        maxHeight: 34,
        "& > p": {
          m: 0,
        },
        "& *": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "85%",
        },
      }}
      className="html"
      dangerouslySetInnerHTML={{
        __html: children,
      }}
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

const getArrayTagsHtmlString = (str) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr = [...(doc.body.childNodes as unknown as any[])].map(
    (child) => child.outerHTML || child.textContent,
  );
  return arr;
};

const getChild = (children: string, isOverflow: boolean) => {
  if (!isOverflow) return children;
  const rawFirst = getArrayTagsHtmlString(children)?.[0] as string | undefined;
  if (!rawFirst) return children;

  const first = rawFirst[0] + rawFirst.slice(1).replace("<", "...<");

  return children.replace(rawFirst, first);
};
