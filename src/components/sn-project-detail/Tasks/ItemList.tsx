"use client";

import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { reorder, DragAndDrop, Drop, Drag } from "./components";
import { Button, Checkbox, Text, TextProps } from "components/shared";
import { Stack, StackProps, TableRow } from "@mui/material";
import Avatar from "components/Avatar";
import { formatNumber } from "utils/index";
import TextStatus from "components/TextStatus";
import { BodyCell, CellProps, TableLayout } from "components/Table";
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
import { useTasksOfProject } from "store/project/selectors";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Form from "./Form";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import { TaskList } from "store/project/reducer";

const ItemList = () => {
  const [categories, setCategories] = useState([
    // [
    {
      id: "ID01",
      name: "Category 1",
      items: [
        { id: "Sub 01", name: "First" },
        { id: "Sub 02", name: "Second" },
      ],
    },
    {
      id: "ID02",
      name: "Category 2",
      items: [
        { id: "Sub 03", name: "Third" },
        { id: "Sub 04", name: "Fourth" },
      ],
    },
    // ],
    // [
    //   {
    //     id: "ID03",
    //     name: "Category 3",
    //     items: [
    //       { id: "Sub 05", name: "First" },
    //       { id: "Sub 06", name: "Second" },
    //     ],
    //   },
    //   {
    //     id: "ID04",
    //     name: "Category 4",
    //     items: [
    //       { id: "Sub 07", name: "Third" },
    //       { id: "Sub 08", name: "Fourth" },
    //     ],
    //   },
    // ],
  ]);

  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    pageSize,
    pageIndex,
    totalPages,
    onCreateTask,
    id,
    onGetTasksOfProject,
    onMoveTask,
  } = useTasksOfProject();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]);

  const [dataList, setDataList] = useState<TaskList[]>([]);

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
      { value: projectT("detailTasks.note"), width: "15%" },
    ],
    [commonT, projectT],
  );

  const headerList = useMemo(() => {
    return isMdSmaller ? [] : desktopHeaderList;
  }, [desktopHeaderList, isMdSmaller]) as CellProps[];

  useEffect(() => {
    if (!isReady || !projectId || id === projectId) return;
    onGetTasksOfProject(projectId, { ...DEFAULT_PAGING, ...initQuery });
  }, [id, initQuery, isReady, onGetTasksOfProject, projectId]);

  const onDragEnd = async (result: DropResult) => {
    const { type, source, destination } = result;
    if (!destination) return;

    const sourceTaskListId = source.droppableId;
    const destinationTaskListId = destination.droppableId;
    console.log(
      type,
      destination,
      sourceTaskListId,
      destinationTaskListId,
      source,
      dataList?.[destination.index]?.tasks?.[source.index]?.name,
    );
    const indexSourceTaskList = dataList.findIndex(
      (taskListItem) => taskListItem.id === sourceTaskListId,
    );
    const taskId = dataList?.[indexSourceTaskList]?.tasks?.[source.index]?.id;

    // Reordering items
    if (type === "droppable-task") {
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

        setDataList(updatedDataList);
        try {
          const a = await onMoveTask(
            sourceTaskListId,
            destinationTaskListId,
            taskId,
          );
          console.log("a", a);
        } catch (error) {
          console.log("Error", error);
        }
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

        setDataList(updatedDataList);

        try {
          const a = await onMoveTask(
            sourceTaskListId,
            destinationTaskListId,
            taskId,
          );
          console.log("a", a);
        } catch (error) {
          console.log("Error", error);
        }
      }
    }
  };

  const [sx, setSx] = useState({
    task: {},
    subTask: {},
  });

  const [dataIds, setDataIds] = useState<{
    taskId?: string;
    taskListId?: string;
  }>({});

  const isShowCreate = useMemo(
    () => Boolean(dataIds?.taskId && dataIds?.taskListId),
    [dataIds?.taskId, dataIds?.taskListId],
  );

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

  return (
    <Stack flex={1} pb={3}>
      <TableLayout onLayout={onLayout} headerList={headerList} flex="unset">
        <></>
      </TableLayout>

      <DragAndDrop onDragEnd={onDragEnd}>
        <Drop id="droppable" type="droppable-taskList">
          {dataList.map((taskListItem, taskListIndex) => (
            <DragParent
              className="draggable-taskList"
              key={taskListItem.id}
              id={taskListItem.id}
              index={taskListIndex}
              name={taskListItem.name}
              count={taskListItem.tasks.length}
            >
              <Drop
                key={taskListItem.id}
                id={taskListItem.id}
                type="droppable-task"
              >
                {taskListItem.tasks.map((task, taskIndex) => (
                  <Drag
                    className="draggable"
                    key={task.id}
                    id={task.id}
                    index={taskIndex}
                  >
                    <Stack width="100%">
                      <Stack
                        direction="row"
                        alignItems="center"
                        height={48}
                        width="100%"
                        sx={sx.task}
                      >
                        <Content
                          color="text.primary"
                          fontWeight={600}
                          textAlign="left"
                          noWrap
                          tooltip={task.name}
                        >
                          {task.name}
                        </Content>
                        <Assigner>{task?.owner?.fullname}</Assigner>
                        <Content>{formatNumber(task.estimated_hours)}</Content>
                        <Content>{formatNumber(task?.working_hours)}</Content>
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
                      {task?.sub_tasks?.map((subTask) => (
                        <Stack
                          key={subTask.id}
                          direction="row"
                          alignItems="center"
                          height={48}
                        >
                          <Checkbox />
                          <Stack
                            direction="row"
                            alignItems="center"
                            sx={sx.subTask}
                          >
                            <Content
                              color="text.primary"
                              fontWeight={600}
                              textAlign="left"
                              noWrap
                              tooltip={subTask.name}
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
                      ))}
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
                ))}
              </Drop>
            </DragParent>
          ))}
        </Drop>
      </DragAndDrop>
      {isShowCreate && (
        <Form
          open
          onClose={onSetDataIds()}
          type={DataAction.CREATE}
          onSubmit={onCreateTask}
          taskListId={dataIds.taskListId as string}
          taskId={dataIds?.taskId}
        />
      )}
    </Stack>
  );
};

export default memo(ItemList);

const HEADER_LIST: CellProps[] = [
  { value: "Name", width: "30%", align: "left" },
  { value: "Assigner", width: "15%", align: "left" },
  { value: "Expect completion time", width: "12.5%" },
  { value: "Time taken", width: "12.5%" },
  { value: "Status", width: "15%" },
  { value: "Note", width: "15%" },
];

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
  const { children = "--", ...rest } = props;
  return (
    <Text
      px={2}
      variant="body2"
      color="grey.400"
      textAlign="center"
      overflow="hidden"
      {...rest}
    >
      {typeof children === "number" ? formatNumber(children) : children}
    </Text>
  );
};
