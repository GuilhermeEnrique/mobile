import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';
import axios from 'axios';

type CreateCampaignProps = {
    title: string;
    description: string;
    image: string;
}

export default function CreateCampanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    async function CreateCampanhas() {
        navigation.navigate('Campanhas');
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.uri) {
            setImage(result.uri);
        }

        console.log(result)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Criar uma campanha
            </Text>
            <View style={styles.Inputs}>
                <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.preview} />
                    ) : (
                        <>
                            <FontAwesome name="camera" size={24} color="black" />
                            <Text>Selecionar avatar</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TextInput
                    placeholder='Nome da campanha'
                    style={styles.Input}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
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
                <TouchableOpacity style={styles.buttonSalvar}>
                    <Text style={styles.textSalvar}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancelar} onPress={CreateCampanhas}>
                    <Text style={styles.textCancelar}>Cancelar</Text>
                </TouchableOpacity>
            </View>

        </View>
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

