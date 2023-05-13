import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')

    function handleRegister() {
        alert("Registrado")
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/Logo.png')}
            />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Inscreva-se</Text>
                <Text style={styles.subTitle}>Preencha as informações para criar uma conta e inscreva-se para continuar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={user}
                    onChangeText={(text) => setUser(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <View style={styles.inputPassword}>
                    <TextInput
                        style={styles.password}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.buttoEye} >
                        <FontAwesome name="eye" size={24} color="#000" opacity={0.7} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.register} >
                    <Text style={{ color: '#000', fontSize: 17 }}>Já possui uma conta?</Text><Text style={styles.textRegister}> Entrar</Text>
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
        width: 120,
        height: 120,
        marginBottom: 50
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 40,
        marginRight: 40
    },
    inputPassword: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDE8E8',
        borderRadius: 10,
        height: 50,
    },
    buttoEye: {
        margin: 13,
    }, 
    password: {
        padding: 16,
        width: '80%'
    },
    input: {
        backgroundColor: '#EDE8E8',
        height: 50,
        padding: 16,
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 10
    },
    inputContainer: {
        marginBottom: 300,
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRegister: {
        color: 'blue',
        fontSize: 17
    }
})