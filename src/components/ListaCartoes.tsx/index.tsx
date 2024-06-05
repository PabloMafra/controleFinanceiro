import { IMovimentacao } from "@/src/interfaces/IMovimentacao";
import React, { useState, useMemo, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import CardGastos from "../CardGastos";
import { useBackHandler } from "@react-native-community/hooks";

const { width } = Dimensions.get("window");

interface Cartao {
  id: number;
  banco: string;
  content: string;
  bandeira: string;
  cor: string;
}

interface CartoesProps {
  cartoes?: Cartao[];
  gastos?: IMovimentacao[];
}

const Card: React.FC<{ cartao: Cartao; onPress?: () => void }> = ({
  cartao,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={[{ backgroundColor: cartao.cor }, styles.cardContainer]}
  >
    <Text style={styles.cardTitle}>{cartao.banco}</Text>
    <View style={styles.numeroCartao}>
      <Text style={styles.cardContent}>{cartao.content}</Text>
      {cartao.bandeira === "visa" ? (
        <Image
          source={require(`../../../assets/images/visa.webp`)}
          style={{ width: 50, height: 16, marginEnd: 15, marginTop: 5 }}
        />
      ) : (
        <Image
          source={require(`../../../assets/images/mastercard.png`)}
          style={{ height: 25, marginEnd: 15 }}
        />
      )}
    </View>
  </Pressable>
);

const ListaCartoes: React.FC<CartoesProps> = ({ cartoes, gastos }) => {
  const cartoesFicticios: Cartao[] = [
    {
      id: 0,
      banco: "XP",
      content: "**** **** **** 4139",
      bandeira: "visa",
      cor: "#000",
    },
    {
      id: 1,
      banco: "Nubank",
      content: "**** **** **** 9876",
      bandeira: "mastercard",
      cor: "#820ad1",
    },
    {
      id: 2,
      banco: "PicPay",
      content: "**** **** **** 9876",
      bandeira: "mastercard",
      cor: "#11C76F",
    },
    {
      id: 3,
      banco: "Itau",
      content: "**** **** **** 9876",
      bandeira: "mastercard",
      cor: "#FF6200",
    },
    {
      id: 4,
      banco: "Caixa",
      content: "**** **** **** 9876",
      bandeira: "visa",
      cor: "#005CA9",
    },
    {
      id: 5,
      banco: "Aleatorio",
      content: "**** **** **** 9876",
      bandeira: "visa",
      cor: "#346969",
    },
  ];

  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Cartao | null>(null);

  const handleCardPress = (cartao: Cartao) => {
    setSelectedCard(cartao);
    setAbrirModal(true);
  };

  const totalGastos = useMemo(() => {
    if (!gastos) return 0;
    return gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  }, [gastos]);

  useEffect(() => {
    const backAction = () => {
      if (abrirModal) {
        setAbrirModal(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [abrirModal]);

  return (
    <>
      <FlatList
        data={cartoesFicticios}
        renderItem={({ item }) => (
          <Card cartao={item} onPress={() => handleCardPress(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        snapToOffsets={[...Array(cartoesFicticios.length)].map(
          (_, i) => i * (width * 0.7 - 40) + (i - 1) * 40
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
      <Modal
        isVisible={abrirModal}
        onBackdropPress={() => setAbrirModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {selectedCard && (
            <SetaVoltar
              name="arrowleft"
              size={20}
              onPress={() => setAbrirModal(false)}
              style={{ margin: 15 }}
            />
          )}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ padding: 15 }}>
              <View style={{ marginBottom: 15 }}>
                <Text>Gastos por cartão</Text>
              </View>
              <View style={styles.containerFatura}>
                <View style={styles.conteudoFatura}>
                  <Text>R${totalGastos.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <View>
              {gastos?.map((gasto) => {
                return (
                  <CardGastos
                    gasto={gasto}
                    key={gasto.id}
                    style={styles.cardGastos}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    height: width / 2.6,
    width: width * 0.7 - 20,
    marginHorizontal: 10,
    paddingStart: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cardContent: {
    fontSize: 18,
    color: "white",
  },
  numeroCartao: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "auto",
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
  containerFatura: {
    flexDirection: "row",
    gap: 10,
  },
  conteudoFatura: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#949393",
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  cardGastos: {
    borderWidth: 1,
    borderColor: "#949393",
  },
});

export default ListaCartoes;
