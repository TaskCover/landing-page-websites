import { useRef, DependencyList } from "react";
import { deepEqual } from "../utils/helpers";

export const useDeepCompareMemoize = (value: DependencyList) => {
  const ref = useRef<DependencyList>([]);
  if (!deepEqual(value, ref.current)) ref.current = value;
  return ref.current;
};
