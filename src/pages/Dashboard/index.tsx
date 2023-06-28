import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Modal, Linking } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StackParmsList } from "../../routers/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from '../../services/api';

type BookType = 'Instagram' | 'GitHub';

export default function Dashboard() {
    const [profileImage, setProfileImage] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { user, signOut, updateUser } = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [modalView, setModalView] = useState(false);

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

    function redes(bookType: BookType) {
        let pdfUrl = '';

        switch (bookType) {
            case 'Instagram':
                pdfUrl = 'https://instagram.com/guierme16';
                break;
            case 'GitHub':
                pdfUrl = 'https://github.com/GuilhermeEnrique';
            default:
                break;
        }

        Linking.openURL(pdfUrl);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                        Bem-vindo, {user.name}
                    </Text>
                    <View style={styles.buttonProfile}>
                        <Image
                            style={styles.imagem}
                            source={profileImage ? { uri: profileImage } : require('../../assets/usuario.png')}
                        />
                        <View style={styles.buttonsProfile}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Profile')}
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
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Campanhas')}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/mapa.png')}
                        />
                        <Text style={styles.textButtons}>Campanhas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Personagens')}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/personagem.png')}
                        />
                        <Text style={styles.textButtons}>Personagens</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Dice')}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/dados.png')}
                        />
                        <Text style={styles.textButtons}>Dados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Guia')}>
                        <Image
                            style={styles.imagemButtons}
                            source={require('../../assets/guia.png')}
                        />
                        <Text style={styles.textButtons}>Guias para usuários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalView(true)}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/Logo.png')} />
                        <View style={styles.copyright}>
                            <FontAwesome name="copyright" size={20} color="black" />
                            <Text style={styles.textCopyright}>Dice-roll 2023</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal visible={modalView} animationType="fade" transparent={modalView}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sobre nós</Text>
                        <Text style={styles.modalTitle}>Sistema Dice Roll</Text>
                        <Text style={styles.modalConteudo}>O sistema Dice-Roll é um projeto de gerenciamento de mesas de RPG (Role-Playing Game) desenvolvido especialmente para jogadores de Dungeons & Dragons. Esse sistema permite aos jogadores gerenciar e organizar suas partidas de RPG de maneira fácil e intuitiva. </Text>
                        <Text style={styles.modalTitle}>Desenvolvido por</Text>
                        <Text style={styles.modalAutor}>Guilherme Enrique</Text>
                        <View style={styles.icons}>
                            <TouchableOpacity style={styles.iconSocial} onPress={() => redes('Instagram')}>
                                <FontAwesome name="instagram" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconSocial} onPress={() => redes('GitHub')}>
                                <FontAwesome name="github" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setModalView(false)} style={styles.buttonCancelar}>
                            <Text style={styles.textButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
    },
    text: {
        textAlign: 'center',
        color: '#F8FAFF',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        marginVertical: 10
    },
    //Botão de perfil
    buttonProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
        height: 200,
        width: '90%',

        borderRadius: 10,
        borderColor: '#000',
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
    imagem: {
        width: '70%',
        height: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    icon: {
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 8,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textEdit: {
        fontSize: 14,
        marginTop: 5,
        color: '#000',
    },
    buttonsProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    EditProfile: {
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //Botões da pagina
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 200,
        width: '90%',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        elevation: 10,
    },
    imagemButtons: {
        width: '99%',
        height: 199,
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
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
    },
    logo: {
        width: 150,
        height: 150,
    },
    copyright: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textCopyright: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    modalAutor: {
        fontSize: 18,
        textAlign: 'center',
    },
    modalConteudo: {
        textAlign: 'justify',
        fontSize: 17,
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    iconSocial: {
        padding: 10,
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    },
})