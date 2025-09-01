import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import Header from "@/src/components/Header";
import Balanco from "@/src/components/Balanco";
import ConteudoMovimentacoes from "@/src/components/ConteudoMovimentacoes.tsx";
import SecaoOpcoes from "@/src/components/SecaoOpcoes";
import { AppDispatch, RootState } from "@/src/store";
import { fetchMovimentacoes } from "@/src/store/movimentacoesSlice";
import { fetchCartoes } from "@/src/store/cartaoSlice";

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const { movimentacoes, loading, error } = useSelector(
    (state: RootState) => state.movimentacoes
  );

  useEffect(() => {
    dispatch(fetchMovimentacoes());
  }, [dispatch]);

  const [reloadKey, setReloadKey] = useState(0);

  const forceReload = () => {
    setReloadKey((prev) => prev + 1);
    dispatch(fetchMovimentacoes());
    dispatch(fetchCartoes());
  };

  return (
    <View style={styles.container} key={reloadKey}>
      <Header teste={forceReload} />
      <Balanco movimentacoes={movimentacoes} />
      <SecaoOpcoes />
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
