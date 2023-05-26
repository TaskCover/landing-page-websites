import { post } from "./fetcher";
import { AuthLoginPost, AuthRegisterPost } from "./model";

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
