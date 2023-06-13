import { AN_ERROR_TRY_AGAIN } from "constant/index";

export const parseHashURL = (value: string) => `#${value}`;

export const cleanObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsObject: { [key: string]: any },
  ignoreKeys: string[] = [],
) => {
  const cloneParamsObject = { ...paramsObject };
  for (const keyParam in paramsObject) {
    if (
      !ignoreKeys.includes(keyParam) &&
      (cloneParamsObject[keyParam] === null ||
        cloneParamsObject[keyParam] === "" ||
        cloneParamsObject[keyParam] === undefined)
    ) {
      delete cloneParamsObject[keyParam];
    }
  }
  return cloneParamsObject;
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const parseURLSearchParams = (searchParams: URLSearchParams) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = params[key]
      ? Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value]
      : value;
  });
  return params;
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getMessageErrorByAPI = (error) => {
  return typeof error === "string"
    ? error
    : error["message"] ?? AN_ERROR_TRY_AGAIN;
};

export const getDataFromKeys = (data, keys: string[]) => {
  return keys.reduce((outData, key) => {
    outData[key] = data[key];
    return outData;
  }, {});
};
