import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserLogin = async () => {
  return await AsyncStorage.getItem("user_id");
};

export const getNomeCartao = (banco: number) => {
  switch (banco) {
    case 1:
      return "Itaú";
    case 2:
      return "Nubank";
    case 3:
      return "PicPay";
    case 4:
      return "Caixa";
    case 5:
      return "XP";
    default:
      return "Aleatório";
  }
};

export const getListaCartao = (banco: number[]) => {
  return banco.map((b) => getNomeCartao(b));
};

export const getCorCartao = (banco: number) => {
  switch (banco) {
    case 1:
      return "#FF6200";
    case 2:
      return "#820ad1";
    case 3:
      return "#11C76F";
    case 4:
      return "#005CA9";
    case 5:
      return "#000";
    default:
      return "#346969";
  }
};
