export const Endpoint = {
  SIGNIN: "/auth/login",
  SIGNUP: "/auth/register",
  VERIFY: "/auth/code",
  JOIN_WORKSPACE: "/users/join",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/set-password",
  CHANGE_PASSWORD: "/auth/update-pasword",
  REFRESH_TOKEN: "auth/refresh-token",
  USERS: "/users",
  USERS_APPROVE: "/users/approve?company={company}",
  USERS_REJECT: "/users/reject?company={company}",
  USER_ITEM: "/users/{id}",
  USERS_INACTIVE: "/users/inactive",
  PROFILE: "/users/me",
  COMPANIES: "/companies",
  COMPANY_ADD_MEMBER: "/companies/add-member",
  COMPANY_MEMBERS: "/users/members",
  COMPANIES_APPROVE: "/companies/approve",
  COMPANIES_REJECT: "/companies/reject",
  MY_COMPANY: "/companies/me",
  COMPANY_ITEM: "/companies/{id}",
  PROJECTS: "/projects",
  PROJECT_ITEM: "/projects/{id}",
  PROJECT_MEMBERS: "/projects/{id}/members",
  PROJECT_TASKS: "/tasks",
  PROJECT_ACTIVITIES: "/activities",
  PROJECT_TASK_ITEM: "/tasks/{id}",
  TASKS: "/tasks/add",
  TASK_LIST: "/tasks/task-list/{id}",
  SUB_TASKS: "/tasks/sub",
  SUB_TASK: "/tasks/sub-task",
  TASK_ITEM: "/tasks/task",
  TASKS_INACTIVE: "/tasks/task-inactive",
  SUB_TASKS_INACTIVE: "/tasks/sub-inactive",
  TASK_LIST_INACTIVE: "/tasks/task-list",
  TASK_MOVE: "/tasks/move",
  TASK_COMMENT: "/tasks/comment",
  SUB_TASK_COMMENT: "/tasks/comment-sub",
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
  UPLOAD_LINK: "/files/upload-link",
};
