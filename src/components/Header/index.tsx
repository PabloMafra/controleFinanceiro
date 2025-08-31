import { useAuth } from '@/src/context/AuthProvider';
import React from 'react';
import { View, StyleSheet, StatusBar, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({teste}: {teste: () => void}): React.JSX.Element {
  const { logout } = useAuth();

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#469cff94"
        barStyle="light-content"
      />
      <View style={styles.container} >
        <TouchableOpacity onPress={logout} style={styles.iconButton}>
          <Icon name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={teste} style={styles.iconButton}>
          <Icon name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#469cff94',
    paddingTop: Platform.OS === 'android' ? 0 : 44,
    height: 100,
    paddingHorizontal: 14,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignContent: 'center'
  },
  iconButton: {
    marginBottom: 20,
  },
});
