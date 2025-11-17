import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer  from './slices/postSlice'

// centralized Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    posts : postReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

// Infer the store’s types 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
