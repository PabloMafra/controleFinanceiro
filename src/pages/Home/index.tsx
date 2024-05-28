import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "@/src/components/Header";
import Balanco from "@/src/components/Balanco";
import ConteudoMovimentacoes from "@/src/components/ConteudoMovimentacoes.tsx";
import BotaoOpcao from "@/src/components/BotaoOpcao";
import { IGasto } from "@/src/interfaces/IGastos";
import MovimentacoesServices from "@/src/services/MovimentacoesServices";

export default function Home(): React.JSX.Element {
  const [movimentacoes, setMovimentacoes] = useState<IGasto[]>([]);

  useEffect(() => {
    const res = MovimentacoesServices.buscarMovimentacoes();
    setMovimentacoes(res);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Balanco movimentacoes={movimentacoes} />
      <BotaoOpcao />
      <ConteudoMovimentacoes movimentacoes={movimentacoes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
