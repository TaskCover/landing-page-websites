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
import { TagState, tagsReducer } from "./tags/reducer";

export interface State {
  app: AppState;
  global: GlobalState;
  project: ProjectState;
  company: CompanyState;
  manager: ManagerState;
  timeTracking: TimeTrackingState;
  tags: TagState;
  sales: SaleState;
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
