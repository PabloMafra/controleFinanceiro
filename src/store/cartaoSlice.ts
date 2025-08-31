// src/store/cartaoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartaoService, { Cartao } from "@/src/services/CartaoService";

interface CartaoState {
  cartoes: Cartao[];
  loading: boolean;
  error: string | null;
}

const initialState: CartaoState = {
  cartoes: [],
  loading: false,
  error: null,
};

export const fetchCartoes = createAsyncThunk("cartoes/fetchCartoes", async () => {
  return await CartaoService.obterCartoes();
});

const cartaoSlice = createSlice({
  name: "cartoes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartoes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartoes.fulfilled, (state, action) => {
        state.loading = false;
        state.cartoes = action.payload;
      })
      .addCase(fetchCartoes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar cartões";
      });
  },
});

export default cartaoSlice.reducer;
