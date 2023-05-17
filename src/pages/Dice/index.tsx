import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StyleProp } from 'react-native'
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';

import { FontAwesome } from '@expo/vector-icons'

export default function Dados() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dados
            </Text>
            <View style={styles.inputContainer}>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'D4 (4 lados)', value: 'D4' },
                        { label: 'D6 (6 lados)', value: 'D6' },
                        { label: 'D8 (8 lados)', value: 'D8' },
                        { label: 'D12 (12 lados)', value: 'D12' },
                        { label: 'D20 (20 lados) ', value: 'D20' },
                    ]}
                    placeholder={{ label: 'Escolha um tipo de dado', value: null }}
                />
                <TextInput
                    keyboardType='numeric'
                    placeholder='A quantidade de dados'
                    style={styles.qntDados}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.ButtonDados}>
                    <Text style={styles.textDados}>
                        Rolar Dados
                    </Text>
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        width: '80%'
    },
    qntDados: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    ButtonDados: {
        backgroundColor: '#255273',
        padding: 16,
        borderRadius: 10,
        marginBottom: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDados: {
        color: '#F8FAFF',
        fontSize: 17,
        fontWeight: 'bold'
    }
})

