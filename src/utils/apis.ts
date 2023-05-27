import { post } from "./fetcher";
import {
  AuthCheckOtp,
  AuthForgotPasswordPost,
  AuthLoginPost,
  AuthRegisterPost,
  AuthSetPasswordPost,
} from "./model";

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

export const apiAuthCheckOtp = (
  body: AuthCheckOtp["requestBody"],
  header: AuthCheckOtp["requestHeader"]
) =>
  post<AuthCheckOtp["requestBody"], AuthCheckOtp["responseBody"]>(
    "/auth/checkotp",
    body,
    { headers: header }
  );

export const apiAuthForgotPasswordPost = (
  body: AuthForgotPasswordPost["requestBody"]
) =>
  post<
    AuthForgotPasswordPost["requestBody"],
    AuthForgotPasswordPost["responseBody"]
  >("/auth/forgot-password", body);

export const apiAuthSetPasswordPostPost = (
  body: AuthSetPasswordPost["requestBody"],
  header: AuthSetPasswordPost["requestHeader"]
) =>
  post<AuthSetPasswordPost["requestBody"], AuthSetPasswordPost["responseBody"]>(
    "/auth/set-password",
    body,
    { headers: header }
  );
