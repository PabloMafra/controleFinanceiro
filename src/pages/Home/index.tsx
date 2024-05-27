import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import Header from "@/src/components/Header";
import Balanco from "@/src/components/Balanco";
import ConteudoGastos from "@/src/components/ConteudoGastos.tsx";
import IconeAdicionarCartao from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home(): React.JSX.Element {
  const [showMessage, setShowMessage] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Header />
      <Balanco />
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
      <ConteudoGastos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },

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
