import React from "react";
import { Action } from "../components/TodoList/SubItem";
import { useFieldArray, useFormContext } from "react-hook-form";

const useItemAction = () => {
  const { control } = useFormContext();

  const onDuplicate = () => {
    console.log("duplicate");
  };
  const onRemove = (name, id) => {
    console.log("remove");
  };

  const onAction = (action: Action) => {
    switch (action) {
      case Action.DUPLICATE:
        onDuplicate();
        break;
      case Action.DELETE:
        onRemove("", "");
        break;
      default:
    }
  };
  return {
    onAction,
  };
};

export default useItemAction;
