import { Stack, Checkbox } from "@mui/material";
import ConfirmDialog from "components/ConfirmDialog";
import Loading from "components/Loading";
import {
  DATE_FORMAT_FORM,
  DATE_FORMAT_HYPHEN,
  DATE_FORMAT_SLASH,
  NS_COMMON,
  NS_SALES,
} from "constant/index";
import useToggle from "hooks/useToggle";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSnackbar } from "store/app/selectors";
import { TodoName } from ".";
import { IconButton, Text } from "components/shared";
import AssignTodo from "../AssignTodo";
import { useSaleDetail, useSalesTodo } from "store/sales/selectors";
import { Todo } from "store/sales/reducer";
import { Option, User } from "constant/types";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";
import { Date } from "components/Filters";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TodoItemData } from "store/sales/actions";
import TrashIcon from "icons/TrashIcon";
import MoveDotIcon from "icons/MoveDotIcon";
import { formatDate } from "utils/index";

export enum Action {
  RENAME = 1,
  DELETE,
}
const SubItem = ({
  todo,
  dealId,
  index,
}: {
  todo: Todo;
  dealId: string;
  index: number;
}) => {
  const { id, is_done, name, owner } = todo;

  const { saleDetail } = useSaleDetail();
  const { onAddSnackbar } = useSnackbar();
  const { onDeleteTodo, onUpdateTodo } = useSalesTodo();
  const [isProcessing, onProcessingTrue, onProcessingFalse] = useToggle();

  const [action, setAction] = useState<Action | undefined>();
  const { control } = useFormContext();

  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const mappedOwner = useMemo(() => {
    if (!owner) return undefined;
    const ownerInSale = saleDetail?.members?.find(
      (member) => member.id === owner,
    );
    return ownerInSale ?? owner;
  }, [owner, saleDetail]);

  const { setValue, getValues } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpdateTodoList = async (value: TodoItemData) => {
    onUpdateTodo(id, {
      dealId: saleDetail?.id || "",
      data: {
        name: value.name,
      } as TodoItemData,
    });
  };

  const onChangeName = async (value: TodoItemData) => {
    onUpdateTodo(id, {
      dealId: saleDetail?.id || "",
      data: {
        name: value.name,
      } as TodoItemData,
    });
    setAction(undefined);
  };

  const onConvertToDoToTask = async () => {
    console.log("onConvertToDoToTask");
  };

  const onConvertToDoToSubTask = async () => {
    console.log("onConvertToDoToTask");
  };

  const onDelete = async () => {
    onDeleteTodo(id, saleDetail?.id || "");
    setAction(undefined);
  };

  const onChangeAction = (newAction?: Action) => {
    setAction(newAction);
  };

  const onChangeStatus = async (_, checked: boolean) => {
    onUpdateTodo(id, {
      dealId: saleDetail?.id || "",
      data: {
        is_done: !is_done,
      } as TodoItemData,
    });
  };

  const onResetAction = () => {
    setAction(undefined);
  };

  const onEditName = () => {
    setAction(Action.RENAME);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <Grid2 container alignItems="center" spacing={2}>
              <Grid2 container xs={12} md={7} alignItems="center" spacing={0.5}>
                <Grid2 xs={1}>
                  <IconButton noPadding {...provided.dragHandleProps}>
                    <MoveDotIcon fontSize="small" sx={{ color: "grey.A200" }} />
                  </IconButton>
                </Grid2>
                <Grid2 xs={2} md={1}>
                  <Checkbox
                    size="small"
                    checked={is_done}
                    onChange={onChangeStatus}
                  />
                </Grid2>
                <Grid2 xs={8} md={10}>
                  {action === Action.RENAME ? (
                    <TodoName onSubmit={onChangeName} value={name} autoFocus />
                  ) : (
                    <Text
                      variant="body2"
                      sx={{
                        textDecoration: is_done ? "line-through" : undefined,
                      }}
                      noWrap
                      textOverflow={"ellipsis"}
                      onClick={onEditName}
                      mt={0.25}
                    >
                      {name}
                    </Text>
                  )}
                </Grid2>
              </Grid2>

              <Grid2 xs={12} md={4} alignItems="center" spacing={1}>
                <Stack direction="row" alignItems={"center"} spacing={1}>
                  <Controller
                    name={`todo_list.${id}.expiration_date`}
                    control={control}
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      const onChangeDate = (e, value) => {
                        onChange(value);
                        onUpdateTodo(id, {
                          dealId: saleDetail?.id || "",
                          data: {
                            expiration_date: value,
                          } as TodoItemData,
                        });
                      };
                      return (
                        <Date
                          label={salesT("detail.todoList.dueDate")}
                          format={DATE_FORMAT_HYPHEN}
                          onChange={onChangeDate}
                          {...rest}
                        />
                      );
                    }}
                  />
                  <Controller
                    name={`todo_list.${id}.owner`}
                    control={control}
                    defaultValue={mappedOwner}
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      const onAssign = (name: string, value: User) => {
                        onChange(value.id);
                        onUpdateTodo(id, {
                          dealId: saleDetail?.id || "",
                          data: {
                            owner: value.id,
                          } as TodoItemData,
                        });
                      };

                      return <AssignTodo {...rest} onAssign={onAssign} />;
                    }}
                  />
                  {/* <Actions todoId={todoId} onChangeAction={onChangeAction} /> */}
                  <TrashIcon
                    onClick={() => onChangeAction(Action.DELETE)}
                    sx={{ cursor: "pointer" }}
                  />
                </Stack>
              </Grid2>
            </Grid2>
          </div>
        )}
      </Draggable>

      {action === Action.DELETE && (
        <ConfirmDialog
          onSubmit={onDelete}
          open
          onClose={onResetAction}
          title={commonT("confirmDelete.title")}
          content={commonT("confirmDelete.content")}
        />
      )}
      <Loading open={isProcessing} />
    </>
  );
};

export default SubItem;