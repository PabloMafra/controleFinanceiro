import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { getListaCartao, getNomeCartao } from "@/src/shared/util/funcoes";

interface CampoFormaPagamentoProps {
  selectedFormaPagamento: string;
  selectedCartao: string;
  onChangeFormaPagamento: (option: string) => void;
  onChangeCartao: (option: string) => void;
  hasError: boolean;
}

export const CampoFormaPagamento: React.FC<CampoFormaPagamentoProps> = ({
  selectedFormaPagamento,
  selectedCartao,
  onChangeFormaPagamento,
  onChangeCartao,
  hasError,
}) => {
  const optionsFormaPagamento = ["Forma de pagamento", "Pix", "Cartão"];
  const { cartoes, loading, error } = useSelector(
    (state: RootState) => state.cartoes
  );

  const listaCartoes = cartoes.map((cartao) => ({
    id: cartao.id,
    nome: getNomeCartao(cartao.banco),
  }));
  const optionsCartao = [
    { id: "", nome: "Selecione o cartão" },
    ...listaCartoes,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFormaPagamento}
          onValueChange={onChangeFormaPagamento}
          style={styles.picker}
        >
          {optionsFormaPagamento.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.helpTextContainer}>
        <Text style={[styles.helpText, { opacity: hasError ? 1 : 0 }]}>
          Campo obrigatório*
        </Text>
      </View>

      {selectedFormaPagamento === "Cartão" && (
        <View style={[styles.pickerContainer, { marginBottom: 15 }]}>
          <Picker
            selectedValue={selectedCartao.toString()}
            onValueChange={onChangeCartao}
            style={styles.picker}
          >
            {optionsCartao.map((option, index) => (
              <Picker.Item
                key={option.id || option.nome}
                label={option.nome}
                value={option.id}
                enabled={index !== 0}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    width: "100%",
  },
  helpTextContainer: {
    width: "100%",
    height: 20,
    marginTop: -5,
  },
  helpText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});
