export interface IMovimentacao {
  id: number;
  idPessoa: number;
  nomePessoa: string;
  descricaoMovimentacao: string;
  tipoMovimentacao: number;
  valorMovimentacao: number;
  diaMovimentacao: Date;
  banco: string;
  numeroCartao: number;

  idCategoria: number;
}
