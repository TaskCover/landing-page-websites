import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";
import globalReducer, { GlobalState } from "store/global/reducer";
import projectReducer, { ProjectState } from "store/project/reducer";
import companyReducer, { CompanyState } from "store/company/reducer";
import managerReducer, { ManagerState } from "store/manager/reducer";

export interface State {
  app: AppState;
  global: GlobalState;
  project: ProjectState;
  company: CompanyState;
  manager: ManagerState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    global: globalReducer,
    project: projectReducer,
    company: companyReducer,
    manager: managerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
