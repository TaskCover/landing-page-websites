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
  PROJECT_FILE: "/projects/{id}/files",
  PROJECT_MEMBERS: "/projects/{id}/members",
  PROJECT_TASKS: "/tasks",
  PROJECT_ACTIVITIES: "/activities",
  PROJECT_TASK_ITEM: "/tasks/{id}",
  CURRENCY: "projects/currency",
  TASKS: "/tasks/add",
  TASK_LIST: "/tasks/task-list/{id}",
  SUB_TASKS: "/tasks/sub",
  SUB_TASK: "/tasks/sub-task",
  TASK_ITEM: "/tasks/task",
  TASKS_INACTIVE: "/tasks/task-inactive",
  SUB_TASKS_INACTIVE: "/tasks/sub-inactive",
  TASK_LIST_INACTIVE: "/tasks/task-list",
  CHANGE_PARENT_TASK: "/tasks/change-parent-task",
  TODO_DONE: "/tasks/isdone",
  CONVERT_TASK: "/tasks/convert-task",
  CONVERT_SUB_TASK: "/tasks/convert-subtask",
  CONVERT_SUB_TASK_TO_TASK: "/tasks/convert-task-by-subtask",
  DELETE_DEPENDENCY: "/tasks/delete-dependences",
  ORDER_TASK: "/tasks/update-priority-todo-task",
  ORDER_SUB_TASK: "/tasks/update-priority-todo-sub",
  DELETE_TO_DO: "/tasks/delete-todo-list",
  TASK_MOVE: "/tasks/move",
  TASK_COMMENT: "/tasks/comment",
  SUB_TASK_COMMENT: "/tasks/comment-sub",
  PROJECT_TYPES_ALL: "type-project/all",
  PROJECT_TYPES: "type-project",
  PROJECT_TYPE_ITEM: "type-project/{id}",
  PROJECT_TYPES_INACTIVE: "type-project/inactive",
  SALES_LIST: "/sales/all",
  CREATE_DEAL: "/sales",
  SALES_DEAL_EXPORT: "/sales/export/deal",
  SALES_DEAL_DETAIL: "/sales/{id}",
  SALES_TODO: "/sales/todo",
  SALES_TODO_DETAIL: "/sales/todo/{id}",
  SALES_SERVICE: "/sales/service/",
  SALES_SERVICE_DETAIL: "/sales/service/{id}",
  SALES_SECTION_DETAIL: "/sales/section/{id}",
  SALES_COMMENT: "/sales/comment",
  TAGS: "/tags",
  TAGS_ALL: "/tags/all",
  TAGS_DETAIL: "/tags/{id}",

  COST_HISTORY: "/cost-history",

  BUDGET_ALL: "/budgets/all",
  BUDGET_CREATE: "/budgets",
  BUDGET_UPDATE: '/budgets/{budgetId}',
  BUDGET_DELETE_BY_ID: '/budgets/{budgetId}',
  BUDGET_GET_BY_ID: "/budgets/budget-by-id/{id}",
  BUDGET_GET_FEED: "/budgets/feed/{id}",
  BUDGET_GET_TIME_RANGES: "/budgets/times/{id}",
  BUDGET_TIME_RANGES: "/budgets/times",
  BUDGET_DELETE_TIME_RANGES: "/budgets/times/{id}",
  BUDGET_SERVICE_LIST: "/budgets/service/{id}",
  BUDGET_SERVICE_ADD: "/budgets/service",
  BUDGET_SERVICE_UPDATE: "/budgets/service/{id}",
  BUDGET_SECTION_DELETE: "/budgets/section/{id}",
  BUDGET_TIME_RANGES_BY_ID: "/budgets/time/{timeId}",
  BUDGET_TIME_RANGES_UPDATE: "/budgets/time/{id}",
  BUDGET_TIME_RANGES_DELETE: "/budgets/time/{id}",
  BUDGET_EXPENSE_CREATE: "/budgets/expense/create-expense",
  BUDGET_EXPENSE_LIST: "/budgets/expense/get-all-expense/{budgetId}",
  BUDGET_EXPENSE_DETAIL: "/budgets/expense/get-detail-expense/{expenseId}",
  BUDGET_EXPENSE_DETAIL_EXPORT: "/budgets/expense/export-all-expense/{expenseId}",
  BUDGET_EXPENSE_DETAIL_UPDATE: "/budgets/expense/update-expense/{expenseId}",
  BUDGET_EXPENSE_DETAIL_DELETE: "/budgets/expense/delete-expense/{expenseId}",

  POSITIONS_ALL: "/positions/all",
  POSITIONS: "/positions",
  POSITION_ITEM: "/positions/{id}",
  POSITIONS_INACTIVE: "/positions/inactive",

  UPLOAD: "/files/upload-avatar",
  SIGNUP_UPLOAD: "/avatar/upload",
  UPLOAD_LINK: "/files/upload-link",

  RESOURCE_PLANNING: "/resources",
  RESOURCE_PLANNING_LIST: "/resources/all",
  RESOURCE_PLANNING_DETAIL: "/resources/{id}",
  MY_RESOURCE_PLANNING: "/resources/me",

  MY_TIME_SHEET: "/timesheets/me",
  WORK_LOG: "/timesheets/log",
  COMPANY_TIME_SHEET: "timesheets/company",
  TIME_SHEET: "/timesheets",
  PIN: "/timesheets/pin",
  SAME_WORKER: "timesheets/same-worker",

  // Docs
  DOCS: "/docs",
  CREATE_DOCS: "/docs",
  UPDATE_DOCS: "/docs/{id}",
  DETAIL_DOCS: "/docs/detail/",
  HISTORY_DOCS: "/docs/history/{id}",
  ADD_PERM_DOCS: "/docs/add-perm/",
  PERM_DOCS: "/docs/perm/",

  //feedback
  FEEDBACK: "/feedback",
  RESPONDFEEDBACK: "/feedback/{id}/response",

  // blog
  CATEGORY_BLOG: "/category",
  BLOGS: "/post",
  DETAIL_BLOG: "/post/{id}",
  GET_BLOG_COMMENT: "/post/{id}/comment",
  //carrer
  CAREER: "/job-post",
  UPADATECAREER: "/job-post/{id}",
  DETAIL_CAREER: "/post/{id}",

  //Billing
  BILLING: "/bill",
  DETAIL_BILLING: "/bill/export/{id}",
  EXPORT_BILLING: "/billToExport",
  INTERACTION_BILLING: "/bill_interaction",
  INTERACTION_BILLING_BY_BILL: "/bill_interaction/{id}",
  ADD_USER_BILL: "/addUserToBill",

  //Budget
  BUDGET: "/budgets/all",
  DETAIL_BUDGET: "/budgets/budget-by-id/{id}",
  CREATE_SERVICE_BUDGET: "/budgets/service",
  SERVICE_BY_BUDGET: "/budgets/service/{id}",
};
