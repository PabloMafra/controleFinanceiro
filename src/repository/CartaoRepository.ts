import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class CartaoRepository {
  async obterCartoes() {
    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    const response = await axios.get("http://192.168.1.64:3000/card", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, 'responsee***')
    return response.data;
  }

  async criarCartao(cartao: any) {
    const token = await AsyncStorage.getItem("access_token");

    if (!token) throw new Error("Usuário não autenticado");

    try {
      await axios.post(
        "http://192.168.1.64:3000/card",
        cartao,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erro ao criar cartão:", error);
      throw new Error("Erro ao criar cartão");
    }
  }
}

export default new CartaoRepository();
