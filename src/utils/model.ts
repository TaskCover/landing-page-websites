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
  responseBody: {};
};

export type AuthForgotPasswordPost = {
  requestBody: {
    email: string;
  };
  responseBody: { message: string };
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
