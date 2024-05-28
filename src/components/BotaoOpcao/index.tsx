import React from "react";
import { Pressable, View, Text, Alert, StyleSheet } from "react-native";
import IconeAdicionarCartao from "react-native-vector-icons/MaterialCommunityIcons";

const BotaoOpcao: React.FC = () => {
  return (
    <View style={styles.opcoes}>
      <Pressable onPress={() => Alert.alert("teste")}>
        <View style={styles.botaoConteudo}>
          <View style={styles.opcao}>
            <IconeAdicionarCartao name="card-plus-outline" size={20} />
          </View>
          <View>
            <Text style={styles.textoBotao}>Adicionar{"\n"}cartão</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  opcoes: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    justifyContent: "flex-end",
    marginStart: 14,
    marginEnd: 14,
    marginTop: 14,
  },
  opcao: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 12,
  },
  botaoConteudo: {
    backgroundColor: "#eeeeee",
    width: 80,
    alignItems: "center",
  },
});

export default BotaoOpcao;
