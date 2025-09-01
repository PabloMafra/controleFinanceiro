export interface IMovimentacao {
  id: number;
  tipo: number;
  valor: number;
  dia: Date | string;
  idCategoria: number;
  idCartao?: number | null;
}
