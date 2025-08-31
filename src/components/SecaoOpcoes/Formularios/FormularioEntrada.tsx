import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CampoValor } from "../Campos/CampoValor";
import { CampoCategoria } from "../Campos/CampoCategoria";
import { CampoData } from "../Campos/CampoData";
import { MovimentacaoFormData, FormErrors } from "../types";

interface FormularioEntradaProps {
  formData: MovimentacaoFormData;
  errors: FormErrors;
  onUpdateData: (data: Partial<MovimentacaoFormData>) => void;
}

export const FormularioEntrada: React.FC<FormularioEntradaProps> = ({
  formData,
  errors,
  onUpdateData,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastre os dados de entrada</Text>

      <CampoValor
        valor={formData.valor}
        onChangeValor={(valor) => onUpdateData({ valor })}
        hasError={errors.valor}
      />

      <CampoCategoria
        selectedOption={formData.categoria}
        onChangeOption={(categoria) => onUpdateData({ categoria })}
        hasError={errors.categoria}
      />

      <CampoData
        date={formData.data}
        onChangeDate={(data) => onUpdateData({ data })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  titulo: {
    marginBottom: 50,
  },
});
