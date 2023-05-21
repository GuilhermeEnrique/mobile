import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import { api } from '../../services/api';

export default function Dados() {
    const [type, setType] = useState('')
    const [quantity, setQuantity] = useState('')

    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);

    const [history, setHistory] = useState([]);

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
            setResults(data.result);
            setTotal(data.sum);

            // Limpa os campos de quantidade e tipo
            setType('');
            setQuantity('');
        } catch (error) {
            console.log('Erro ao rolar dados:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dados
            </Text>
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/dice.png')}
                />

                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'D4 (4 lados)', value: '4' },
                        { label: 'D6 (6 lados)', value: '6' },
                        { label: 'D8 (8 lados)', value: '8' },
                        { label: 'D12 (12 lados)', value: '12' },
                        { label: 'D12 (12 lados)', value: '12' },
                        { label: 'D20 (20 lados) ', value: '20' },
                        { label: 'D100 (100 lados) ', value: '100' },
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
                <ScrollView style={styles.scrollView}>
                    {results.length > 0 ? (
                        <View style={styles.ResultadosDados}>
                            {results.map((result, index) => (
                                <Text key={index}>Dado de número {index + 1} = {result}</Text>
                            ))}
                            <Text>Soma dos resultados: {total}</Text>
                        </View>
                    ) : null}
                </ScrollView>
                <TouchableOpacity style={styles.ButtonDados} onPress={handleDice}>
                    <Text style={styles.textDados}>
                        <View style={styles.buttonContent}>
                            <FontAwesome5 name="dice-d20" size={24} color="#F8FAFF" />
                            <Text style={styles.icon}>Rolar</Text>
                        </View>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonDados}>
                    <Text style={styles.textDados}>
                        <View style={styles.buttonContent}>
                            <FontAwesome5 name="history" size={24} color="#F8FAFF" />
                            <Text style={styles.icon}>Histórico</Text>
                        </View>
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
        width: '100%',
        backgroundColor: '#255273',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDados: {
        color: '#F8FAFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
    icon: {
        color: '#F8FAFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 20,
    },
    scrollView: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        minHeight: 120,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#646262',
        backgroundColor: '#EDE8E8',
    },
    ResultadosDados: {
        flexDirection: 'column',
        padding: 13,
        width: '100%',
    },

})

