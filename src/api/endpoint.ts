export const Endpoint = {
  SIGNIN: "/auth/login",
  SIGNUP: "/auth/register",
  VERIFY: "/auth/code",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/set-password",
  CHANGE_PASSWORD: "/auth/update-pasword",
  REFRESH_TOKEN: "auth/refresh-token",
  USERS: "/users",
  USERS_APPROVE: "/users/approve",
  USERS_REJECT: "/users/reject",
  USER_ITEM: "/users/{id}",
  USERS_INACTIVE: "/users/inactive",
  PROFILE: "/users/me",
  COMPANIES: "/companies",
  COMPANIES_APPROVE: "/companies/approve",
  COMPANIES_REJECT: "/companies/reject",
  MY_COMPANY: "/companies/me",
  COMPANY_ITEM: "/companies/{id}",
  PROJECTS: "/projects",
  PROJECT_ITEM: "/projects/{id}",
  PROJECT_MEMBERS: "/projects/{id}/members",
  PROJECT_TASKS: "/tasks",
  TASKS: "/tasks/add",
  SUB_TASKS: "/tasks/sub",
  TASK_ITEM: "/tasks/task",
  TASK_MOVE: "/tasks/move",
  PROJECT_TYPES_ALL: "type-project/all",
  PROJECT_TYPES: "type-project",
  PROJECT_TYPE_ITEM: "type-project/{id}",
  PROJECT_TYPES_INACTIVE: "type-project/inactive",

  COST_HISTORY: "/cost-history",

  POSITIONS_ALL: "/positions/all",
  POSITIONS: "/positions",
  POSITION_ITEM: "/positions/{id}",
  POSITIONS_INACTIVE: "/positions/inactive",

  UPLOAD: "/files/upload-avatar",
  SIGNUP_UPLOAD: "/avatar/upload",
};
