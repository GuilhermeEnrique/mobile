import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from "../../routers/auth.routes";
import { AuthContext } from "../../contexts/AuthContext";

export default function SingUp() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const { signUp, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setUser] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    async function handleSignUp() {
        if (email === '' || password === '' || name === '') {
            Alert.alert('Alerta', 'Preencha todos os campons para criar uma conta')
            return;
        }

        await signUp({ email, password, name });

        setEmail('');
        setPassword('');
        setUser('');
        SignIn()
    }

    async function SignIn() {
        navigation.navigate('SignIn')
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/Logo.png')}
            />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Inscreva-se</Text>
                <Text style={styles.subTitle}>Preencha as informações para criar uma conta e registrar-se para continuar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={name}
                    onChangeText={(text) => setUser(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.inputPassword}>
                    <TextInput
                        style={styles.password}
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.buttonEye} onPress={toggleShowPassword}>
                        <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#fff" />
                    ) : (
                        <Text style={styles.textButton}>Registrar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.register} onPress={SignIn} >
                    <Text style={{ color: '#000', fontSize: 17 }}>Já possui uma conta?</Text>
                    <Text style={styles.textRegister}> Entrar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.copyright}>
                <FontAwesome name="copyright" size={20} color="black" />
                <Text style={styles.textCopyright}>Dice-roll 2023</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    password: {
        flex: 1,
        backgroundColor: '#EDE8E8',
        height: 50,
        padding: 16,
        borderRadius: 10
    },
    buttonEye: {
        justifyContent: 'center',
        backgroundColor: '#EDE8E8',
        marginLeft: 5,
        height: 50,
        padding: 14,
        borderRadius: 10
    },
    input: {
        backgroundColor: '#EDE8E8',
        height: 50,
        padding: 16,
        borderRadius: 10,
        marginBottom: 5
    },
    inputContainer: {
        marginBottom: 50,
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
    },
    copyright: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textCopyright: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 5
    }
});