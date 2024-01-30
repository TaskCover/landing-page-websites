import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";
import globalReducer, { GlobalState } from "store/global/reducer";
import { categoryBlogReducer } from "./blog-category/reducer";
import { BlogState, blogReducer } from "./blog/reducer";
import { CareerReducer } from "./career/reducer";
import { CounterPageState, counterPageReducer } from "./product-page/reducer";
// import { IDocs } from "./docs/reducer";
import { feedbackReducer } from "./feedback/reducer";

export interface State {
  app: AppState;
  global: GlobalState;
  blogs: BlogState;
  counterPage: CounterPageState;
  // docs: IDocs;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    global: globalReducer,
    blogs: blogReducer,
    categoryBlogs: categoryBlogReducer,
    career: CareerReducer,
    // [documentApi.reducerPath]: documentApi.reducer,
    counterPage: counterPageReducer,
    feedback: feedbackReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat([documentApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
