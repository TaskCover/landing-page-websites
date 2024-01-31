import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "store/app/reducer";
import { categoryBlogReducer } from "./blog-category/reducer";
import { BlogState, blogReducer } from "./blog/reducer";
import { CareerReducer } from "./career/reducer";
import { CounterPageState, counterPageReducer } from "./product-page/reducer";
import { feedbackReducer } from "./feedback/reducer";

export interface State {
  app: AppState;
  blogs: BlogState;
  counterPage: CounterPageState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    blogs: blogReducer,
    categoryBlogs: categoryBlogReducer,
    career: CareerReducer,
    counterPage: counterPageReducer,
    feedback: feedbackReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
