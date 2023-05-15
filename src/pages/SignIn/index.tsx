import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function Home() {
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        if (email === '' || password === '') {
            return;
        }

        await signIn({ email, password });
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/Logo.png')}
            />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subTitle}>Digite seu endereço de e-mail e senha para acessar sua conta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.resetPassword}>
                    <Text style={{ color: 'blue' }}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color='#fff' />
                    ) : (
                        <Text style={styles.textButton}>Acessar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.register} >
                    <Text style={{ color: '#000' }}>Não possui uma conta?</Text><Text style={styles.textRegister}> Registre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        marginTop: 100,
        width: 100,
        height: 100
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 40,
        marginRight: 40
    },
    input: {
        backgroundColor: '#EDE8E8',
        marginBottom: 5,
        height: 50,
        padding: 16,
        borderRadius: 10
    },
    inputContainer: {
        marginBottom: 300,
    }, resetPassword: {
        marginTop: 13,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        opacity: 0.9,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: '#F8FAFF',
        fontSize: 17,
        fontWeight: '600'
    },
    register: {
        flexDirection: 'row',
        marginTop: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRegister: {
        color: 'blue'
    }
})