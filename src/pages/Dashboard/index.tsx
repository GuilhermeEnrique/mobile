import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StackParmsList } from "../../routers/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from '../../services/api';

export default function Dashboard() {
    const [profileImage, setProfileImage] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { user, signOut, updateUser } = useContext(AuthContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchProfileImage();
        if (isFocused) {
            updateUserFromProfile();
        }
    }, [isFocused]);

    async function fetchProfileImage() {
        try {
            const response = await api.get('/profile/image');
            const imageFileName = response.data.imageFileName;
            const imageURL = `${api.defaults.baseURL}/uploads/profile/${imageFileName}`;
            setProfileImage(imageURL);
        } catch (error) {
            console.log(error);
        }
    };

    async function updateUserFromProfile() {
        try {
            const response = await api.get('/about');
            const updatedUser = response.data;
            updateUser(updatedUser);
        } catch (error) {
            console.log(error);
        }
    }

    async function Campanhas() {
        navigation.navigate('Campanhas');
    }

    async function Personagens() {
        navigation.navigate('Personagens');
    }

    async function Dados() {
        navigation.navigate('Dice');
    }

    async function Profile() {
        navigation.navigate('Profile');
    }

    async function Guia() {
        navigation.navigate('Guia');
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.buttonProfile}>
                        <Text style={[styles.text, { textTransform: 'capitalize' }]}>Olá, {user.name}</Text>
                        <View style={styles.containerProfile}>
                            <Image
                                style={styles.imagem}
                                source={profileImage ? { uri: profileImage } : require('../../assets/usuario.png')}
                            />
                            <View style={styles.buttonsProfile}>
                                <TouchableOpacity
                                    onPress={Profile}
                                    style={styles.EditProfile}
                                >
                                    <FontAwesome name="edit" size={24} style={styles.icon} />
                                    <Text style={styles.textEdit}>Editar Perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.EditProfile}
                                    onPress={signOut}
                                >
                                    <FontAwesome name="sign-out" size={24} style={styles.icon} />
                                    <Text style={styles.textEdit}>Sair da conta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={Campanhas}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/mapa.png')}
                        />
                        <Text style={styles.textButtons}>Campanha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={Personagens}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/personagem.png')}
                        />
                        <Text style={styles.textButtons}>Ficha de personagem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={Dados}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/dados.png')}
                        />
                        <Text style={styles.textButtons}>Dados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={Guia}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/guia.png')}
                        />
                        <Text style={styles.textButtons}>Guia de usuário</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
    },
    //Botão de perfil
    containerProfile: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    text: {
        color: '#F8FAFF',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        margin: 10
    },
    imagem: {
        width: '70%',
        height: 160,
        borderRadius: 10,
        marginBottom: 10
    },
    buttonProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
        height: 210,
        width: '90%',

        borderRadius: 10,
        borderColor: 'dark',
        backgroundColor: '#EDE8E8',
        borderWidth: 1,

        shadowColor: '#000',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        elevation: 5,
    },
    icon: {
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textEdit: {
        fontSize: 12,
        marginTop: 5,
        color: '#F8FAFF',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    buttonsProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 25,
        marginBottom: 25,
    },
    EditProfile: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //Botões da pagina
    imagemButtons: {
        width: '100%',
        height: 155,
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 155,
        width: '90%',
        borderRadius: 20,
        marginBottom: 10,
    },
    textButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    }
})