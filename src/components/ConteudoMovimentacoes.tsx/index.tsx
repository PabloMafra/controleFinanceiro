import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import CardGastos from "../CardGastos";
import ListaCartoes from "../ListaCartoes.tsx";
import { IGasto } from "@/src/interfaces/IGastos";

interface MovimentacoesProps {
  movimentacoes: IGasto[];
}

const ConteudoMovimentacoes: React.FC<MovimentacoesProps> = ({
  movimentacoes,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listaCartoes}>
        <ListaCartoes gastos={movimentacoes} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {movimentacoes.map((movimentacao) => {
          return <CardGastos gasto={movimentacao} key={movimentacao.id} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    flex: 1,
    borderRadius: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  itemTitulo: {
    fontSize: 20,
    color: "#bebbbb",
    marginRight: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  simboloMoeda: {
    color: "#DADADA",
    marginRight: 6,
  },
  balanco: {
    fontSize: 22,
    color: "#84a100",
  },
  itemGastos: {
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingStart: 18,
    paddingEnd: 18,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listaCartoes: {
    marginTop: 10,
    marginBottom: 20,
    marginEnd: 14,
    marginStart: 5,
  },
  listaGastos: {
    marginEnd: 14,
    marginStart: 14,
  },
});

export default ConteudoMovimentacoes;
