import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { PUBLIC_API, apiAuthRefreshTokenPost } from "./apis";

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

const axiosTemplate = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

const goToLogin = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  window.location.href = `${window.location.origin}/login`;
  const controller = new AbortController();
  const newConfig = { ...config, signal: controller.signal };
  controller.abort("Cần đăng nhập lại");
  return newConfig;
};

axiosTemplate.interceptors.request.use(async (config) => {
  if (!config.url || PUBLIC_API.includes(config.url)) {
    return config;
  }
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    return goToLogin(config);
  }
  try {
    const res = await apiAuthRefreshTokenPost({
      "refresh-token": refreshToken,
    });
    localStorage.setItem("jwt", res.accessToken);
    localStorage.setItem("refresh-token", res.refreshToken);
    config.headers["token"] = res.accessToken;
    return config;
  } catch (e) {
    return goToLogin(config);
  }
});

// axiosTemplate.interceptors.response.use(
//   (r) => r,
//   (e) => {
//     console.log(e.config);
//     return axiosTemplate(e.config);
//   }
// );

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
  if (res?.response?.status >= 400 || res instanceof AxiosError) {
    throw res;
  }

  console.log(res);
  return res as R;
}
//==================================================================================
