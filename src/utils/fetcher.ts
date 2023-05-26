import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

const axiosTemplate = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export function get<Q, R>(url: string, config?: AxiosRequestConfig) {
  return extractAxiosResponse(
    axiosTemplate
      .get<Q, R>(url, config)
      .then((data) => data)
      .catch((e) => {
        return { ...e };
      })
  );
}

export function post<Q, R>(url: string, data?: Q, config?: AxiosRequestConfig) {
  return extractAxiosResponse(
    axiosTemplate
      .post<Q, R>(url, data, config)
      .then((data) => data)
      .catch((e) => {
        return { ...e };
      })
  );
}

const extractAxiosResponse = async (calling: Promise<any>) => {
  const res = await calling;
  if (res?.response?.status >= 400) {
    throw res;
  }
  return res;
};
