import React, { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { StackParmsList } from "../../routers/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { signOut } = useContext(AuthContext);

    async function Campanhas() {
        navigation.navigate('Campanhas');
    }

    async function Personagens() {
        navigation.navigate('CreatePersonagem');
    }

    async function Dados() {
        navigation.navigate('Dice');
    }
    async function Profile() {
        navigation.navigate('Profile');
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.buttonProfile} onPress={Profile}>
                <Image
                    style={styles.imagem}
                    source={require('../../assets/usuario.png')}
                />
                <View style={styles.containerProfile} >
                    <Text style={styles.text}>Olá, usuario</Text>
                    <FontAwesome name="edit" size={24} style={styles.icon} />
                    <Text style={styles.textEdit}>Editar Perfil</Text>
                </View>
            </TouchableOpacity>
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
            <TouchableOpacity
                style={styles.button}
                onPress={signOut}>
                <FontAwesome name="sign-out" size={20} color='#F8FAFF' />
                <Text style={styles.textSignOut}>Sair da conta</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
    },
    //Botão de saída
    button: {
        backgroundColor: '#000',
        marginBottom: 30,
        height: 50,
        borderRadius: 20,
        padding: 15,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textSignOut: {
        color: '#F8FAFF',
        fontSize: 15,
        marginLeft: 10
    },

    //Butão de perfil
    containerProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
    },
    text: {
        color: '#F8FAFF',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    imagem: {
        width: '50%',
        height: 160,
        borderRadius: 20,
        alignItems: 'center'
    },
    buttonProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 10,
        height: 180,
        width: '80%',
        borderRadius: 20,
        borderColor: 'dark',
        backgroundColor: '#EDE8E8',
        borderWidth: 1,

        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    icon: {
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 100,
        marginTop: 10
    },
    textEdit: {
        fontSize: 12,
        marginTop: 5,
        color: '#F8FAFF',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },

    //Botões da pagina
    imagemButtons: {
        width: '100%',
        height: 190,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',

    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 1900,
        width: '80%',
        borderRadius: 20,
        marginBottom: 15,

        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    textButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    }

})