import React, { useRef, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CardGastos from "../CardGastos";
import ListaCartoes from "../ListaCartoes.tsx";
import { IMovimentacao } from "@/src/interfaces/IMovimentacao";
import { formatarData } from "@/src/shared/util/formatacao";
import Icon from "react-native-vector-icons/FontAwesome";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";

interface MovimentacoesProps {
  movimentacoes: IMovimentacao[];
}

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const agruparPorData = (movimentacoes: IMovimentacao[]) => {
  const mapa: { [key: string]: IMovimentacao[] } = {};

  movimentacoes.forEach((mov) => {
    const d = new Date(mov.dia);
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;

    if (!mapa[chave]) {
      mapa[chave] = [];
    }
    mapa[chave].push(mov);
  });

  return Object.keys(mapa)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((chave) => ({
      chave,
      exibicao: formatarData(chave),
      itens: mapa[chave],
    }));
};

const ConteudoMovimentacoes: React.FC<MovimentacoesProps> = ({
  movimentacoes,
}) => {
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const anosDisponiveis = useMemo(() => {
    const anos = movimentacoes.map((mov) => new Date(mov.dia).getFullYear());
    return [...new Set(anos)].sort((a, b) => b - a);
  }, [movimentacoes]);

  const movimentacoesFiltradas = useMemo(() => {
    return movimentacoes.filter((mov) => {
      const d = new Date(mov.dia);
      const anoMatch =
        anoSelecionado === null || d.getFullYear() === anoSelecionado;
      const mesMatch =
        mesSelecionado === null || d.getMonth() === mesSelecionado;

      return anoMatch && mesMatch;
    });
  }, [movimentacoes, mesSelecionado, anoSelecionado]);

  const grupos = agruparPorData(movimentacoesFiltradas);

  const scrollY = useRef(new Animated.Value(0)).current;
  const cartoesTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: "clamp",
  });

  const cartoesOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const obterTextoFiltro = () => {
    if (anoSelecionado === null && mesSelecionado === null) {
      return "Filtrar";
    }

    if (anoSelecionado !== null && mesSelecionado !== null) {
      return `${meses[mesSelecionado]} / ${anoSelecionado}`;
    }

    if (anoSelecionado !== null) {
      return `${anoSelecionado}`;
    }

    if (mesSelecionado !== null) {
      return `${meses[mesSelecionado]}`;
    }

    return "Filtrar";
  };

  const aplicarFiltros = () => {
    setModalVisivel(false);
  };

  const limparFiltros = () => {
    setMesSelecionado(null);
    setAnoSelecionado(null);
    setModalVisivel(false);
  };

  const conteudoMovimentacoes = () => {
    if (movimentacoes.length > 0) {
      return (
        <>
          <TouchableOpacity
            style={styles.botaoMes}
            onPress={() => setModalVisivel(true)}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Icon name="filter" size={14} color="#fff" />
              <Text style={styles.textoBotao}>{obterTextoFiltro()}</Text>
            </View>
          </TouchableOpacity>

          {grupos.map((grupo) => (
            <View key={grupo.chave} style={styles.grupoMovimentacoes}>
              <Text style={styles.data}>{grupo.exibicao}</Text>
              {grupo.itens.map((mov) => (
                <CardGastos movimentacao={mov} key={mov.id} />
              ))}
            </View>
          ))}
        </>
      );
    }

    return (
      <View style={{ alignItems: "center", marginTop: 40, padding: 16 }}>
        <Icon
          name="inbox"
          size={50}
          color="#ccc"
          style={{ marginBottom: 16 }}
        />
        <Text
          style={{
            fontSize: 18,
            color: "#999",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          Nenhuma movimentação encontrada.{"\n"}{"\n"}Clique no ícone "Adicionar movimentação" para começar a
          controlar seus gastos!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.listaCartoes,
          {
            transform: [{ translateY: cartoesTranslateY }],
            opacity: cartoesOpacity,
          },
        ]}
      >
        <ListaCartoes gastos={movimentacoesFiltradas} />
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
      >
        {conteudoMovimentacoes()}
      </Animated.ScrollView>
      <Modal
        isVisible={modalVisivel}
        style={{ flex: 1, margin: 0, justifyContent: "center" }}
      >
        <SetaVoltar
          name="arrowleft"
          size={20}
          onPress={() => setModalVisivel(false)}
          style={{ marginBottom: 30, margin: 15, color: "#FFF" }}
        />
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.tituloModal}>Filtrar por Período</Text>
            <View style={styles.secaoFiltro}>
              <Text style={styles.subtituloModal}>Ano:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollHorizontal}
                contentContainerStyle={styles.scrollHorizontalContent}
              >
                <TouchableOpacity
                  style={[
                    styles.itemHorizontal,
                    anoSelecionado === null && styles.itemSelecionado,
                  ]}
                  onPress={() => setAnoSelecionado(null)}
                >
                  <Text
                    style={[
                      styles.textoItemHorizontal,
                      anoSelecionado === null && styles.textoSelecionado,
                    ]}
                  >
                    Todos
                  </Text>
                </TouchableOpacity>

                {anosDisponiveis.map((ano) => (
                  <TouchableOpacity
                    key={ano}
                    style={[
                      styles.itemHorizontal,
                      anoSelecionado === ano && styles.itemSelecionado,
                    ]}
                    onPress={() => setAnoSelecionado(ano)}
                  >
                    <Text
                      style={[
                        styles.textoItemHorizontal,
                        anoSelecionado === ano && styles.textoSelecionado,
                      ]}
                    >
                      {ano}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.secaoFiltro}>
              <Text style={styles.subtituloModal}>Mês:</Text>
              <FlatList
                data={[
                  { nome: "Todos", index: null },
                  ...meses.map((mes, index) => ({ nome: mes, index })),
                ]}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.itemMes,
                      mesSelecionado === item.index && styles.itemSelecionado,
                    ]}
                    onPress={() => setMesSelecionado(item.index)}
                  >
                    <Text
                      style={[
                        styles.textoItemMes,
                        mesSelecionado === item.index &&
                          styles.textoSelecionado,
                      ]}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.botoesAcao}>
              <TouchableOpacity
                style={styles.botaoLimpar}
                onPress={limparFiltros}
              >
                <Text style={styles.textoBotaoSecundario}>Limpar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoAplicar}
                onPress={aplicarFiltros}
              >
                <Text style={styles.textoBotaoPrimario}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    flex: 1,
    borderRadius: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 160,
  },
  listaCartoes: {
    position: "absolute",
    top: 10,
    left: 5,
    right: 14,
    zIndex: 1,
    backgroundColor: "#eeeeee",
  },
  grupoMovimentacoes: {
    marginBottom: 20,
    marginStart: 14,
    marginEnd: 14,
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
    marginStart: 14,
  },
  botaoMes: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#469cff94",
    marginStart: 14,
    marginEnd: 20,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  modalWrapper: {
    width: "100%",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    maxHeight: "100%",
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  subtituloModal: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#666",
  },
  secaoFiltro: {
    marginBottom: 25,
  },
  scrollHorizontal: {
    maxHeight: 50,
  },
  scrollHorizontalContent: {
    paddingHorizontal: 5,
  },
  itemHorizontal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    minWidth: 70,
    alignItems: "center",
  },
  textoItemHorizontal: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  itemMes: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    minHeight: 45,
    justifyContent: "center",
  },
  textoItemMes: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
  },
  itemSelecionado: {
    backgroundColor: "#469cff94",
  },
  textoSelecionado: {
    color: "#fff",
    fontWeight: "bold",
  },
  botoesAcao: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 15,
  },
  botaoAplicar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#469cff94",
    alignItems: "center",
  },
  botaoLimpar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  textoBotaoPrimario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  textoBotaoSecundario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});

export default ConteudoMovimentacoes;
