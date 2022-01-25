import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Button({ onPress, style, title }) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.textBuscar}>{title}</Text>
        </TouchableOpacity>   
    )
}

const styles = StyleSheet.create({
    textBuscar: {
        fontSize: 20,
        color: '#fff'
    }
})
