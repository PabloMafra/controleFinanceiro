import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { descricaoMovimentacao } from "@/src/shared/enum/descricaoMovimentacao";

interface CampoCategoriaProps {
  selectedOption: number;
  onChangeOption: (option: number) => void;
  hasError: boolean;
}

export const CampoCategoria: React.FC<CampoCategoriaProps> = ({
  selectedOption,
  onChangeOption,
  hasError,
}) => {
const options = [
    { label: "Categoria", value: descricaoMovimentacao.CATEGORIA, enabled: false },
    { label: "Transporte", value: descricaoMovimentacao.TRANSPORTE, enabled: true },
    { label: "Alimento", value: descricaoMovimentacao.ALIMENTO, enabled: true },
    { label: "Presente", value: descricaoMovimentacao.PRESENTE, enabled: true },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={onChangeOption}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} enabled={option.enabled}/>
          ))}
        </Picker>
      </View>
      <View style={styles.helpTextContainer}>
        <Text style={[styles.helpText, { opacity: hasError ? 1 : 0 }]}>
          Campo obrigatório*
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    width: "100%",
  },
  helpTextContainer: {
    width: "100%",
    height: 20,
    marginTop: -5,
  },
  helpText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});