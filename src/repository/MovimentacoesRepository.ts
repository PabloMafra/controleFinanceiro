import { IMovimentacao } from "../interfaces/IMovimentacao";

class MovimentacoesRepository {
  buscarMovimentacoes() {
    const gastos: IMovimentacao[] = [
      {
        id: 1,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 0,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 2,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 0,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 3,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 0,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 4,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 1,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 5,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 1,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 6,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 1,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
      {
        id: 7,
        idPessoa: 1,
        nomePessoa: "Pablo",
        descricaoMovimentacao: "Uber",
        tipoMovimentacao: 1,
        valorMovimentacao: 100,
        diaMovimentacao: new Date(),
        banco: "xp",
        numeroCartao: 4139,
        idCategoria: 1,
      },
    ];

    return gastos;
  }
}

export default new MovimentacoesRepository();
