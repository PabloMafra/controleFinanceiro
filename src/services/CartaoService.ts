import CartaoRepository from "../repository/CartaoRepository";

export interface Cartao {
  id: number;
  banco: number;
  ultimosNumeros?: string;
  bandeira: string;
  cor: string;
}

class CartaoService {
  async obterCartoes() {
    return await CartaoRepository.obterCartoes();
  }

  async criarCartao(cartao: Cartao) {
    await CartaoRepository.criarCartao(cartao);
  }
}

export default new CartaoService();
