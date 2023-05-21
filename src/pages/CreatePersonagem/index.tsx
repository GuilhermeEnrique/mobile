import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from '../../routers/app.routes';


//npm install react-native-image-picker
// Link a biblioteca executando o seguinte comando no terminal:
//npx react-native link react-native-image-picker


export default function CreateCampanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [classe, setClasse] = useState('');
    const [level, setLevel] = useState('');
    const [race, setRace] = useState('');
    const [life, setLife] = useState('');
    const [campanhasId, setCampanha] = useState('');
    const [userId, setUser] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    async function Personagens() {
        navigation.navigate('Personagens');
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled && result.uri) {
            setAvatarUrl(result.uri);
        }
    };

    async function openPersonagem() {
        if (name === '' || description === '' || avatarUrl === '') {
            return
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Criar uum personagem
                </Text>
                <View style={styles.Inputs}>
                    <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
                        {avatarUrl ? (
                            <Image source={{ uri: avatarUrl }} style={styles.preview} />
                        ) : (
                            <><FontAwesome name="camera" size={24} color="black" /><Text>Selecionar avatar</Text></>
                        )}
                    </TouchableOpacity>
                    <View style={styles.InputNumber}>
                        <TextInput
                            placeholder='Pontos de vida'
                            style={styles.InputL}
                            value={life}
                            onChangeText={(text) => setLife(text)}
                        />
                        <TextInput
                            placeholder='Nível'
                            style={styles.InputL}
                            value={level}
                            onChangeText={(text) => setLevel(text)}
                        />
                    </View>

                    <TextInput
                        placeholder='Nome do personagem'
                        style={styles.Input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        placeholder='Descrição'
                        style={styles.InputDescription}
                        multiline={true}
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />



                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonSalvar} onPress={openPersonagem}>
                        <Text style={styles.textSalvar}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonCancelar} onPress={Personagens}>
                        <Text style={styles.textCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF'
    },
    title: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    Inputs: {
        width: '90%',
    },
    avatarButton: {
        width: '100%',
        height: 280,
        marginBottom: 8,
        backgroundColor: '#EDE8E8',
        borderWidth: 1,
        borderColor: '#646262',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    Input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 47,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    InputDescription: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 140,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    InputNumber: {
        flexDirection: 'row',
    },
    InputL: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '50%',
        height: 47,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262',
        marginLeft: 5,
    }
    ,
    buttons: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 25,
    },
    buttonSalvar: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 10
    },
    textSalvar: {
        fontSize: 17,
        color: '#fff',
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        width: '100%',
        borderRadius: 10,
    },
    textCancelar: {
        fontSize: 17,
        color: '#fff'
    }

})

