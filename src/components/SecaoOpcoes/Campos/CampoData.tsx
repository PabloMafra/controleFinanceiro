import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import IconeCalendario from "react-native-vector-icons/Feather";

interface CampoDataProps {
  date: Date;
  onChangeDate: (date: Date) => void;
}

export const CampoData: React.FC<CampoDataProps> = ({
  date,
  onChangeDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={styles.pressableContainer}
      >
        <TextInput
          style={styles.input}
          placeholder={moment(date).format("DD/MM/YYYY")}
          readOnly
        />
        <IconeCalendario
          name="calendar"
          size={20}
          color="#a3a3a3"
          style={styles.icon}
        />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              onChangeDate(selectedDate);
            }
          }}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pressableContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: -10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 18,
  },
  icon: {
    position: "absolute",
    right: "5%",
    top: "48%",
  },
  datePicker: {
    borderRadius: 10,
    marginBottom: 10,
  },
});