import React from 'react'
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native'
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 30 : 64;

export default function Header(): React.JSX.Element {
    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#469cff94',
        paddingTop: statusBarHeight,
        padding: 50
    }
})