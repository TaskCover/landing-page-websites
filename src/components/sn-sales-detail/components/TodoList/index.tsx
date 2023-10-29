import { Stack, TextField } from "@mui/material";
import { Date } from "components/Filters";
import Loading from "components/Loading";
import { Collapse, Text } from "components/shared";
import { DATE_FORMAT_HYPHEN, NS_COMMON, NS_SALES } from "constant/index";
import useToggle from "hooks/useToggle";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import React, {
  ChangeEvent,
  memo,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Controller, useForm, useFormContext, useWatch } from "react-hook-form";
import { useSaleDetail, useSalesTodo } from "store/sales/selectors";
import { User } from "constant/types";
import AssignTodo from "../AssignTodo";
import SubItem from "./SubItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TodoItemData } from "store/sales/actions";
import { Todo } from "store/sales/reducer";
import { TaskDetail } from "store/project/reducer";
import { getMessageErrorByAPI } from "utils/index";
import { reorderPriority } from "components/sn-sales-detail/helpers";
import { on } from "events";
import { useSnackbar } from "store/app/selectors";

export const TodoName = ({
  onSubmit,
  value = "",
  owner,
  onBlur,
  autoFocus,
  isAssign,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (name: TodoItemData) => Promise<any>;
  value?: string;
  owner?: User;
  onBlur?: () => void;
  autoFocus?: boolean;
  isAssign?: boolean;
}) => {
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const [name, setName] = useState<string>(value);
  const [error, setError] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value[value.length - 1] === "\n") {
      setName(value.slice(0, -1));
      return;
    }
    setName(event.target.value);
    setError("");
  };

  const { saleDetail } = useSaleDetail();
  const { control, getValues, setValue } = useFormContext();

  const handleSubmit = async () => {
    const nameTrimmed = name?.trim();

    if (nameTrimmed) {
      setValue("todoItem.name", nameTrimmed);
      await onSubmit(getValues("todoItem"));
    } else {
      setError(
        commonT("form.error.required", {
          name: salesT("form.title.name"),
        }),
      );
    }
    setName("");
  };

  const onKeyDown = async (event, isBlur: boolean) => {
    if (isBlur && onBlur) {
      onBlur();
      handleSubmit();
      return;
    }
    if (event.key !== "Enter") return;
    handleSubmit();
  };

  return (
    <Grid2
      container
      // direction={{
      //   xs: "column",
      //   sm: "row",
      // }}
      justifyContent="space-between"
      width="100%"
      spacing={2}
    >
      <Grid2 xs={12} md={isAssign ? 7 : 12}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {isAssign && (
            <PlusIcon
              onClick={(event) =>
                onKeyDown(
                  {
                    key: "Enter",
                  } as React.KeyboardEvent<HTMLInputElement>,
                  false,
                )
              }
              width={24}
              height={24}
            />
          )}
          <TextField
            multiline
            onBlur={(e) => onKeyDown(e, true)}
            value={name}
            onKeyDown={(e) => onKeyDown(e, false)}
            fullWidth
            variant="filled"
            size="small"
            placeholder={salesT("detail.todoList.addNew")}
            focused
            onChange={onChange}
            color="success"
            autoFocus={autoFocus}
            sx={{
              "& >div": {
                bgcolor: "transparent!important",
              },
              "& input": {
                fontSize: 15,
              },
              "& .MuiInputBase-root": {
                padding: 0,
              },

              padding: 0,
            }}
          />
          {!!error && (
            <Text variant="caption" color="error">
              {error}
            </Text>
          )}
        </Stack>
      </Grid2>
      {isAssign && (
        <Grid2 xs={12} md={5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Controller
              name="todoItem.expiration_date"
              control={control}
              render={({ field }) => {
                const { onChange: onValueChange, ...rest } = field;
                const onChangeDate = (e, value) => {
                  onValueChange(value);
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
              name="todoItem.owner"
              control={control}
              render={({ field }) => {
                const { onChange, ...rest } = field;
                const onAssign = (name: string, value: User) => {
                  onChange(value.id);
                };
                return <AssignTodo {...rest} onAssign={onAssign} />;
              }}
            />
            {/* <Assign owner={owner} todoId={""} />
        <Actions todoId={""} onChangeAction={() => console.log("change")} /> */}
          </Stack>
        </Grid2>
      )}
    </Grid2>
  );
};

const TODO_PREFIX = "detail.todoList";

const TodoList = () => {
  const { saleDetail } = useSaleDetail();
  const { onAddSnackbar } = useSnackbar();
  const [isProcessing, onProcessingTrue, onProcessingFalse] = useToggle();
  const salesT = useTranslations(NS_SALES);
  const commonT = useTranslations(NS_COMMON);
  const { control, getValues, setValue } = useFormContext();
  const { onCreateTodo, onUpdateTodo, onUpdatePriority } = useSalesTodo();

  const todoListForm = useWatch({ control, name: "todo_list" });

  const todoList = useMemo(() => {
    return (Object.values(todoListForm ?? {}) as Array<Todo>).sort(
      (a, b) => a.priority - b.priority,
    );
  }, [todoListForm]);

  const onSubmit = async (value) => {
    onCreateTodo({
      dealId: saleDetail?.id || "",
      data: {
        ...value,
        priority: value.priority || todoList.length + 1,
        owner: value.owner?.id || value.owner,
      },
    });
  };
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    const todoListArray = Object.values(todoList) as Array<Todo>;
    const reorderedObject = reorderPriority(
      todoListArray,
      destination?.index ?? 0,
      source?.index ?? 0,
    ) as Record<string, Todo>;

    setValue("todo_list", reorderedObject);
    try {
      await Promise.all(
        Object.values(reorderedObject).map((todo) => {
          return onUpdatePriority(todo.id, {
            dealId: saleDetail?.id || "",
            priority: todo.priority,
          });
        }),
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  return (
    <>
      <Collapse
        initCollapse
        label={
          <Text color="text.primary" variant="h6" textTransform="uppercase">
            {`${salesT(`${TODO_PREFIX}.title`)} (${
              saleDetail?.todo_list?.length ?? 0
            })`}
          </Text>
        }
        sx={{
          backgroundColor: "background.paper",
          marginBottom: 2,
        }}
      >
        <Stack
          mt={2}
          overflow={{
            xs: "auto",
            lg: "hidden",
          }}
          width={{
            xs: "100%",
            md: "calc(80% - 48px)",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {todoList?.map((todo, index) => (
                    <SubItem
                      key={todo.id}
                      todo={todo}
                      dealId={saleDetail?.id || ""}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <TodoName isAssign onSubmit={onSubmit} />
          </Stack>
        </Stack>
      </Collapse>
      <Loading open={isProcessing} />
    </>
  );
};

export default memo(TodoList);
