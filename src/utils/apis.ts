import { get, post, put } from "./fetcher";
import {
  AuthCode,
  AuthForgotPasswordPost,
  AuthLoginPost,
  AuthRefreshTokenPost,
  AuthRegisterPost,
  AuthSetPasswordPost,
  ProjectGet,
} from "./model";

export const PUBLIC_API = [
  "/auth/login",
  "/auth/register",
  "/auth/code",
  "/auth/forgot-password",
  "/auth/refresh-token",
];
//AUTH==================================================================================
export const apiAuthLoginPost = (body: AuthLoginPost["requestBody"]) =>
  post<AuthLoginPost["requestBody"], AuthLoginPost["responseBody"]>(
    "/auth/login",
    body
  );

export const apiAuthRegisterPost = (body: AuthRegisterPost["requestBody"]) =>
  post<AuthRegisterPost["requestBody"], AuthRegisterPost["responseBody"]>(
    "/auth/register",
    body
  );

export const apiAuthCode = (
  body: AuthCode["requestBody"],
  header: AuthCode["requestHeader"]
) =>
  post<AuthCode["requestBody"], AuthCode["responseBody"]>("/auth/code", body, {
    headers: header,
  });

export const apiAuthForgotPasswordPost = (
  body: AuthForgotPasswordPost["requestBody"]
) =>
  post<
    AuthForgotPasswordPost["requestBody"],
    AuthForgotPasswordPost["responseBody"]
  >("/auth/forgot-password", body);

export const apiAuthRefreshTokenPost = (
  header: AuthRefreshTokenPost["requestHeader"]
) =>
  post<{}, AuthRefreshTokenPost["responseBody"]>(
    "/auth/refresh-token",
    {},
    { headers: header }
  );

export const apiAuthSetPasswordPostPost = (
  body: AuthSetPasswordPost["requestBody"],
  header: AuthSetPasswordPost["requestHeader"]
) =>
  post<AuthSetPasswordPost["requestBody"], AuthSetPasswordPost["responseBody"]>(
    "/auth/set-password",
    body,
    { headers: header }
  );

export const apiAuthUpdatePasswordPostPost = (body: any, header: any) =>
  post<any, any>("/auth/update-password", body, { headers: header });
//=======================================================================================
//Project=======================================================================================
export const apiProjectGet = (requestParam?: ProjectGet["requestParam"]) =>
  get<{}, ProjectGet["responseBody"]>("/projects", { params: requestParam });

//PROFILE==================================================================================
export const apiUsersProfileDetailGet = (
  userId: string | null,
  header: any,
  params: any
) => get<any, any>(`/users/${userId}`, { headers: header, params });

export const apiUsersProfileEditPut = (
  body: any,
  userId: string | null,
  header: any
) => put<any, any>(`/users/${userId}`, body, { headers: header });
