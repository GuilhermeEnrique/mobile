import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParmsList } from '../../routers/app.routes';

export default function Personagens() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    async function CreatePersonagem() {
        navigation.navigate('CreatePersonagem');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Seus personagens
            </Text>
            <View style={styles.personagens}>
                <Text style={styles.emptyList}>Nenhuma personagem foi encontrada...</Text>
            </View>
            <TouchableOpacity style={styles.buttonNewCampanha} onPress={CreatePersonagem}>
                <FontAwesome name="plus-circle" size={24} style={styles.IconNewCampanha} />
                <Text style={styles.TitleNewCampanha}>Criar um novo personagem</Text>
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
    },
    personagens: {

    },
    emptyList: {

    },

})