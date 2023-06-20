import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { api } from '../../services/api';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParmsList } from '../../routers/app.routes';

export default function ResetPasswordScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async () => {
        const data = {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
        }
        try {
            await api.put('/reset-password', data);
            Alert.alert('Senha atualizada com sucesso.');
            setNewPassword('');
            setOldPassword('');
            setEmail('');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao atualizar sua senha!');
            console.log(error);
        }
    };

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('./cadeado.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Alterar sua senha</Text>
            <View style={styles.form}>


                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Antiga senha"
                    secureTextEntry={!showPassword}
                />

                <TextInput
                    style={styles.input}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder="Sua nova senha"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.buttonEye} onPress={toggleShowPassword}>
                    <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#fff" />
                    {!showPassword && (
                        <Text style={styles.textButton}>Visualizar senhas</Text>
                    )}
                    {showPassword && (
                        <Text style={styles.textButton}>Ocultar senhas</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleResetPassword} style={styles.buttonSalvar}>
                    <Text style={styles.textButton}>Redefinir senha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    },
    image: {
        marginTop: 20,
        width: 180,
        height: 180,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '90%',
        height: 60,
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#28AC92',
        marginBottom: 10,
    },
    buttonEye: {
        justifyContent: 'center',
        backgroundColor: '#598381',
        marginLeft: 5,
        alignItems: 'center',
        width: '90%',
        height: 60,
        padding: 14,
        borderRadius: 10,
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonSalvar: {
        backgroundColor: '#598381',
        width: '90%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        width: '90%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    }
})

