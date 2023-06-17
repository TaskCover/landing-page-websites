import { AN_ERROR_TRY_AGAIN, DATE_FORMAT_SLASH } from "constant/index";
import { ItemListResponse, OptionFormatNumber } from "constant/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ReadonlyURLSearchParams } from "next/navigation";
import StringFormat from "string-format";

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

export const parseURLSearchParams = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
) => {
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

export const stringifyURLSearchParams = (data) => {
  data = cleanObject(data);
  if (!Object.keys(data).length) return "";
  return (
    "?" +
    Object.entries(data)
      .reduce((out: string[], [key, value]) => {
        if (Array.isArray(value)) {
          out = [...out, ...value.map((valueItem) => `${key}=${valueItem}`)];
        } else {
          out.push(`${key}=${value}`);
        }
        return out;
      }, [])
      .join("&")
  );
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

export const getFiltersFromQueries = (
  queries,
  skipValue = [undefined, null, ""],
) => {
  return Object.entries(queries).reduce((out, [key, value]) => {
    if (
      !["page", "size", "concat"].includes(key) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !skipValue.includes(value as any)
    ) {
      out[key] = value;
    }
    return out;
  }, {});
};

export const refactorRawItemListResponse = (rawData: {
  page: number;
  total: number;
  total_page: number;
  data: unknown[];
}) => {
  return {
    pageIndex: rawData.page + 1,
    totalItems: rawData.total,
    totalPages: rawData.total_page,
    items: rawData.data,
  } as ItemListResponse;
};

export const serverQueries = ({
  pageIndex,
  pageSize,
  ...rest
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => {
  return cleanObject({
    ...rest,
    page: pageIndex ? (pageIndex as number) - 1 : undefined,
    size: pageSize,
  });
};

export const formatDate = (
  date?: number | string,
  format?: string,
  fallback?: string,
) => {
  if (!date) return fallback ?? "";
  if (!format) format = DATE_FORMAT_SLASH;
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();

  if (year === 1 || year === 1970) return fallback ?? "";
  const day = `0${dateObj.getDate()}`.substr(-2);
  const month = `0${dateObj.getMonth() + 1}`.substr(-2);
  const hours = `0${dateObj.getHours()}`.substr(-2);
  const minutes = `0${dateObj.getMinutes()}`.substr(-2);
  const seconds = `0${dateObj.getSeconds()}`.substr(-2);
  let dateFormat = format.replace("yyyy", year.toString());
  dateFormat = dateFormat.replace("MM", month);
  dateFormat = dateFormat.replace("dd", day);
  dateFormat = dateFormat.replace("HH", hours);
  dateFormat = dateFormat.replace("mm", minutes);
  dateFormat = dateFormat.replace("ss", seconds);

  return dateFormat;
};

export const formatNumber = (
  number?: number | null | string,
  options: OptionFormatNumber = {},
) => {
  if (typeof number === "string") return number;
  const {
    numberOfFixed = 4,
    emptyText = "--",
    suffix,
    prefix = "",
    space = true,
    ...localeOption
  } = options;
  const suffixParsed = suffix ? `${space ? " " : ""}${suffix}` : "";
  if (!number && number !== 0) return emptyText + suffixParsed;
  const num = Number(number || 0);
  const maximumFractionDigits = Number.isInteger(num) ? 0 : numberOfFixed;
  return (
    prefix +
    num.toLocaleString("en-US", {
      maximumFractionDigits,
      ...localeOption,
    }) +
    suffixParsed
  );
};

export const getPath = (
  basePath: string,
  queries?: Params,
  data?: { [key: string]: string },
) => {
  queries = cleanObject(queries ?? {});
  const queryString = stringifyURLSearchParams(queries);
  const path = data ? StringFormat(basePath, data) : basePath;
  return path + queryString;
};

export const getFiltersIgnoreId = (filters) => {
  const _filters = { ...filters };
  delete _filters["id"];
  return _filters;
};
