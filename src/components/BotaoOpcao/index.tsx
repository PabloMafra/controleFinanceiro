import React, { useState } from "react";
import { Pressable, View, Text, Alert, StyleSheet } from "react-native";
import IconeAdicionarCartao from "react-native-vector-icons/MaterialCommunityIcons";
import IconeAdicionarGasto from "react-native-vector-icons/MaterialIcons";
import AppIntroSlider from "react-native-app-intro-slider";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";

const BotaoOpcao: React.FC = () => {
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const slides = [
    {
      key: 1,
      title: "dados",
      text: "coloque os dados",
    },
    {
      key: 2,
      title: "dados",
      text: "coloque os dados",
    },
    {
      key: 3,
      title: "dados",
      text: "coloque os dados",
    },
  ];

  const renderSlides = ({ item }: any) => {
    return (
      <View style={{ flex: 1 }}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.opcoes}>
      <Pressable onPress={() => setAbrirModal(true)}>
        <View style={styles.botaoConteudo}>
          <View style={styles.opcao}>
            <IconeAdicionarGasto name="attach-money" size={20} />
          </View>
          <View>
            <Text style={styles.textoBotao}>Adicionar{"\n"}gasto</Text>
          </View>
        </View>
      </Pressable>
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
      <Modal
        isVisible={abrirModal}
        onBackdropPress={() => setAbrirModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <SetaVoltar
            name="arrowleft"
            size={20}
            onPress={() => setAbrirModal(false)}
            style={{ margin: 15 }}
          />
          <AppIntroSlider
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={{
              backgroundColor: "#469cff94",
              width: 30,
            }}
            renderNextButton={() => <Text>Próximo</Text>}
            renderDoneButton={() => <Text>Registrar</Text>}
            onDone={() => setAbrirModal(false)}
          />
        </View>
      </Modal>
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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    minHeight: "100%",
    flex: 1,
  },
});

export default BotaoOpcao;
