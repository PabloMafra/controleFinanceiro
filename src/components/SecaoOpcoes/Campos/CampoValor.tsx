import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface CampoValorProps {
  valor: string;
  onChangeValor: (valor: string) => void;
  hasError: boolean;
}

export const CampoValor: React.FC<CampoValorProps> = ({
  valor,
  onChangeValor,
  hasError,
}) => {
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => onChangeValor(formatarValor(text))}
        value={`R$ ${formatarValor(valor)}`}
      />
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
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 18,
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