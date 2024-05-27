export interface IGasto {
  id: number;
  valor: number;
  data: Date;
  tipo: number;
  idCategoria: number;
  idPessoa: number;
  idCartao?: number;
}
