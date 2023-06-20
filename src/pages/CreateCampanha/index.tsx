import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

export default function CreateCampanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectCampaignImage, setSelectCampaignImage] = useState<string | null>('');

    const [campaignImage, setCampaignImage] = useState<string>('');
    const [typeImage, setTypeImage] = useState<string>('');

    const handleChooseImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('A permissão para acessar a biblioteca de mídia é necessária!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (pickerResult.canceled === true) {
            return;
        }
        const selectedAsset = pickerResult.assets[0];
        const uri = selectedAsset.uri;
        // Atualize o estado da imagem com a URI selecionada
        setSelectCampaignImage(uri);

        const filename = pickerResult.assets[0].uri.substring(pickerResult.assets[0].uri.lastIndexOf('/') + 1, pickerResult.assets[0].uri.length);
        const extend = filename.split('.')[1];

        setCampaignImage(filename);
        setTypeImage(extend);
    };

    const handleCreateCampaign = async () => {
        if (title === '' || description === '' || selectCampaignImage === '') {
            Alert.alert('Erro', 'Preencha todos os campos para criar uma campanha!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', JSON.parse(JSON.stringify({
            name: campaignImage,
            uri: selectCampaignImage,
            type: 'image/' + typeImage,
        })));

        try {
            const response = await api.post('/create-campanha', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.error) {
                console.log(response.data.error)
                Alert.alert('Error', 'Não foi possível criar uma campanha. Por favor, tente novamente mais tarde');
            } else {
                Alert.alert('Sucesso', `Campanha ${title} criada`);
                navigation.navigate('Campanhas');
            }
        } catch (e) {
            Alert.alert('Error', 'Erro ao criar sua campanha');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Criar uma campanha
            </Text>
            <View style={styles.Inputs}>
                <TouchableOpacity style={styles.avatarButton} onPress={handleChooseImage}>
                    {selectCampaignImage ? (
                        <Image source={{ uri: selectCampaignImage }} style={styles.preview} />
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
                <TouchableOpacity style={styles.buttonSalvar} onPress={handleCreateCampaign}>
                    <Text style={styles.textSalvar}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.navigate('Campanhas')}>
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
        fontSize: 25,
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
        borderColor: '#646262',
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 25,
    },
    buttonSalvar: {
        width: '90%',
        alignItems: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 10
    },
    textSalvar: {
        fontSize: 15,
        color: '#fff',
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        width: '90%',
        borderRadius: 10,
    },
    textCancelar: {
        fontSize: 15,
        color: '#fff'
    }
})


