import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../src/context/AuthProvider";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.1.64:3000/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("user_email", user.email);
      await AsyncStorage.setItem("user_id", user.id);
      login(token);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro ao tentar conectar-se", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="E-mail"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@email.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Senha"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={styles.botaoAplicar}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.textoBotaoPrimario}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
                <TouchableOpacity
          style={styles.botaoAplicar}
          onPress={() => {}}
          disabled={loading}
        >
          <Text style={styles.textoBotaoPrimario}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  botaoAplicar: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#469cff94",
    alignItems: "center",
  },
  textoBotaoPrimario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
