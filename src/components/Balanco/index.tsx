import { IGasto } from "@/src/interfaces/IGastos";
import { formatarValor } from "@/src/util/valores";
import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";

interface MovimentacoesProps {
  movimentacoes: IGasto[];
}

const Balanco: React.FC<MovimentacoesProps> = ({ movimentacoes }) => {
  const valores = useMemo(() => {
    if (!movimentacoes) return { entrada: 0, saida: 0, lucro: 0 };

    const entrada = movimentacoes
      .filter((gasto) => gasto.tipo === 0)
      .reduce((acc, gasto) => acc + gasto.valor, 0);

    const saida = movimentacoes
      .filter((gasto) => gasto.tipo === 1)
      .reduce((acc, gasto) => acc + gasto.valor, 0);

    const lucro = entrada - saida;

    return { entrada, saida, lucro };
  }, [movimentacoes]);

  const definirCorValores = (entrada: number) => {
    if (entrada < 0) {
      return styles.despesas;
    }
    if (entrada > 0) {
      return styles.lucro;
    }
    return styles.neutro;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.itemTitulo}>Entrada</Text>
          <View style={styles.content}>
            <Text style={styles.simboloMoeda}>R$</Text>
            <Text style={styles.balanco}>{formatarValor(valores.entrada)}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.itemTitulo}>Gastos</Text>
          <View style={styles.content}>
            <Text style={styles.simboloMoeda}>R$</Text>
            <Text style={styles.despesas}>{formatarValor(valores.saida)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.itemTitulo}>Lucro</Text>
        <View style={styles.content}>
          <Text style={styles.simboloMoeda}>R$</Text>
          <Text style={definirCorValores(valores.lucro)}>{formatarValor(valores.lucro)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -24,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 99,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "center",
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
  despesas: {
    fontSize: 22,
    color: "#e74c3c",
  },
  lucro: {
    fontSize: 22,
    color: "#2ecc71",
  },
  neutro: {
    fontSize: 22,
    color: "#bebbbb",
  },
});

export default Balanco;
