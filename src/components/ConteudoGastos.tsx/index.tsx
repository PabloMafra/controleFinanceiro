import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import CardGastos from "../CardGastos";
import ListaCartoes from "../ListaCartoes.tsx";
import { IGasto } from "@/src/interfaces/IGastos";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ConteudoGastos(): React.JSX.Element {
  const gastos: IGasto[] = [
    {
      id: 1,
      valor: 100,
      data: new Date(),
      tipo: 1,
      idCategoria: 1,
      idCartao: 2,
      idPessoa: 1,
    },
    {
      id: 2,
      valor: 300,
      data: new Date(),
      tipo: 1,
      idCategoria: 2,
      idCartao: 3,
      idPessoa: 2,
    },
    {
      id: 3,
      valor: 400,
      data: new Date(),
      tipo: 0,
      idCategoria: 3,
      idCartao: 4,
      idPessoa: 3,
    },
    {
      id: 4,
      valor: 1900,
      data: new Date(),
      tipo: 1,
      idCategoria: 3,
      idPessoa: 1,
    },
    {
      id: 5,
      valor: 1900,
      data: new Date(),
      tipo: 0,
      idCategoria: 3,
      idPessoa: 1,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.listaCartoes}>
        <ListaCartoes />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {gastos.map((gasto) => {
          return <CardGastos gastos={gasto} key={gasto.id} />;
        })}
      </ScrollView>
    </View>
  );
}

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
