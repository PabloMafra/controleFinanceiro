import { configureStore } from "@reduxjs/toolkit";
import cartaoReducer from "./cartaoSlice";
import movimentacaoReducer from "./movimentacoesSlice"

export const store = configureStore({
  reducer: {
    cartoes: cartaoReducer,
    movimentacoes: movimentacaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
