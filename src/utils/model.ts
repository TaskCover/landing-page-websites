//AUTH==================================================================================

export type AuthLoginPost = {
  requestBody: {
    email: string;
    password: string;
  };
  responseBody: {
    accessToken: string;
    refreshToken: string;
  };
};

export type AuthRegisterPost = {
  requestBody: {
    phone: string;
    email: string;
    password: string;
    fullname: string;
  };
  responseBody: { message: string; registerToken: string };
};

export type AuthCode = {
  requestHeader: {
    tokenRegister: string;
  };
  requestBody: {
    code: string;
  };
  responseBody: { message: string };
};

export type AuthForgotPasswordPost = {
  requestBody: {
    email: string;
  };
  responseBody: { message: string };
};

export type AuthRefreshTokenPost = {
  requestHeader: {
    "refresh-token": string;
  };
  responseBody: {
    accessToken: string;
    refreshToken: string;
  };
};
export type AuthSetPasswordPost = {
  requestHeader: {
    "reset-password-token": string;
  };
  requestBody: {
    password: string;
  };
  responseBody: { message: string };
};

//==================================================================================
