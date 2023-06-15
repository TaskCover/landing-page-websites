import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";
import projectReducer, { ProjectState } from "store/project/reducer";
import companyReducer, { CompanyState } from "store/company/reducer";
import globalReducer, { GlobalState } from "store/global/reducer";

export interface State {
  app: AppState;
  project: ProjectState;
  company: CompanyState;
  global: GlobalState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    project: projectReducer,
    company: companyReducer,
    global: globalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
