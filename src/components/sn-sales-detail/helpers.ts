import { SALE_BILL_TYPE } from "constant/enums";
import { Todo } from "store/sales/reducer";

export const SALE_BILL_TYPE_LABEL = {
  [SALE_BILL_TYPE.FIX]: "detail.service.billType.fix",
  [SALE_BILL_TYPE.ACTUAL]: "detail.service.billType.actual",
  [SALE_BILL_TYPE.NON_BILLABLE]: "detail.service.billType.nonBillable",
};

export const COLOR_BILL_TYPE = {
  [SALE_BILL_TYPE.FIX]: "warning",
  [SALE_BILL_TYPE.ACTUAL]: "success",
  [SALE_BILL_TYPE.NON_BILLABLE]: "error",
};

export const reorderPriority = (list: Array<Todo>, index, sourceIndex) => {
  if (!list) return [];
  const newArray = [...list];
  const [removed] = newArray.splice(sourceIndex, 1);
  newArray.splice(index, 0, removed);
  const newList = newArray.map((item, index) => {
    return {
      ...item,
      priority: index + 1,
    };
  });
  const result = newList.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  return result;
};
