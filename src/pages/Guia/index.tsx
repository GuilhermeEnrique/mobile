import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';

type BookType = 'livroJogador' | 'manualMonstros' | 'guiaMestre';

export default function Guia() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    function handleDownloadPDF(bookType: BookType) {
        let pdfUrl = '';

        switch (bookType) {
            case 'livroJogador':
                pdfUrl = 'https://github.com/bibliotecaelfica/bibliotecaelfica.github.io/files/3611502/D.D.5E.-.Livro.do.Jogador.Fundo.Colorido.pdf';
                break;
            case 'manualMonstros':
                pdfUrl = 'https://github.com/bibliotecaelfica/bibliotecaelfica.github.io/files/3611503/D.D.5E.-.Manual.dos.Monstros.pdf';
                break;
            case 'guiaMestre':
                pdfUrl = 'https://github.com/bibliotecaelfica/bibliotecaelfica.github.io/files/3611504/D.D.5E.-.Guia.do.Mestre.pdf';
                break;
            default:
                break;
        }

        Linking.openURL(pdfUrl);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Guia de usuário</Text>
                </View>
                    <View style={styles.linha} />
                <View>
                    <Text style={styles.subTitleText}>Aqui você pode baixar os guias que vão te auxiliar no seu jogo de D&D 5E, incluindo as versões mais recentes dos livros-guia.</Text>
                </View>

                <View>
                    <Image
                        style={styles.imagemButtons}
                        source={require('../../assets/livroJogador.jpg')}
                    />
                    <TouchableOpacity style={styles.buttons} onPress={() => handleDownloadPDF('livroJogador')}>
                        <FontAwesome name="download" size={24} color="blue" />
                        <Text style={styles.textButtons}>Baixar Livro do jogador</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Image
                        style={styles.imagemButtons}
                        source={require('../../assets/manualMonstros.jpg')}
                    />
                    <TouchableOpacity style={styles.buttons} onPress={() => handleDownloadPDF('manualMonstros')}>
                        <FontAwesome name="download" size={24} color="blue" />
                        <Text style={styles.textButtons}>Baixar Manual dos monstros</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        style={styles.imagemButtons}
                        source={require('../../assets/guiaMestre.jpg')}
                    />
                    <TouchableOpacity style={styles.buttons} onPress={() => handleDownloadPDF('guiaMestre')}>
                        <FontAwesome name="download" size={24} color="blue" />
                        <Text style={styles.textButtons}>Baixar Guia do mestre</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFF'
    },
    title: {
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10
    },
    titleText: {
        marginRight: 15,
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    linha: {
        borderBottomColor: '#28AC92',
        borderBottomWidth: 1,
        width: '90%'
    },
    subTitleText: {
        marginHorizontal: 10,
        fontSize: 18,
        marginTop: 5,
        fontWeight: '500',
        color: '#000',
        textAlign: 'justify',
        alignItems: 'center',
    },
    buttons: {
        margin: 10,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textButtons: {
        color: 'blue',
        marginLeft: 10,
    },
    imagemButtons: {
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#28AC92',
        margin: 10,
        alignSelf: 'center',
    },
})