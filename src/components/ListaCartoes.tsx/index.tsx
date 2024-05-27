import React, { useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

interface CartoesProps {
  cartoes?: ICartao[];
}

const ListaCartoes: React.FC<CartoesProps> = ({ cartoes }) => {
  const cartoesFicticios: ICartao[] = [
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

  const handleCardPress = (cartao: ICartao) => {
    Alert.alert(
      "Cartão selecionado",
      `Banco: ${cartao.banco}\nNúmero: ${cartao.content}`
    );
  };

  const renderItem = ({ item }: { item: ICartao }) => (
    <Pressable
      onPress={() => handleCardPress(item)}
      style={[{ backgroundColor: item.cor }, styles.cardContainer]}
    >
      <Text style={styles.cardTitle}>{item.banco}</Text>
      <View style={styles.numeroCartao}>
        <Text style={styles.cardContent}>{item.content}</Text>
        {item.bandeira === "visa" ? (
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

  return (
    <FlatList
      data={cartoesFicticios}
      renderItem={renderItem}
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
});

export default ListaCartoes;
