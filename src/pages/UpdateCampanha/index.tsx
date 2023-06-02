import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';
import { } from "@react-navigation/native";

type UpdateCampanhaRouteProp = RouteProp<StackParmsList, 'UpdateCampanha'>;

type Props = {
    route: UpdateCampanhaRouteProp;
};

export default function UpdateCampanha({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { id } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState<string>('');


    const fetchCampanhaData = async () => {
        try {
            const response = await api.get(`/listen-campanha?id=${id}`);
            const campanha = response.data;
            // Preencha os campos com as informações do usuário
            const imageFileName = response.data[0].banner;
            const imageURL = `${api.defaults.baseURL}/uploads/campaign/${imageFileName}`;
            setBanner(imageURL);
            setTitle(campanha[0].title)
            setDescription(campanha[0].description)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCampanhaData();
    }, []);


    const handleChooseImage = async () => {
        Alert.alert(
            'Modificar imagem',
            'Tem certeza de que deseja modificar a imagem do perfil?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: selectImageFromPicker,
                },
            ],
            { cancelable: false }
        );
    }

    const selectImageFromPicker = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (pickerResult.canceled === true) {
            return;
        }

        const uri = pickerResult.assets[0].uri;
        const filename = pickerResult.assets[0].uri.substring(pickerResult.assets[0].uri.lastIndexOf('/') + 1, pickerResult.assets[0].uri.length);
        const extend = filename.split('.')[1];

        const formData = new FormData()
        formData.append('file', JSON.parse(JSON.stringify({
            name: filename,
            uri: uri,
            type: 'image/' + extend,
        })));

        try {
            const response = await api.put(`/update-campanha?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.error) {
                console.log(response.data.error)
                Alert.alert('Error', 'Não foi possível atualizar sua campanha. Por favor, tente novamente mais tarde');
            } else {
                Alert.alert('Sucesso', `Imagem  atualizada`);
                fetchCampanhaData();
            }
        } catch (e) {
            Alert.alert('Error', 'Erro ao atualizar sua campanha');
            console.log(e);
        }

    };

    const handleUpdateCampaign = async () => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await api.put(`/update-campanha?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.error) {
                console.log(response.data.error)
                Alert.alert('Error', 'Não foi possível atualizar sua campanha. Por favor, tente novamente mais tarde');
            } else {
                Alert.alert('Sucesso', `Campanha  atualizada`);
                navigation.navigate('Campanhas');
            }
        } catch (e) {
            Alert.alert('Error', 'Erro ao atualizar sua campanha');
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Atualizar a campanha
                </Text>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.Inputs}>
                <Image
                    source={banner ? { uri: banner } : require('../../assets/usuario.png')}
                    style={styles.bannerImage}
                />
                <TouchableOpacity style={styles.avatarButton} onPress={handleChooseImage}>
                    <FontAwesome name="camera" size={50} color="#EDE8E8" />
                </TouchableOpacity>
                <TextInput
                    style={styles.Input}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    style={styles.InputDescription}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <TouchableOpacity style={styles.buttonSalvar} onPress={handleUpdateCampaign}>
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
    titleContainer: {
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    Subtitle: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    Inputs: {
        width: '90%',
        marginBottom: 300,
    },
    avatarButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 40,
        top: 280,
        right: 160,
        position: 'absolute',
    },
    Input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        marginTop: 40,
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    InputDescription: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 180,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    buttons: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
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
        fontSize: 15,
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
        fontSize: 15,
        color: '#fff'
    },
    bannerImage: {
        marginTop: 20,
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    }
})

