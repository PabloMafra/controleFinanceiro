import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMovimentacao } from "../interfaces/IMovimentacao";
import axios from 'axios';

class MovimentacoesRepository {
  async buscarMovimentacoes() {
    const token = await AsyncStorage.getItem('access_token');

    const response = await axios.get('http://192.168.1.64:3000/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    const gastos: IMovimentacao[] = response.data;
    return gastos;
  }

  async salvarMovimentacao(movimentacao: any) {
    const token = await AsyncStorage.getItem('access_token');

    try {
      const response = await axios.post('http://192.168.1.64:3000/transactions', movimentacao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
    }
  }
}

export default new MovimentacoesRepository();
