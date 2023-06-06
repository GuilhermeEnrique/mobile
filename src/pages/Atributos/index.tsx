import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

export default function Atributos() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Atributos</Text>
            </View>
            <Image
                source={require('../../assets/')}
                style={styles.image}
            />
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Força</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Destreza</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Sabedoria</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Inteligência</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="bl   ack" />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Carisma</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Constituição</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text>Valor</Text>
                <TouchableOpacity>
                    <FontAwesome name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonEdit} >
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancelar}>
                    <Text style={styles.textButton}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F8FAFF'
    },
    title: {
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '40%',
        height: '20%',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '90%',
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    titleTextInput: {
        flexBasis: '70%', // Defina o valor desejado para a largura do título
        textAlign: 'left',
        fontSize: 16,
        color: '#000',
    },
    buttons: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonEdit: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#255273',
        borderRadius: 10,
        marginBottom: 10,
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        width: '100%',
        borderRadius: 10,
    },
})