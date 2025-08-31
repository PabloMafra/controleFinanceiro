import { TipoMovimentacao } from "@/src/shared/enum/TipoMovimentacao";
import React from "react";
import { View, Text, Pressable } from "react-native";
import SetaCima from "react-native-vector-icons/AntDesign";
import SetaBaixo from "react-native-vector-icons/AntDesign";

type Props = {
  onSelectTipo: (tipo: number) => void;
};

export const SlideTipoMovimentacao: React.FC<Props> = ({ onSelectTipo }) => {
  return (
    <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 150, fontSize: 16, fontWeight: "bold" }}>
        Selecione o tipo de movimentação
      </Text>
      <View style={{ flexDirection: "row", gap: 50 }}>
        <Pressable onPress={() => onSelectTipo(TipoMovimentacao.ENTRADA)}>
          <SetaCima name="arrowup" size={50} color="green" />
          <Text style={{ textAlign: "center" }}>Entrada</Text>
        </Pressable>
        <Pressable onPress={() => onSelectTipo(TipoMovimentacao.SAIDA)}>
          <SetaBaixo name="arrowdown" size={50} color="red" />
          <Text style={{ textAlign: "center" }}>Saída</Text>
        </Pressable>
      </View>
    </View>
  );
};
