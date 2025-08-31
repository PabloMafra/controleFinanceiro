import { useState } from "react";
import MovimentacoesServices, { Movimentacoes } from "@/src/services/MovimentacoesServices";
import { MovimentacaoFormData, FormErrors, MovimentacaoData } from "../types";
import { descricaoMovimentacao } from "@/src/shared/enum/descricaoMovimentacao";

export const useMovimentacao = (
  userId: string | null,
  onSubmit: (data: MovimentacaoData) => void
) => {
  const [tipoMovimentacao, setTipoMovimentacao] = useState<number | null>(null);
  const [formData, setFormData] = useState<MovimentacaoFormData>({
    valor: "0",
    categoria: 0,
    formaPagamento: "",
    cartao: "",
    data: new Date(),
  });
  const [errors, setErrors] = useState<FormErrors>({
    valor: false,
    categoria: false,
    formaPagamento: false,
  });

  const updateFormData = (data: Partial<MovimentacaoFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateAndSubmit = async () => {
    const valorError = formData.valor === "0,00" || formData.valor === "0";
    const categoriaError = formData.categoria === descricaoMovimentacao.CATEGORIA || !formData.categoria;
    const formaPagamentoError = tipoMovimentacao === 1 && 
      (formData.formaPagamento === "Forma de pagamento" || !formData.formaPagamento);

    setErrors({
      valor: valorError,
      categoria: categoriaError,
      formaPagamento: formaPagamentoError,
    });

    if (!valorError && !categoriaError && !formaPagamentoError) {
      const dataAjustada = new Date(formData.data);
      dataAjustada.setMinutes(dataAjustada.getMinutes() - dataAjustada.getTimezoneOffset());

      const movimentacao: Movimentacoes = {
        valor: parseFloat(formData.valor.replace(',', '.')),
        dia: dataAjustada,
        tipo: tipoMovimentacao,
        idCategoria: formData.categoria,
        user_id: userId,
        idCartao: formData.cartao ? Number(formData.cartao) : null,
      };

      await MovimentacoesServices.salvarMovimentacao(movimentacao);
      
      onSubmit({
        valor: movimentacao.valor,
        dia: movimentacao.dia,
        tipo: movimentacao.tipo,
        idCategoria: movimentacao.idCategoria,
        user_id: movimentacao.user_id,
        idCartao: formData.cartao ? Number(formData.cartao) : null,
      });

      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      valor: "0",
      categoria: 0,
      formaPagamento: "",
      cartao: "",
      data: new Date(),
    });
    setErrors({
      valor: false,
      categoria: false,
      formaPagamento: false,
    });
    setTipoMovimentacao(null);
  };

  return {
    tipoMovimentacao,
    formData,
    errors,
    setTipoMovimentacao,
    updateFormData,
    validateAndSubmit,
    resetForm,
  };
};