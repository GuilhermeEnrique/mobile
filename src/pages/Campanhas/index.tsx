import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function Campanhas() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Suas campanhas
            </Text>

            <TouchableOpacity style={styles.buttonNewCampanha}>
                <FontAwesome name="plus-circle" size={24} style={styles.IconNewCampanha} />
                <Text style={styles.TitleNewCampanha}>Criar uma nova Campanha</Text>
            </TouchableOpacity>
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

    buttonNewCampanha: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 60,
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#255273',
        marginBottom: 25

    },
    IconNewCampanha: {
        color: '#F8FAFF'
    },
    TitleNewCampanha: {
        fontSize: 17,
        color: '#F8FAFF',
    }

})