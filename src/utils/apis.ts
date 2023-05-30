import { post } from "./fetcher";
import {
  AuthCode,
  AuthForgotPasswordPost,
  AuthLoginPost,
  AuthRefreshTokenPost,
  AuthRegisterPost,
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
//=======================================================================================
