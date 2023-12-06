import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AN_ERROR_TRY_AGAIN,
  API_TIMEOUT,
  API_URL,
  AUTH_API_URL,
  REFRESH_TOKEN_STORAGE_KEY,
  SALE_API_URL,
  UPLOAD_API_URL,
} from "constant";
import { HttpStatusCode } from "constant/enums";
import { ErrorResponse } from "constant/types";
import { sleep } from "utils/index";
import { clientStorage } from "utils/storage";
import { Endpoint } from "./endpoint";
import { LIST_FORM_ERROR_CODE } from "./formErrorCode";

const requestAbortCode = "ECONNABORTED";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = API_TIMEOUT;

axios.interceptors.request.use(
  (config) => {
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === HttpStatusCode.UNAUTHORIZED &&
      error.response?.data?.code !== "ACTION_NOT_ALLOWED"
    ) {
      const refreshToken = clientStorage.get(REFRESH_TOKEN_STORAGE_KEY);
      if (
        (!refreshToken && error.config.headers.token) ||
        error.config.headers["refresh-token"]
      ) {
        signOut();
      } else if (refreshToken) {
        try {
          const rTResponse = await axios.post(
            Endpoint.REFRESH_TOKEN,
            {},
            {
              baseURL: AUTH_API_URL,
              headers: { "refresh-token": refreshToken },
            },
          );
          if (rTResponse?.status === HttpStatusCode.OK) {
            clientStorage.set(
              ACCESS_TOKEN_STORAGE_KEY,
              rTResponse.data.accessToken,
            );
            clientStorage.set(
              REFRESH_TOKEN_STORAGE_KEY,
              rTResponse.data.refreshToken,
            );
          }
          error.config.headers = {
            token: rTResponse.data.accessToken,
          };
          return axios(error.config);
        } catch (error) {
          signOut();
        }
      }
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
      errorResponse?.description ?? errorResponse?.code;

    const isFormErrorCode = LIST_FORM_ERROR_CODE.includes(errorResponse?.code);
    return Promise.reject(
      isFormErrorCode
        ? { ...errorResponse, message: errorResponse["description"] }
        : messageError ?? error,
    );
  },
);

const RequestClient = class {
  private readonly defaultConfig: {};

  constructor(config = {}) {
    this.defaultConfig = config;
  }

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const response = await axios.get(endpoint, {
        params,
        ...this.defaultConfig,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.post(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.put(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.patch(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint: string, configs = {}) {
    try {
      const response = await axios.delete(endpoint, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async upload(endpoint: string, file: File) {
    try {
      let response = await this.get(
        `${endpoint}/${file.name}`,
        { type: file.type },
        {
          baseURL: UPLOAD_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        const urlUpload = response.data.object;
        response = await this.put(response.data.upload, file);
        if (response?.status === HttpStatusCode.OK) {
          return urlUpload;
        }
        throw AN_ERROR_TRY_AGAIN;
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      throw error;
    }
  }
};

const client = new RequestClient();

export { client };

const signOut = () => {
  clientStorage.remove(ACCESS_TOKEN_STORAGE_KEY);
  clientStorage.remove(REFRESH_TOKEN_STORAGE_KEY);
  window.location.reload();
};

export const saleClient = new RequestClient({
  baseURL: SALE_API_URL,
});
