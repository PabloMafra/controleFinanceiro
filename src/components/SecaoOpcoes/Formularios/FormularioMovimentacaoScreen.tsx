import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TipoMovimentacao } from "../../../shared/enum/TipoMovimentacao";
import { FormularioEntrada } from "./FormularioEntrada";
import { FormularioSaida } from "./FormularioSaida";
import { MovimentacaoFormData, FormErrors } from "../types";

interface FormularioMovimentacaoScreenProps {
  tipoMovimentacao: number | null;
  formData: MovimentacaoFormData;
  errors: FormErrors;
  onUpdateData: (data: Partial<MovimentacaoFormData>) => void;
}

export const FormularioMovimentacaoScreen: React.FC<
  FormularioMovimentacaoScreenProps
> = ({ tipoMovimentacao, formData, errors, onUpdateData }) => {
  if (tipoMovimentacao === TipoMovimentacao.SAIDA) {
    return (
      <FormularioSaida
        formData={formData}
        errors={errors}
        onUpdateData={onUpdateData}
      />
    );
  }

  if (tipoMovimentacao === TipoMovimentacao.ENTRADA) {
    return (
      <FormularioEntrada
        formData={formData}
        errors={errors}
        onUpdateData={onUpdateData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Selecione o tipo de movimentação anteriormente</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
