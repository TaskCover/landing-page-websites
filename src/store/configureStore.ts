import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";

export interface State {
  app: AppState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
