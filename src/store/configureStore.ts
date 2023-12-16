import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";
import globalReducer, { GlobalState } from "store/global/reducer";
import projectReducer, { ProjectState } from "store/project/reducer";
import companyReducer, { CompanyState } from "store/company/reducer";
import timeTrackingReducer, {
  TimeTrackingState,
} from "store/timeTracking/reducer";
import managerReducer, { ManagerState } from "store/manager/reducer";
import chatReducer from "store/chat/reducer";
import { SaleState, salesReducer } from "./sales/reducer";
import { resourcePlanningReducer } from "./resourcePlanning/reducer";
import { TagState, tagsReducer } from "./tags/reducer";
import docReducer, { IDocs } from "./docs/reducer";
import { feedbackReducer } from "./feedback/reducer";
import { BlogState, blogReducer } from "./blog/reducer";
import { categoryBlogReducer } from "./blog-category/reducer";
import { CareerReducer } from "./career/reducer";
import documentApi from "./docs/api";
import { BillingState, billingReducer } from "./billing/reducer";

export interface State {
  app: AppState;
  global: GlobalState;
  project: ProjectState;
  company: CompanyState;
  manager: ManagerState;
  timeTracking: TimeTrackingState;
  tags: TagState;
  sales: SaleState;
  docs: IDocs;
  blogs: BlogState;
  billing: BillingState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    global: globalReducer,
    project: projectReducer,
    company: companyReducer,
    timeTracking: timeTrackingReducer,
    manager: managerReducer,
    chat: chatReducer,
    tags: tagsReducer,
    sales: salesReducer,
    doc: docReducer,
    resourcePlanning: resourcePlanningReducer,
    //feedback
    feedback: feedbackReducer,
    blogs: blogReducer,
    categoryBlogs: categoryBlogReducer,
    //career
    career: CareerReducer,
    [documentApi.reducerPath]: documentApi.reducer,
    billing: billingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([documentApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
