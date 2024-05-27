import React from "react";
import { View, StyleSheet, Text } from "react-native";
import IconeTransporte from "react-native-vector-icons/AntDesign";
import IconeComida from "react-native-vector-icons/MaterialIcons";
import IconePix from "react-native-vector-icons/MaterialIcons";

import { IGasto } from "@/src/interfaces/IGastos";
import formatarValor from "@/src/util/valores";

interface GastosProps {
  gastos: IGasto;
}

const CardGastos: React.FC<GastosProps> = ({ gastos }) => {
  const getIconeCategoria = (idCategoria: number) => {
    switch (idCategoria) {
      case 1:
        return <IconeTransporte name="car" size={20} color="#000" />;
      case 2:
        return <IconeComida name="lunch-dining" size={20} color="#000" />;
      default:
        return <IconePix name="pix" size={20} color="#2EBDAF" />;
    }
  };

  return (
    <View style={styles.itemGastos}>
      {getIconeCategoria(gastos.idCategoria)}
      <View style={styles.valores}>
        <Text style={styles.simboloMoeda}>R$</Text>
        <Text
          style={[
            styles.balanco,
            { color: gastos.tipo === 0 ? "#2ecc71" : "#e74c3c" },
          ]}
        >
          {formatarValor(gastos.valor)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  simboloMoeda: {
    color: "#DADADA",
    marginRight: 6,
  },
  balanco: {
    fontSize: 22,
  },
  itemGastos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingStart: 18,
    paddingEnd: 18,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  valores: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CardGastos;
