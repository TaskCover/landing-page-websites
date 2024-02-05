import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  AN_ERROR_TRY_AGAIN,
  API_TIMEOUT,
  API_URL,
  UPLOAD_API_URL
} from "constant";
import { HttpStatusCode } from "constant/enums";

const requestAbortCode = "ECONNABORTED";

const createAxiosInstance = (baseUrl: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      post: {
        "Content-Type": "application/json",
      },
    },
    timeout: API_TIMEOUT,
  });
  return axiosInstance;
};

const RequestClient = class {
  private readonly defaultConfig: {};
  private readonly axios: AxiosInstance;

  constructor(config = {}) {
    this.defaultConfig = config;
    this.axios = createAxiosInstance(API_URL);
  }

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const response = await this.axios.get(endpoint, {
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
      const response = await this.axios.post(endpoint, body, {
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
      const response = await this.axios.put(endpoint, body, {
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
      const response = await this.axios.patch(endpoint, body, {
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
      const response = await this.axios.delete(endpoint, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async upload(endpoint: string, file: File) {
    console.log(file,'--file--');
    
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
        const objUpload = response.data;
        response = await this.put(response.data.upload, file);
        if (response?.status === HttpStatusCode.OK) {
          return objUpload;
        }
        throw AN_ERROR_TRY_AGAIN;
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      throw error;
    }
  }
  async getExport(endpoint: string, configs = {} as AxiosRequestConfig) {
    try {
      const response = await this.axios.get(endpoint, {
        ...this.defaultConfig,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
};

export const client = new RequestClient();


export { axios };

