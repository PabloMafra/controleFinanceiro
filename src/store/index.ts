import { configureStore } from "@reduxjs/toolkit";
import cartaoReducer from "./cartaoSlice";

export const store = configureStore({
  reducer: {
    cartoes: cartaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
