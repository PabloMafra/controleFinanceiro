import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ColorPickerWheel from "react-native-wheel-color-picker";

interface ColorPickerModalProps {
  initialColor: string;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  initialColor,
  onClose,
  onSelectColor,
}) => {
  const [color, setColor] = useState(initialColor);

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <ColorPickerWheel
          color={color}
          onColorChange={(c) => {
            setColor(c);
          }}
          swatches={false}
          sliderSize={60}
        />
      </View>

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao]}
          onPress={() => {
            onSelectColor(color);
            onClose();
          }}
        >
          <Text>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    marginBottom: 50, // aumenta a distância do fundo
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  botao: {
    flex: 1,
    padding: 10,
    backgroundColor: "#888",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
});

export default ColorPickerModal;
