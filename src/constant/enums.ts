export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER = 500,
}

export enum DataStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

export enum DataAction {
  DETAIL = 1,
  CREATE,
  UPDATE,
  DELETE,
  OTHER,
}

export enum Permission {
  SA = "SA",
  AM = "AM",
  ST = "ST",
  EU = "EU",
}
