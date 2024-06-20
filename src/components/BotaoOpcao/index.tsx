import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import IconeAdicionarCartao from "react-native-vector-icons/MaterialCommunityIcons";
import IconeAdicionarGasto from "react-native-vector-icons/MaterialIcons";
import AppIntroSlider from "react-native-app-intro-slider";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const BotaoOpcao: React.FC = () => {
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [abrirDatePicker, setAbrirDatePicker] = useState<boolean>(false);
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [valor, setValor] = useState<string>("0");
  const [date, setDate] = useState<Date>(new Date());

  const options1 = ["Opção 1-1", "Opção 1-2", "Opção 1-3"];
  const options2 = ["Opção 2-1", "Opção 2-2", "Opção 2-3"];

  const renderSlides = ({ item }: any) => {
    return <View style={styles.slide}>{item}</View>;
  };

  const formatarValor = (text: string) => {
    let cleaned = text.replace(/[^\d,]/g, "");

    cleaned = cleaned.replace(/^0+(?=\d)/, "");

    cleaned = cleaned.replace(/,/g, "");

    if (cleaned === "") {
      return "0,00";
    } else if (cleaned.length === 1) {
      return `0,0${cleaned}`;
    } else if (cleaned.length === 2) {
      return `0,${cleaned}`;
    } else {
      let part1 = cleaned.slice(0, cleaned.length - 2);
      let part2 = cleaned.slice(cleaned.length - 2);
      return `${part1},${part2}`;
    }
  };

  const slides = [
    <View key="1" style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setValor(formatarValor(text))}
        value={`R$ ${formatarValor(valor)}`}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption1}
          onValueChange={(itemValue) => setSelectedOption1(itemValue)}
          style={styles.picker}
        >
          {options1.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption2}
          onValueChange={(itemValue) => setSelectedOption2(itemValue)}
          style={styles.picker}
        >
          {options2.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
      <Pressable
        onPress={() => setAbrirDatePicker(true)}
        style={{ width: "100%" }}
      >
        <TextInput
          style={styles.input}
          placeholder={moment(date).format("DD/MM/YYYY")}
          readOnly
        />
      </Pressable>
      {abrirDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setAbrirDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          style={styles.datePicker}
        />
      )}
    </View>,
  ];

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
  container: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
  },
});

export default BotaoOpcao;
