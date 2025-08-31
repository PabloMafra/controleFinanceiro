import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import SetaCima from "react-native-vector-icons/AntDesign";
import SetaBaixo from "react-native-vector-icons/AntDesign";
import { TipoMovimentacao } from "@/src/shared/enum/TipoMovimentacao";

interface TipoSelecaoScreenProps {
  onSelectTipo: (tipo: number) => void;
}

export const TipoSelecaoScreen: React.FC<TipoSelecaoScreenProps> = ({
  onSelectTipo,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione o tipo de movimentação</Text>
      <View style={styles.opcoesContainer}>
        <Pressable
          style={styles.opcao}
          onPress={() => onSelectTipo(TipoMovimentacao.ENTRADA)}
        >
          <SetaCima name="arrowup" size={50} color="green" />
          <Text style={styles.textoOpcao}>Entrada</Text>
        </Pressable>

        <Pressable
          style={styles.opcao}
          onPress={() => onSelectTipo(TipoMovimentacao.SAIDA)}
        >
          <SetaBaixo name="arrowdown" size={50} color="red" />
          <Text style={styles.textoOpcao}>Saída</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    marginBottom: 150,
    fontSize: 16,
    fontWeight: "bold",
  },
  opcoesContainer: {
    flexDirection: "row",
    gap: 50,
  },
  opcao: {
    alignItems: "center",
  },
  textoOpcao: {
    textAlign: "center",
  },
});