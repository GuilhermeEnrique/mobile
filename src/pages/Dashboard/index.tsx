import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { FontAwesome } from '@expo/vector-icons';



export default function Dashboard() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonProfile}>
                <Image
                    style={styles.imagem}
                    source={require('../../assets/user.png')}
                />
                <View style={styles.textProfile}>
                    <Text style={styles.text}>Olá, user</Text>
                    <FontAwesome name="edit" size={24} style={styles.icon} />
                    <Text style={styles.textEdit}>Editar Perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCampanha}>
                <Image
                    style={styles.imagemCampanha}
                    source={require('../../assets/mapa.png')}
                />
                <Text style={styles.textCampanha}>Campanha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPersonagem}>
                <Image
                    style={styles.imagemPersonagem}
                    source={require('../../assets/personagem.png')}
                />
                <Text style={styles.textPersonagem}>Ficha de personagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDados}>
                <Image
                    style={styles.imagemDados}
                    source={require('../../assets/dados.png')}
                />
                <Text style={styles.text}>Dados</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 21,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        width: '80%',
        borderRadius: 20,
        borderColor: 'dark',
        backgroundColor: 'grey',
        borderWidth: 1
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
        width: '70%',
        height: 160,
        borderRadius: 20
    },
    buttonProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 21,
        height: 180,
        width: '80%',
        borderRadius: 20,
        borderColor: 'dark',
        backgroundColor: '#EDE8E8',
        borderWidth: 1,
    },
    textProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
    imagemCampanha: {
        width: '80%',
        height: 180,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonCampanha: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    textCampanha: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    imagemPersonagem: {
        width: '80%',
        height: 180,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonPersonagem: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    textPersonagem: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    imagemDados: {
        width: '80%',
        height: 180,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonDados: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginBottom: 20
    },
    textDados: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },

})