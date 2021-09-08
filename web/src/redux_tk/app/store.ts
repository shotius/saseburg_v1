import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "src/redux_tk/features/auth/authSlice";
import  {postsReducer}  from "src/redux_tk/features/posts/homeSlice";
import { displayReducer } from "src/redux_tk/features/display/displaySlice";
import { autoLoginMiddleware } from "src/redux_tk/middlewares/autoLoginMiddleware";

const reducer = {
  posts: postsReducer,
  auth: authReducer,
  dispay: displayReducer
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoLoginMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
