//AUTH==================================================================================
export type ValidationListError = {
  param: string;
  message: string;
}[];

export type AuthLoginPost = {
  requestBody: {
    email: string;
    password: string;
  };
  responseBody: {
    accessToken: string;
    refreshToken: string;
    id: string;
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

//Project==================================================================================
export type ProjectGet = {
  requestParam: {
    page?: number;
    size?: number;
  };
  responseBody: {
    total: number;
    total_page: number;
    data: {
      id: string;
      name: string;
      owner: { fullname: string };
      is_active: boolean;
      saved: boolean;
    }[];
  };
};

export type UsersGet = {
  responseBody: {
    data: {
      id: string;
      fullname: string;
      email: string;
    }[];
  };
};

export type TypeProjectGet = {
  responseBody: {
    id: string;
    name: string;
  }[];
};

export type PositionsGet = {
  responseBody: {
    id: string;
    name: string;
  }[];
};

export type ProjectPost = {
  requestBody: {
    name?: string;
    owner?: string;
    start_date?: string;
    end_date?: string;
    expected_cost?: number;
    working_hours?: number;
    description?: string;
    member?: { id: string; position: string }[];
    type_project?: string;
  };
  responseBody: {
    nessage: string;
  };
};
