import { configureStore } from "@reduxjs/toolkit";
import growlReducer from "./growler/growlerSlice";

export const store = configureStore({
  reducer: {
    growlers: growlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
