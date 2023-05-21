import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
                <Text style={styles.titleText}>Suas campanhas</Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                >
                </TouchableOpacity>
            </View>
            <View style={styles.campanhas}>
                <Text style={styles.emptyList}>Nenhuma campanha foi encontrada...</Text>
            </View>
            <TouchableOpacity style={styles.buttonNewCampanha} onPress={Campanhas}>
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
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    refreshButton: {
        marginLeft: 16,
        marginTop: 7,
    },
    campanhas: {

    },
    emptyList: {
        fontSize: 20,
        textAlign: 'center'
    },
    listCampanhas: {

    },
    selectCampanha: {

    },
    refreshButtonText: {

    },
    titleText: {
        marginRight: 15,
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
        marginBottom: 25,
    },
    IconNewCampanha: {
        color: '#F8FAFF'
    },
    TitleNewCampanha: {
        fontSize: 17,
        color: '#F8FAFF',
    }

})