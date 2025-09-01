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
  Animated,
} from "react-native";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import CardGastos from "../CardGastos";
import { getCorCartao, getNomeCartao } from "@/src/shared/util/funcoes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { fetchCartoes } from "@/src/store/cartaoSlice";
import { Cartao } from "@/src/services/CartaoService";

const { width } = Dimensions.get("window");

interface CartoesProps {
  gastos?: IMovimentacao[];
}

const CardSkeleton: React.FC = () => {
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-(width * 0.7), width * 0.7],
  });

  return (
    <View style={[styles.cardContainer, styles.cardSkeleton]}>
      <View style={styles.skeletonTitle} />
      <View style={styles.numeroCartao}>
        <View style={styles.skeletonNumber} />
        <View style={styles.skeletonLogo} />
      </View>
      
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const Card: React.FC<{ cartao: Cartao; onPress?: () => void }> = ({
  cartao,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={[{ backgroundColor: cartao.cor ?? getCorCartao(cartao.banco) }, styles.cardContainer]}
  >
    <Text style={styles.cardTitle}>{getNomeCartao(cartao.banco)}</Text>
    <View style={styles.numeroCartao}>
      <Text style={styles.cardContent}>{cartao.ultimosNumeros}</Text>
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

const ListaCartoes: React.FC<CartoesProps> = ({ gastos }) => {
// console.log(gastos, 'gastos**')
  const dispatch = useDispatch<AppDispatch>();
  const { cartoes, loading, error } = useSelector((state: RootState) => state.cartoes);

  useEffect(() => {
    dispatch(fetchCartoes());
  }, [dispatch]);

  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Cartao | null>(null);

  const handleCardPress = (cartao: Cartao) => {
    setSelectedCard(cartao);
    setAbrirModal(true);
  };

const gastosSelecionados = useMemo(() => {
  if (!gastos || !selectedCard) return [];
  return gastos.filter(gasto => gasto.idCartao === selectedCard.id);
}, [gastos, selectedCard]);

const totalGastos = useMemo(() => {
  return gastosSelecionados.reduce((acc, gasto) => acc + gasto.valor, 0);
}, [gastosSelecionados]);

  // console.log(gastosSelecionados, 'testee')
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

  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <CardSkeleton />}
        keyExtractor={(item, index) => `skeleton-${index}`}
        horizontal
        snapToOffsets={[...Array(3)].map(
          (_, i) => i * (width * 0.7 - 40) + (i - 1) * 40
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
    );
  }

  return (
    <>
      <FlatList
        data={cartoes}
        renderItem={({ item }) => (
          // console.log(item, 'item***'),
          <Card cartao={item} onPress={() => handleCardPress(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        snapToOffsets={[...Array(cartoes?.length)].map(
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
              {gastosSelecionados?.map((gasto) => {
                return (
                  <CardGastos
                    movimentacao={gasto}
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
  cardSkeleton: {
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  skeletonTitle: {
    height: 28,
    width: "60%",
    backgroundColor: "#C0C0C0",
    borderRadius: 4,
  },
  skeletonNumber: {
    height: 20,
    width: 80,
    backgroundColor: "#C0C0C0",
    borderRadius: 4,
  },
  skeletonLogo: {
    height: 20,
    width: 50,
    backgroundColor: "#C0C0C0",
    borderRadius: 4,
    marginEnd: 15,
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 40,
    transform: [{ skewX: "-20deg" }],
  },
});

export default ListaCartoes;
