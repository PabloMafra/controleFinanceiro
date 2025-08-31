import React, { useState, useRef, useEffect } from "react";
import { Pressable, View, Text, Alert, StyleSheet } from "react-native";
import IconeAdicionarCartao from "react-native-vector-icons/MaterialCommunityIcons";
import IconeAdicionarGasto from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import { getUserLogin } from "../../shared/util/funcoes";
import { MovimentacaoModal } from "./Modal";
import { MovimentacaoData } from "./types";
import CartaoModal from "./Modal/ModalAddCartao";
import CartaoService from "@/src/services/CartaoService";

const SecaoOpcoes: React.FC = () => {
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [abrirModalCartao, setAbrirModalCartao] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userLogin = await getUserLogin();
      setUserId(userLogin);
    };
    fetchUserId();
  }, []);

  const handleCloseModal = () => setAbrirModal(false);
  const handleCloseModalCartao = () => setAbrirModalCartao(false);

  const handleSubmitMovimentacao = (data: MovimentacaoData) => {
    setAbrirModal(false);
  };

  const handleAdicionarCartao = () => setAbrirModalCartao(true);
  const teste = async (data: any) => {
    await CartaoService.criarCartao(data);
  };
  return (
    <View style={styles.opcoes}>
      <Pressable onPress={() => setAbrirModal(true)}>
        <View style={styles.botaoConteudo}>
          <View style={styles.opcao}>
            <IconeAdicionarGasto name="attach-money" size={20} />
          </View>
          <View>
            <Text style={styles.textoBotao}>Adicionar{"\n"}movimentação</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={handleAdicionarCartao}>
        <View style={styles.botaoConteudo}>
          <View style={styles.opcao}>
            <IconeAdicionarCartao name="card-plus-outline" size={20} />
          </View>
          <View>
            <Text style={styles.textoBotao}>Adicionar{"\n"}cartão</Text>
          </View>
        </View>
      </Pressable>

      <Modal isVisible={abrirModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <SetaVoltar
            name="arrowleft"
            size={20}
            onPress={handleCloseModal}
            style={{ margin: 15 }}
          />
          <MovimentacaoModal
            userId={userId}
            onClose={handleCloseModal}
            onSubmit={handleSubmitMovimentacao}
          />
        </View>
      </Modal>

      <Modal isVisible={abrirModalCartao} style={styles.modal}>
        <View style={styles.modalContent}>
          <SetaVoltar
            name="arrowleft"
            size={20}
            onPress={handleCloseModalCartao}
            style={{ margin: 15 }}
          />
          <CartaoModal
            onClose={handleCloseModalCartao}
            onSubmit={(data) => {
              console.log("Cartão adicionado:", data);
              teste(data);
            }}
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
    marginEnd: 14,
    marginTop: 14,
    paddingTop: 5,
    paddingBottom: 10,
    zIndex: 2,
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
    width: 90,
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

export default SecaoOpcoes;
