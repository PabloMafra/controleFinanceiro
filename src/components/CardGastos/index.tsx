import React from "react";
import { View, StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import IconeTransporte from "react-native-vector-icons/AntDesign";
import IconeComida from "react-native-vector-icons/MaterialIcons";
import IconePix from "react-native-vector-icons/MaterialIcons";
import { IMovimentacao } from "@/src/interfaces/IMovimentacao";
import { formatarValor } from "@/src/shared/util/valores";
import { TipoMovimentacao } from "@/src/shared/enum/TipoMovimentacao";
import { descricaoMovimentacao } from "@/src/shared/enum/descricaoMovimentacao";
import IconeRoupa from "react-native-vector-icons/Ionicons";
import IconePresente from "react-native-vector-icons/SimpleLineIcons";
import IconeCasa from "react-native-vector-icons/FontAwesome6";
import IconeEletronicos from "react-native-vector-icons/MaterialCommunityIcons";
import IconeDefault from "react-native-vector-icons/AntDesign";

interface MovimentacaoProps {
  movimentacao: IMovimentacao;
  style?: StyleProp<ViewStyle>;
}

const CardGastos: React.FC<MovimentacaoProps> = ({ movimentacao, style }) => {
  const getIconeCategoria = (idCategoria: number) => {
    switch (idCategoria) {
      case descricaoMovimentacao.TRANSPORTE:
        return <IconeTransporte name="car" size={20} color="#000" />;
      case descricaoMovimentacao.ALIMENTO:
        return <IconeComida name="lunch-dining" size={20} color="#000" />;
      case descricaoMovimentacao.ROUPAS:
        return <IconeRoupa name="shirt-outline" size={20} color="#000" />;
      case descricaoMovimentacao.PRESENTE:
        return <IconePresente name="bag" size={20} color="#000" />;
      case descricaoMovimentacao.APARTAMENTO:
        return <IconeCasa name="house-chimney" size={20} color="#000" />;
      case descricaoMovimentacao.ELETRONICOS:
        return <IconeEletronicos name="lunch-dining" size={20} color="#000" />;
      case descricaoMovimentacao.PIX:
        return <IconePix name="pix" size={20} color="#2EBDAF" />;
      default:
        return <IconeDefault name="questioncircleo" size={20} color="#000" />;
    }
  };

  const getDescricaoCategoria = (idCategoria: number) => {
    switch (idCategoria) {
      case descricaoMovimentacao.TRANSPORTE:
        return "Transporte";
      case descricaoMovimentacao.ALIMENTO:
        return "Alimentação";
      case descricaoMovimentacao.ROUPAS:
        return "Roupas";
      case descricaoMovimentacao.PRESENTE:
        return "Presentes";
      case descricaoMovimentacao.APARTAMENTO:
        return "Casa";
      case descricaoMovimentacao.ELETRONICOS:
        return "Eletrônicos";
      case descricaoMovimentacao.PIX:
        return "Pix";
      default:
        return "Outros";
    }
  };

  return (
    <View style={[styles.itemGastos, style]}>
      <View style={styles.descricao}>
        {getIconeCategoria(movimentacao?.idCategoria)}
        <Text
          style={styles.textoDescricao}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getDescricaoCategoria(movimentacao?.idCategoria)}
        </Text>
      </View>
      <View style={styles.valores}>
        <Text style={styles.simboloMoeda}>R$</Text>
        <Text
          style={[
            styles.balanco,
            {
              color:
                movimentacao?.tipo === TipoMovimentacao.ENTRADA
                  ? "#2ecc71"
                  : "#e74c3c",
            },
          ]}
        >
          {formatarValor(movimentacao?.valor)}
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
  descricao: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    maxWidth: "70%",
  },
  textoDescricao: {
    flexShrink: 1,
    fontSize: 16,
  },
});

export default CardGastos;
