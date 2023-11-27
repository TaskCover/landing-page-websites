import { useRef, useState } from "react";

const useDebounce = (
  callback: (...args: any[]) => unknown,
  timeout: number,
): [(...args: any[]) => unknown, boolean] => {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [isDone, setIsDone] = useState(false);
  timeout = timeout || 0;
  return [
    (...args) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
        setIsDone(true);
      }
      timerId.current = setTimeout(() => {
        setIsDone(false);
        callback(...args);
      }, timeout);
    },
    isDone,
  ];
};

export default useDebounce;
