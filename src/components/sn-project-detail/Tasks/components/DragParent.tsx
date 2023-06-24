import {
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  popoverClasses,
} from "@mui/material";
import { Button, Checkbox, IconButton, Text } from "components/shared";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import useToggle from "hooks/useToggle";
import CaretIcon from "icons/CaretIcon";
import DuplicateIcon from "icons/DuplicateIcon";
import MoreDotIcon from "icons/MoreDotIcon";
import MoveArrowIcon from "icons/MoveArrowIcon";
import PencilIcon from "icons/PencilIcon";
import PlusIcon from "icons/PlusIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import { HTMLAttributes, memo, MouseEvent, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Form from "../Form";
import { DataAction } from "constant/enums";
import { TaskData, TaskListData } from "store/project/actions";
import { useTasksOfProject } from "store/project/selectors";
import TaskListForm from "../TaskListForm";
import MoveTaskList from "../MoveTaskList";

type DragParentProps = {
  id: string;
  index: number;
  count: number;
  name: string;
  checked: boolean;
  onChange: () => void;
} & HTMLAttributes<HTMLDivElement>;

type MoreListProps = {
  id: string;
  name: string;
};

const DragParent = (props: DragParentProps) => {
  const { id, index, count, name, checked, onChange, ...rest } = props;
  const projectT = useTranslations(NS_PROJECT);
  const { onCreateTask } = useTasksOfProject();

  const [isShow, , , onToggle] = useToggle(count < 4);
  const [isShowCreate, onShowCreate, onHideCreate] = useToggle();

  return (
    <Draggable draggableId={id} index={index} isDragDisabled>
      {(provided) => {
        return (
          <>
            <div ref={provided.innerRef} {...rest}>
              <Stack
                direction="row"
                alignItems="center"
                height={48}
                pl={2}
                width="100%"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox checked={checked} onChange={onChange} />
                  <IconButton
                    noPadding
                    sx={{
                      ml: 6,
                      transform: isShow ? undefined : "rotate(180deg)",
                    }}
                    onClick={onToggle}
                  >
                    <CaretIcon sx={{ color: "grey.300" }} />
                  </IconButton>
                  <Text
                    mr={1}
                    variant="h5"
                    color="grey.300"
                    whiteSpace="nowrap"
                  >
                    {`${name} (${count})`}
                  </Text>
                  <MoreList id={id} name={name} />
                </Stack>
                <Button
                  onClick={onShowCreate}
                  startIcon={<PlusIcon />}
                  variant="text"
                  size="small"
                  color="secondary"
                  sx={{ mr: 4 }}
                >
                  {projectT("detailTasks.addNewTask")}
                </Button>
              </Stack>

              {isShow && props.children}
            </div>
            {isShowCreate && (
              <Form
                open={isShowCreate}
                onClose={onHideCreate}
                type={DataAction.CREATE}
                onSubmit={onCreateTask}
                taskListId={id}
              />
            )}
          </>
        );
      }}
    </Draggable>
  );
};

export default memo(DragParent);

enum Action {
  RENAME = 1,
  DUPLICATE,
  MOVE,
  DELETE,
}

const MoreList = (props: MoreListProps) => {
  const { id, name } = props;

  const { onUpdateTaskList: onUpdateTaskListAction } = useTasksOfProject();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const commonT = useTranslations(NS_COMMON);

  const [type, setType] = useState<Action | undefined>();

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onSetTType = (action?: Action) => {
    return () => {
      onClose();
      setType(action);
    };
  };

  const onUpdateTaskList = async (values: Omit<TaskListData, "project">) => {
    return await onUpdateTaskListAction(id, values.name);
  };

  return (
    <>
      <IconButton noPadding onClick={onOpen}>
        <MoreDotIcon fontSize="medium" sx={{ color: "grey.300" }} />
      </IconButton>
      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            minWidth: 150,
            maxWidth: 150,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
            },
          },
        }}
      >
        <Stack
          py={2}
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderTopWidth: 0,
            borderColor: "grey.100",
            borderRadius: 1,
          }}
        >
          <MenuList component={Box} sx={{ py: 0 }}>
            <MenuItem
              onClick={onSetTType(Action.RENAME)}
              component={ButtonBase}
              sx={sxConfig.item}
            >
              <PencilIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                {commonT("rename")}
              </Text>
            </MenuItem>
            <MenuItem component={ButtonBase} sx={sxConfig.item}>
              <DuplicateIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                {commonT("duplicate")}
              </Text>
            </MenuItem>
            <MenuItem
              onClick={onSetTType(Action.MOVE)}
              component={ButtonBase}
              sx={sxConfig.item}
            >
              <MoveArrowIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                {commonT("move")}
              </Text>
            </MenuItem>
            <MenuItem component={ButtonBase} sx={sxConfig.item}>
              <TrashIcon color="error" fontSize="medium" />
              <Text ml={2} variant="body2" color="error.main">
                {commonT("delete")}
              </Text>
            </MenuItem>
          </MenuList>
        </Stack>
      </Popover>

      {type === Action.RENAME && (
        <TaskListForm
          open
          onClose={onSetTType()}
          type={DataAction.UPDATE}
          initialValues={{ name }}
          onSubmit={onUpdateTaskList}
        />
      )}
      {type === Action.MOVE && (
        <MoveTaskList
          oldTaskListId={id}
          taskId={id}
          open
          onClose={onSetTType()}
        />
      )}
    </>
  );
};

const sxConfig = {
  item: {
    width: "100%",
    py: 1,
    px: 2,
  },
};
