import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_TIMEOUT, API_URL } from "constant";
import { HttpStatusCode } from "constant/enums";
import { ErrorResponse } from "constant/types";
import { store } from "store/configureStore";
import { sleep } from "utils/index";
import { ErrorCode } from "./errorCode";

const requestAbortCode = "ECONNABORTED";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = API_TIMEOUT;

axios.interceptors.request.use(
  (config) => {
    // const token = getAuthData()?.["token"];
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === HttpStatusCode.UNAUTHORIZED
    ) {
      // store.dispatch(updateAuth());
    }
    if (
      (error as AxiosError)?.config &&
      ((error.code === requestAbortCode &&
        (error as AxiosError)?.response?.status ===
          HttpStatusCode.TOO_MANY_REQUEST) ||
        ("response" in error && error.response === undefined))
    ) {
      sleep(1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.request((error as AxiosError).config as AxiosRequestConfig<any>);
    }

    const errorResponse = (error as AxiosError)?.response
      ?.data as ErrorResponse;

    const messageError: string | undefined =
      ErrorCode[errorResponse.code] ?? errorResponse.description;

    return Promise.reject(messageError ?? error);
  },
);

const RequestClient = class {
  constructor() {
    //
  }

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const response = await axios.get(endpoint, {
        params,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.post(endpoint, body, configs);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.put(endpoint, body, configs);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.patch(endpoint, body, configs);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint: string, data?: {}) {
    try {
      const response = await axios.delete(endpoint, { data });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

const client = new RequestClient();

export { client };
