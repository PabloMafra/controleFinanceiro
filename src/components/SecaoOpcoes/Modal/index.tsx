import React, { useRef } from "react";
import { View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import SetaVoltar from "react-native-vector-icons/AntDesign";
import { FormularioMovimentacaoScreen } from "../Formularios/FormularioMovimentacaoScreen";
import { useMovimentacao } from "../CustomHook/useMovimentacao";
import { MovimentacaoData } from "../types";
import { TipoSelecaoScreen } from "../TipoMovimentacao";

interface MovimentacaoModalProps {
  userId: string | null;
  onClose: () => void;
  onSubmit: () => void;
}

export const MovimentacaoModal: React.FC<MovimentacaoModalProps> = ({
  userId,
  onClose,
  onSubmit,
}) => {
  const sliderRef = useRef<any>(null);
  const {
    tipoMovimentacao,
    formData,
    errors,
    setTipoMovimentacao,
    updateFormData,
    validateAndSubmit,
    resetForm,
  } = useMovimentacao(userId, onSubmit);

  const goToNextSlide = () => {
    sliderRef.current?.goToSlide(1, true);
  };

  const handleSubmit = async () => {
    await validateAndSubmit();
  };

  const slides = [
    <TipoSelecaoScreen
      key="tipo-selecao"
      onSelectTipo={(tipo) => {
        setTipoMovimentacao(tipo);
        goToNextSlide();
      }}
    />,
    <FormularioMovimentacaoScreen
      key="formulario"
      tipoMovimentacao={tipoMovimentacao}
      formData={formData}
      errors={errors}
      onUpdateData={updateFormData}
    />,
  ];

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={({ item }) => (
        <View style={{ flex: 1, alignItems: "center" }}>{item}</View>
      )}
      data={slides}
      activeDotStyle={{
        backgroundColor: "#469cff94",
        width: 30,
        marginTop: "12%",
      }}
      dotStyle={{ backgroundColor: "#c7c7c7", marginTop: "12%" }}
      renderDoneButton={() => (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: 33, marginRight: 10 }}>Registrar</Text>
          <SetaVoltar name="arrowright" style={{ marginTop: 33 }} size={20} />
        </View>
      )}
      onDone={handleSubmit}
    />
  );
};
