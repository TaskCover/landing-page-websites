import { Status } from "constant/enums";

export const reorder = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
