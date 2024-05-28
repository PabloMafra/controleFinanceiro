export interface IGasto {
  id: number;
  valor: number;
  data: Date;
  tipo: number;
  descricao: string;
  idCategoria: number;
  idPessoa: number;
  idCartao?: number;
}
