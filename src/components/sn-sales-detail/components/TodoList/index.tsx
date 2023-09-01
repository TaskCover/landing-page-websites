import { Stack, TextField } from "@mui/material";
import { Date } from "components/Filters";
import Loading from "components/Loading";
import { Collapse, Text } from "components/shared";
import { DATE_FORMAT_HYPHEN, NS_COMMON, NS_SALES } from "constant/index";
import useToggle from "hooks/useToggle";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, memo, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Controller, useForm, useFormContext, useWatch } from "react-hook-form";
import { useSaleDetail, useSalesTodo } from "store/sales/selectors";
import { User } from "constant/types";
import AssignTodo from "../AssignTodo";
import SubItem from "./SubItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TodoItemData } from "store/sales/actions";

export const TodoName = ({
  onSubmit,
  value = "",
  owner,
  autoFocus,
  isAssign,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (name: TodoItemData) => Promise<any>;
  value?: string;
  owner?: User;
  autoFocus?: boolean;
  isAssign?: boolean;
}) => {
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const [name, setName] = useState<string>(value);
  const [error, setError] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError("");
  };

  const { saleDetail } = useSaleDetail();
  const { control, getValues, setValue } = useFormContext();

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const nameTrimmed = name?.trim();
    if (nameTrimmed) {
      setValue("todoItem.name", nameTrimmed);
      await onSubmit(getValues("todoItem"));
      setName("");
    } else {
      setError(
        commonT("form.error.required", {
          name: salesT("form.title.name"),
        }),
      );
    }
  };

  return (
    <Grid2
      container
      // direction={{
      //   xs: "column",
      //   sm: "row",
      // }}
      width="100%"
      spacing={2}
    >
      <Grid2 xs={12} md={7}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {isAssign && <PlusIcon width={24} height={24} />}
          <TextField
            value={name}
            onKeyDown={onKeyDown}
            fullWidth
            variant="filled"
            size="small"
            onChange={onChange}
            autoFocus={autoFocus}
            sx={{
              "& >div": {
                bgcolor: "transparent!important",
              },
              "& input": {
                fontSize: 15,
              },
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
              name="todoItem.due_date"
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
                  onChange(value);
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
  const [isProcessing, onProcessingTrue, onProcessingFalse] = useToggle();
  const salesT = useTranslations(NS_SALES);
  const { control, getValues, setValue } = useFormContext();
  const { onCreateTodo, onUpdateTodo } = useSalesTodo();

  const onSubmit = async (value) => {
    onCreateTodo({
      dealId: saleDetail?.id || "",
      data: {
        ...value,
        owner: value.owner?.id,
      },
    });
  };

  const onDragEnd = async (result: DropResult) => {
    console.log("🚀 ~ file: index.tsx:163 ~ onDragEnd ~ result:", result);
    // onUpdateTodo({
    //   dealId: saleDetail?.id || "",
    //   data: {
    //     pri
    // });
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
      >
        <Stack
          mt={2}
          overflow={{
            xs: "auto",
            md: "hidden",
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
                  {saleDetail?.todo_list?.map((todo, index) => (
                    <SubItem
                      key={todo.id}
                      todo={todo}
                      dealId={saleDetail.id}
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
