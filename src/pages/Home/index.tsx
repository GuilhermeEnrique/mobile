import React from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from "../../routers/auth.routes";

export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    async function SignIn() {
        navigation.navigate('SignIn')
    }

    async function Register() {
        navigation.navigate('Register')
    }


    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/Background.png')}
        >
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title1}>Dice</Text><Text style={styles.title2}>Roll</Text>
                    </View>
                    <Text style={styles.subTitle}>A ferramenta ideal para seu role playing!</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonEntrar} onPress={SignIn}>
                        <Text style={styles.textEntrar}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCadastrar} onPress={Register}>
                        <Text style={styles.textCadastrar}>Cadastrar</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/Logo.png')} />
                </View>
            </View>
        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 25,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 200
    },
    titleContainer: {
        marginTop: 100,
        flexDirection: 'row'
    },
    title: {
        flexDirection: 'row'
    },
    title1: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 53
    },
    title2: {
        color: '#27B89B',
        fontWeight: 'bold',
        fontSize: 53
    },
    subTitle: {
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'left'
    },
    buttonsContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEntrar: {
        width: '95%',
        height: 50,
        backgroundColor: '#000',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginBottom: 4,
        marginTop: 4,
    },
    buttonCadastrar: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginBottom: 3,
        marginTop: 4,
    },
    textEntrar: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600'
    },
    textCadastrar: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600'
    }
})