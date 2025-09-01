import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IMovimentacao } from "../interfaces/IMovimentacao";
import MovimentacoesServices from "../services/MovimentacoesServices";

interface MovimentacaoState {
  movimentacoes: IMovimentacao[];
  loading: boolean;
  error: string | null;
}

const initialState: MovimentacaoState = {
  movimentacoes: [],
  loading: false,
  error: null,
};

export const fetchMovimentacoes = createAsyncThunk("movimentacoes/fetchMovimentacoes", async () => {
  return await MovimentacoesServices.buscarMovimentacoes();
});

const movimentacaoSlice = createSlice({
  name: "movimentacoes",
  initialState,
  reducers: {
    adicionarMovimentacao: (state, action: PayloadAction<IMovimentacao>) => {
      state.movimentacoes.unshift(action.payload);
    },
    setMovimentacoes: (state, action: PayloadAction<IMovimentacao[]>) => {
      state.movimentacoes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovimentacoes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovimentacoes.fulfilled, (state, action) => {
        state.loading = false;
        state.movimentacoes = action.payload;
      })
      .addCase(fetchMovimentacoes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar movimentações";
      });
  },
});

export const { adicionarMovimentacao, setMovimentacoes } =
  movimentacaoSlice.actions;
  
export default movimentacaoSlice.reducer;
