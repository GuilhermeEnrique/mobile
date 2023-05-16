import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function Campanhas() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Perfil
            </Text>
            <View style={styles.containerCenter}>
                <Image
                    style={styles.imagemProfile}
                    source={require('../../assets/usuario.png')}
                />
                <Text style={styles.subTitle}>Olá, usuário</Text>
                <TextInput style={styles.input} placeholder='Id' editable={false} />
                <TextInput style={styles.input} placeholder='Nome' />
                <TextInput style={styles.input} placeholder='Email' />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    style={styles.inputBiografia}
                    placeholder='Biografia' />
                <TouchableOpacity style={styles.resetPassword}>
                    <Text style={{ color: 'blue', fontSize: 16 }}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonEdit}>
                    <Text style={styles.textEdit}> Editar perfil </Text>
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
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginBottom: 100
    },
    title: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    subTitle: {
        fontSize: 20,
        marginTop: 25,
        marginBottom: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    imagemProfile: {
        marginTop: 15,
        width: 160,
        height: 160,
        borderRadius: 10,
    },
    inputBiografia: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 160,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    resetPassword: {
        margin: 13,
    },
    buttonEdit: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#255273',
        borderRadius: 10,
    },
    textEdit: {
        color: '#fff'
    }

})