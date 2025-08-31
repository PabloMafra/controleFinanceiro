import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { View, StyleSheet } from "react-native";
import Header from "@/src/components/Header";
import Balanco from "@/src/components/Balanco";
import ConteudoMovimentacoes from "@/src/components/ConteudoMovimentacoes.tsx";
import SecaoOpcoes from "@/src/components/SecaoOpcoes";
import { IMovimentacao } from "@/src/interfaces/IMovimentacao";
import MovimentacoesServices from "@/src/services/MovimentacoesServices";
import { store } from "@/src/store";

export default function Home(): React.JSX.Element {
  const [movimentacoes, setMovimentacoes] = useState<IMovimentacao[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await MovimentacoesServices.buscarMovimentacoes();
      setMovimentacoes(res);
    };
    fetchData();
  }, []);

  const [reloadKey, setReloadKey] = useState(0);

  const forceReload = () => setReloadKey(prev => prev + 1);

  return (
    <View style={styles.container} key={reloadKey}>
      <Provider store={store}>
        <Header teste={forceReload} />
        <Balanco movimentacoes={movimentacoes} />
        <SecaoOpcoes />
        <ConteudoMovimentacoes movimentacoes={movimentacoes}/>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
