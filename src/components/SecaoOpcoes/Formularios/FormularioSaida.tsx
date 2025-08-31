import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CampoValor } from "../Campos/CampoValor";
import { CampoCategoria } from "../Campos/CampoCategoria";
import { CampoFormaPagamento } from "../Campos/CampoFormaPagamento";
import { CampoData } from "../Campos/CampoData";
import { MovimentacaoFormData, FormErrors } from "../types";

interface FormularioSaidaProps {
  formData: MovimentacaoFormData;
  errors: FormErrors;
  onUpdateData: (data: Partial<MovimentacaoFormData>) => void;
}

export const FormularioSaida: React.FC<FormularioSaidaProps> = ({
  formData,
  errors,
  onUpdateData,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastre seu gasto abaixo</Text>

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

      <CampoFormaPagamento
        selectedFormaPagamento={formData.formaPagamento}
        selectedCartao={formData.cartao}
        onChangeFormaPagamento={(formaPagamento) =>
          onUpdateData({ formaPagamento })
        }
        onChangeCartao={(cartao) => onUpdateData({ cartao })}
        hasError={errors.formaPagamento}
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
