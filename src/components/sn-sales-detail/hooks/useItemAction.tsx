import React from "react";
import { Action } from "../components/TodoList/SubItem";
import {
  FieldValue,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import useHeaderServiceTable from "./useHeaderServiceTable";
import { ServiceColumn } from "./useGetHeaderColumn";
import { useSalesService } from "store/sales/selectors";

const useItemAction = (
  index: number,
  append: UseFieldArrayAppend<FieldValues, string>,
  remove: UseFieldArrayRemove,
  fields: Record<"id", string>[],
) => {
  const { control } = useFormContext();
  const { onShowColumn } = useHeaderServiceTable();
  const onDuplicate = (serviceId) => {
    const service = fields.find((item) => item.id === serviceId);

    append(service);
  };
  const onRemove = (name, serviceIndex) => {
    remove(serviceIndex);
    console.log("remove");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAction = (action: Action, data?: any) => {
    switch (action) {
      case Action.DUPLICATE:
        onDuplicate(data);
        break;
      case Action.DELETE:
        onRemove("", data);
        break;
      case Action.SHOW_DESCRIPTION:
        onShowColumn(ServiceColumn.DESCRIPTION);
        break;
      case Action.SHOW_DISCOUNT:
        onShowColumn(ServiceColumn.DISCOUNT);
        break;
      case Action.SHOW_ESTIMATE:
        onShowColumn(ServiceColumn.ESTIMATE);
        break;
      case Action.SHOW_FIXED_PRICE:
        onShowColumn(ServiceColumn.PRICE);
        break;
      case Action.SHOW_MARKUP:
        onShowColumn(ServiceColumn.MARK_UP);
        break;
      default:
    }
  };
  return {
    onAction,
  };
};

export default useItemAction;
