export interface MovimentacaoFormData {
  valor: string;
  categoria: number;
  formaPagamento: string;
  cartao: string;
  data: Date;
}

export interface FormErrors {
  valor: boolean;
  categoria: boolean;
  formaPagamento: boolean;
}

export interface MovimentacaoData {
  valor: number;
  dia: Date;
  tipo: number | null;
  idCategoria: number;
  user_id: string | null;
  idCartao: number | null;
}