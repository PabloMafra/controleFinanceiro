import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getCorCartao, getNomeCartao } from "@/src/shared/util/funcoes";
import ColorPickerModal from "./ColorPicker";
import Modal from "react-native-modal";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import { Cartao } from "@/src/services/CartaoService";

interface CartaoModalProps {
  onClose: () => void;
  onSubmit: (data: Cartao) => void;
}

const CartaoModal: React.FC<CartaoModalProps> = ({ onClose, onSubmit }) => {
  const [banco, setBanco] = useState<number>(1);
  const [bandeira, setBandeira] = useState<string>("visa");
  const [ultimosNumeros, setUltimosNumeros] = useState<string>("");

  const [abrirPickerCor, setAbrirPickerCor] = useState(false);
  const [corCartao, setCorCartao] = useState<string>(getCorCartao(banco)); // cor inicial

    useEffect(() => {
      setCorCartao(getCorCartao(banco));
    }, [banco]);

  const handleSalvar = () => {
    if (ultimosNumeros.length !== 4) {
      Alert.alert("Erro", "Os últimos números devem ter 4 dígitos");
      return;
    }

    onSubmit({
      id: 0,
      banco,
      bandeira,
      ultimosNumeros,
      cor: corCartao,
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Cartão</Text>

      {/* Select Banco */}
      <Text style={styles.label}>Banco</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={banco} onValueChange={(val) => setBanco(val)}>
          {[1, 2, 3, 4, 5].map((id) => (
            <Picker.Item key={id} label={getNomeCartao(id)} value={id} />
          ))}
        </Picker>
      </View>

      {/* Select Bandeira */}
      <Text style={styles.label}>Bandeira</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bandeira}
          onValueChange={(val) => setBandeira(val)}
        >
          <Picker.Item label="Visa" value="visa" />
          <Picker.Item label="Mastercard" value="mastercard" />
        </Picker>
      </View>

      {/* Accordion para escolher cor */}
      <TouchableOpacity
        style={[styles.botaoAccordion, { backgroundColor: corCartao}]}
        onPress={() => setAbrirPickerCor(true)}
      >
        <Text style={{ color: "#ffffff0" }}>Escolher Cor do Cartão</Text>
      </TouchableOpacity>

      {/* Últimos números */}
      <Text style={styles.label}>Últimos 4 números</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        value={ultimosNumeros}
        onChangeText={(text) => setUltimosNumeros(text.replace(/[^0-9]/g, ""))}
      />

      {/* Botões */}
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={abrirPickerCor}
        onBackdropPress={() => setAbrirPickerCor(false)}
        style={{ margin: 0, justifyContent: "center" }}
      >
        <SetaVoltar
          name="arrowleft"
          size={20}
          onPress={() => setAbrirPickerCor(false)}
          style={{ margin: 15, color: "#FFF" }}
        />
        <ColorPickerModal
          initialColor={corCartao}
          onSelectColor={(color) => setCorCartao(color)}
          onClose={() => setAbrirPickerCor(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: "50%",
  },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  botao: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  botaoAccordion: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default CartaoModal;
