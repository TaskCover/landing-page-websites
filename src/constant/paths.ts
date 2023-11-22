import { Permission } from "./enums";

export const HOME_PATH = "/";
export const SIGNIN_PATH = "/signin";
export const SIGNUP_PATH = "/signup";
export const JOIN_WORKSPACE_PATH = "/join-workspace";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const RESET_PASSWORD_PATH = "/reset-password";
export const CHANGE_PASSWORD_PATH = "/change-password";
export const PROJECTS_PATH = "/projects";
export const EMPLOYEES_PATH = "/employees";
export const COST_HISTORY_PATH = "/cost-history";
export const POSITIONS_PATH = "/positions";
export const PROJECT_TYPES_PATH = "/project-types";
export const MY_COMPANY_PATH = "/my-company";
export const COMPANIES_PATH = "/companies";
export const COMPANY_DETAIL_PATH = "/companies/{id}";
export const COMPANY_EMPLOYEES_PATH = "/companies/{id}/employees";
export const STATEMENT_HISTORY_PATH = "/statement-history";
export const ACCOUNT_INFO_PATH = "/user-information";
export const UPGRADE_ACCOUNT_PATH = "/upgrade-account";
export const PROJECT_TASKS_PATH = "/projects/{id}/tasks";
export const PROJECT_ACTIVITIES_PATH = "/projects/{id}/activities";
export const PROJECT_COST_HISTORY_PATH = "/projects/{id}/cost-history";
export const PROJECT_MEMBERS_PATH = "/projects/{id}/members";
export const PROJECT_INFORMATION_PATH = "/projects/{id}";

export const TIME_TRACKING_PATH = "/time-tracking";
export const RESOURCE_PLANING_PATH = "/resource-planing";
export const SALES_LIST_PATH = "/sales";
export const CHATTING_ROOM_PATH = "/chat";
export const CHATTING_INFO_PATH = "/chat/{id}";

export const SALE_DETAIL_PATH = "/sales/{id}";

export const DOCS_PATH = "/documents";
export const DOCS_DETAIL_PATH = "/documents/{id}";
export const DOCS_CREATE_PATH = "/documents/create";

// Feedback
export const FEEDBACK_PATH = "/feedback";
//blogs
export const BLOGS_PATH = "/blogs";
export const BLOG_CATEGORY_PATH = "/blog-category";
export const BLOGS_DETAIL_PATH = "/blogs/{id}";
export const BLOGS_RELATED_PATH = "/blogs/{id}/related";
//Carrer
export const CAREER_PATH = "/careers";
export const CAREER_DETAIL_PATH = "/careers/{id}";
export const APPLICANTS_DETAIL_PATH = "/careers/{id}/applicants";

const AUTHORIZED_LOGGED_IN_PATHS = [
  SIGNIN_PATH,
  SIGNUP_PATH,
  JOIN_WORKSPACE_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  CHANGE_PASSWORD_PATH,
  ACCOUNT_INFO_PATH,
  // Feedback
  FEEDBACK_PATH,
];

export const AUTHORIZED_PATHS = {
  [Permission.AM]: [
    ...AUTHORIZED_LOGGED_IN_PATHS,
    PROJECTS_PATH,
    POSITIONS_PATH,
    EMPLOYEES_PATH,
    COST_HISTORY_PATH,
    PROJECT_TYPES_PATH,
    PROJECT_TASKS_PATH,
    PROJECT_INFORMATION_PATH,
    PROJECT_MEMBERS_PATH,
    PROJECT_COST_HISTORY_PATH,
    PROJECT_ACTIVITIES_PATH,
    MY_COMPANY_PATH,
    HOME_PATH,
    TIME_TRACKING_PATH,
    RESOURCE_PLANING_PATH,
    SALE_DETAIL_PATH,
    SALES_LIST_PATH,
    DOCS_PATH,
    DOCS_DETAIL_PATH,
    DOCS_CREATE_PATH,
    CHATTING_ROOM_PATH,
    // Feedback
    FEEDBACK_PATH,
  ],
  [Permission.SA]: [
    ...AUTHORIZED_LOGGED_IN_PATHS,
    HOME_PATH,
    COMPANIES_PATH,
    COMPANY_EMPLOYEES_PATH,
    COMPANY_DETAIL_PATH,
    STATEMENT_HISTORY_PATH,
    UPGRADE_ACCOUNT_PATH,
    // Feedback
    FEEDBACK_PATH,
    //blog
    BLOGS_PATH,
    BLOG_CATEGORY_PATH,
    BLOGS_DETAIL_PATH,
<<<<<<< HEAD
    //Carrer
    CAREER_PATH,
    CAREER_DETAIL_PATH
=======
    BLOGS_RELATED_PATH,
>>>>>>> 988f02a9bae07ace22acbedfcd5b3d5b7a30ba61
  ],
  [Permission.ST]: [
    ...AUTHORIZED_LOGGED_IN_PATHS,
    PROJECTS_PATH,
    PROJECT_TYPES_PATH,
    PROJECT_TASKS_PATH,
    PROJECT_INFORMATION_PATH,
    PROJECT_MEMBERS_PATH,
    PROJECT_COST_HISTORY_PATH,
    PROJECT_ACTIVITIES_PATH,
    MY_COMPANY_PATH,
    HOME_PATH,
    TIME_TRACKING_PATH,
    RESOURCE_PLANING_PATH,
    SALES_LIST_PATH,
    SALE_DETAIL_PATH,
    DOCS_PATH,
    DOCS_DETAIL_PATH,
    DOCS_CREATE_PATH,
    CHATTING_ROOM_PATH,
    // Feedback
    FEEDBACK_PATH,
  ],
  [Permission.EU]: [...AUTHORIZED_LOGGED_IN_PATHS, UPGRADE_ACCOUNT_PATH],
};
