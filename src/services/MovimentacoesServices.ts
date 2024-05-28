import MovimentacoesRepository from "../repository/MovimentacoesRepository";

class MovimentacoesService {
  buscarMovimentacoes() {
    return MovimentacoesRepository.buscarMovimentacoes();
  }
}

export default new MovimentacoesService();
