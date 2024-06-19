export const formatarValor = (valor: number): string => {
  return valor?.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
