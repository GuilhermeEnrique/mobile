import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function Campanhas() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dados
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF'
    },
    title: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    },

})