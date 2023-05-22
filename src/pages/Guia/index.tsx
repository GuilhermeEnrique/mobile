import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';

export default function Campanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    async function Campanhas() {
        navigation.navigate('CreateCampanhas');
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Guia de usuário</Text>
            </View>

            <TouchableOpacity style={styles.buttons}>
                <Image
                    style={styles.imagemButtons}
                    source={require('../../assets/livroJogador.jpg')}
                />
                <Text style={styles.textButtons}>Livro do jogador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Image
                    style={styles.imagemButtons}
                    source={require('../../assets/manualMonstros.jpg')}
                />
                <Text style={styles.textButtons}>Manual dos monstros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Image
                    style={styles.imagemButtons}
                    source={require('../../assets/guiaMestre.jpg')}
                />
                <Text style={styles.textButtons}>Guia do mestre</Text>
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
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    titleText: {
        marginRight: 15,
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    }, buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 190,
        width: '80%',
        borderRadius: 20,
        marginBottom: 15,
    },
    textButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    imagemButtons: {
        width: '100%',
        height: 190,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
})