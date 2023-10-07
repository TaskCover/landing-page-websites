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

export enum Status {
  PAUSE = "PAUSE",
  ACTIVE = "ACTIVE",
  CLOSE = "CLOSE",
}

export enum PayStatus {
  // ALL,
  PAID = 1,
  UNPAID,
  WAITING,
}

export enum FILE_MAP {
  DOC,
  EXCEL,
  CSV,
  PDF,
}

export enum SORT_OPTIONS {
  ASC = "1",
  DESC = "-1",
}

export enum SALE_STAGE {
  LEAD = "LEAD",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  PROSPECT = "PROSPECT",
  NEGOTIATION = "NEGOTIATION",
  WAITING_APPROVE = "WATTING_APPROVE",
}

export enum SALE_BILL_TYPE {
  FIX = "FIX",
  ACTUAL = "ACTUAL",
  NON_BILLABLE = "NON_BILLABLE",
}

export enum CURRENCY_CODE {
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  GBP = "GBP",
  CAD = "CAD",
  AUD = "AUD",
  SGD = "SGD",
  HKD = "HKD",
  SEK = "SEK",
  CHF = "CHF",
  NZD = "NZD",
  MXN = "MXN",
  BRL = "BRL",
  RUB = "RUB",
  CNY = "CNY",
}
