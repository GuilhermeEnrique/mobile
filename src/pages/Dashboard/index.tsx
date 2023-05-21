import React, { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { StackParmsList } from "../../routers/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { user, signOut } = useContext(AuthContext);

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
        // {id: '213', name: 'Dice', email: 'dice@gmail.com'}
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonProfile}>
                <Image
                    style={styles.imagem}
                    source={require('../../assets/usuario.png')}
                />
                <View style={styles.containerProfile} >
                    <Text style={styles.text}>Olá, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Text>
                    <View style={styles.buttonsProfile}>
                        <TouchableOpacity
                            onPress={Profile}
                            style={styles.EditProfile}>
                            <FontAwesome name="edit" size={24} style={styles.icon} />
                            <Text style={styles.textEdit}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.EditProfile}
                            onPress={signOut}>
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
    //Botão de perfil
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
        marginTop: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    EditProfile: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 190,
        width: '80%',
        borderRadius: 20,
        marginBottom: 15,
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