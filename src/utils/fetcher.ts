import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

const axiosTemplate = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export function get<Q, R>(url: string, config?: AxiosRequestConfig) {
  return extractAxiosResponse<R>(
    axiosTemplate
      .get<Q, AxiosResponse<R>>(url, config)
      .then((data) => data)
      .catch((e) => {
        return { ...e };
      })
  );
}

export function post<Q, R>(url: string, data?: Q, config?: AxiosRequestConfig) {
  return extractAxiosResponse<R>(
    axiosTemplate
      .post<Q, AxiosResponse<R>>(url, data, config)
      .then((data) => data.data)
      .catch((e) => {
        return { ...e };
      })
  );
}

export async function extractAxiosResponse<R>(calling: Promise<any>) {
  const res = await calling;
  if (res?.response?.status >= 400) {
    throw res;
  }
  console.log(res);
  return res as R;
}
