export interface IMovimentacao {
  id: number;
  tipo: number;
  valor: number;
  dia: Date;
  idCategoria: number;
  idCartao?: number | null;
}
