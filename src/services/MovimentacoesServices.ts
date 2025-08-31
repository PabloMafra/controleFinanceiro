import MovimentacoesRepository from "../repository/MovimentacoesRepository";

export interface Movimentacoes {
  valor: number;
  dia: Date;
  tipo: number | null;
  idCategoria: number;
  user_id: string | null;
  idCartao: number | null;
}

class MovimentacoesService {
  async buscarMovimentacoes() {
    return MovimentacoesRepository.buscarMovimentacoes();
  }

  async salvarMovimentacao(movimentacao: Movimentacoes) {
    await MovimentacoesRepository.salvarMovimentacao(movimentacao);
  }
}

export default new MovimentacoesService();
