import React from "react";
import { Action } from "../components/TodoList/SubItem";

const useItemAction = () => {
  const onDuplicate = () => {
    console.log("duplicate");
  };
  const onRemove = () => {
    console.log("remove");
  };

  const onAction = (action: Action) => {
    switch (action) {
      case Action.DUPLICATE:
        onDuplicate();
        break;
      case Action.DELETE:
        onRemove();
        break;
      default:
    }
  };
  return {
    onAction,
  };
};

export default useItemAction;
