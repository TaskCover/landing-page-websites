export const Endpoint = {
  SIGNIN: "/auth/login",
  SIGNUP: "/auth/register",
  VERIFY: "/auth/code",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/set-password",
  CHANGE_PASSWORD: "/auth/update-pasword",
  REFRESH_TOKEN: "auth/refresh-token",
  USERS: "/users",
  COMPANIES: "/companies",
  COMPANY_ITEM: "/companies/{id}",
  USER_ITEM: "/users/{id}",
  PROFILE: "/users/me",
  PROJECTS: "/projects",
  PROJECT_ITEM: "/projects/{id}",
  PROJECT_MEMBERS: "/projects/{id}/members",
  PROJECT_TYPES_ALL: "type-project/all",
  PROJECT_TYPES: "type-project",
  PROJECT_TYPE_ITEM: "type-project/{id}",
  PROJECT_TYPES_INACTIVE: "type-project/inactive",

  COST_HISTORY: "/cost-history",

  POSITIONS_ALL: "/positions/all",
  POSITIONS: "/positions",
  POSITION_ITEM: "/positions/{id}",
  POSITIONS_INACTIVE: "/positions/inactive",
};
