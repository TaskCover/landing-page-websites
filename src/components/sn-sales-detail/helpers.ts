import { Todo } from "store/sales/reducer";

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
