import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import { api } from '../../services/api';

export default function Dados() {
    const [type, setType] = useState('')
    const [quantity, setQuantity] = useState('')

    const [results, setResults] = useState([]);

    const [total, setTotal] = useState(0);

    async function handleDice() {
        if (type === '' || quantity === '') {
            alert('Selecione um dado e a quantidade!')
            return
        }

        try {
            const response = await api.post('/roll', {
                type,
                quantity
            });

            const { data } = response;
            console.log(data)
            setResults(data.results);
            setTotal(data.total);
        } catch (error) {
            console.log('Erro ao rolar dados:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dados
            </Text>
            <Image
                style={styles.image}
                source={require('../../assets/dice.png')}
            />
            <View style={styles.inputContainer}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'D4 (4 lados)', value: '4' },
                        { label: 'D6 (6 lados)', value: '6' },
                        { label: 'D8 (8 lados)', value: '8' },
                        { label: 'D12 (12 lados)', value: '12' },
                        { label: 'D20 (20 lados) ', value: '20' },
                    ]}
                    placeholder={{ label: 'Escolha um tipo de dado', value: null }}
                />
                <TextInput
                    keyboardType='numeric'
                    placeholder='A quantidade de dados'
                    style={styles.qntDados}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                />
            </View>
            <View>
                <Text>Resultados:</Text>
                {results.map((result, index) => (
                    <Text key={index}>Resultado {index + 1}: {result}</Text>
                ))}
                <Text>Total: {total}</Text>
            </View>
            <TouchableOpacity style={styles.ButtonDados} onPress={handleDice}>
                <Text style={styles.textDados}>
                    <FontAwesome5 name="dice-d20" size={24} color="#fff" />
                </Text>
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
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
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
        width: '60%',
        backgroundColor: '#255273',
        padding: 16,
        borderRadius: 10,
        marginBottom: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDados: {
        color: '#F8FAFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 100,
    }
})

