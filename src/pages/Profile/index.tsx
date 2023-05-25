import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../../services/api';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
interface UserData {
    id: string;
    name: string;
    email: string;
    biografia: string;
}

export default function Profile() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [biografia, setBiografia] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>('');
    const [isEditing, setIsEditing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        fetchUserData();
        fetchProfileImage();
        fetchPermissions();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await api.get('/about'); // Rota correspondente ao backend
            const user = response.data;

            // Preencha os campos com as informações do usuário
            setUserData(user);
            setId(user.id);
            setName(user.name);
            setEmail(user.email);
            setBiografia(user.biografia);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProfileImage = async () => {
        try {
            const response = await api.get('/profile/image');
            const imageFileName = response.data.imageFileName;
            const imageURL = `http://192.168.100.74:3333/uploads/${imageFileName}`;
            setProfileImage(imageURL);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('A permissão para acessar a biblioteca de mídia é necessária!');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await api.put(`/update-user:${id}`, {
                name,
                email,
                biografia,
            });
            console.log(response.data);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChooseImage = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (pickerResult.canceled === true) {
            return;
        }

        const selectedAsset = pickerResult.assets[0];
        const uri = selectedAsset.uri;
        // Atualize o estado da imagem com a URI selecionada
        setProfileImage(uri);

        const filename = pickerResult.assets[0].uri.substring(pickerResult.assets[0].uri.lastIndexOf('/') + 1, pickerResult.assets[0].uri.length);
        const extend = filename.split('.')[1];
        
        const formData = new FormData();
        formData.append('file', JSON.parse(JSON.stringify({
            name: filename,
            uri: pickerResult.assets[0].uri,
            type: 'image/' + extend,
        })));
        
        try {
            const response = await api.put(`/update-user:${id}`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.error) {
                Alert.alert('Error', 'Não foi possível enviar sua imagem. Por favor, tente novamente mais tarde')
            }
        } catch (e) {
            Alert.alert('Error', 'Erro ao enviar sua imagem')
        }
    };

    const handleEditPress = () => {
        setIsEditing(true);
        setIsCanceling(false);
    };

    const handleCancelEdit = () => {
        if (userData) {
            setName(userData.name);
            setEmail(userData.email);
            setBiografia(userData.biografia);
        }
        setIsEditing(false);
        setIsCanceling(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.containerCenter}>
                <View>
                    <Image
                        style={styles.imagemProfile}
                        source={profileImage ? { uri: profileImage } : require('../../assets/usuario.png')}
                    />
                    {isEditing && (
                        <TouchableOpacity style={styles.iconProfile} onPress={handleChooseImage}>
                            <FontAwesome name="camera" size={30} color="#F8FAFF" />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.subTitle}>Olá, {name}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        Id
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={id}
                        editable={false}
                    />
                    <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={name}
                        value={name}
                        editable={isEditing}
                        onChangeText={setName}
                    />
                    <FontAwesome name="pencil-square-o" size={24} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        keyboardType="email-address"
                        editable={isEditing}
                        onChangeText={setEmail}
                    />
                    <FontAwesome name="pencil-square-o" size={24} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainerBio}>
                    <Text style={styles.inputTextBiografia}>
                        Sobre você
                    </Text>
                    <TextInput
                        multiline={true}
                        editable={isEditing}
                        numberOfLines={3}
                        textAlignVertical="top"
                        style={styles.inputBiografia}
                        value={biografia}
                        onChangeText={setBiografia}
                    />
                    <FontAwesome name="pencil-square-o" size={24} color="black" style={styles.iconBiografia} />
                </View>

                {!isEditing && (
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.resetPassword}>
                            <Text style={{ color: 'blue', fontSize: 16 }}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonEdit} onPress={handleEditPress}>
                            <Text style={styles.textEdit}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {isEditing && (
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonSalvar} onPress={handleUpdateProfile}>
                            <Text style={styles.textSalvar}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelEdit}>
                            <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
    },
    containerCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginBottom: 100,
    },
    iconProfile: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 100,
        position: 'absolute',
        top: 160,
        right: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    subTitle: {
        textTransform: 'capitalize',
        fontSize: 20,
        marginTop: 25,
        marginBottom: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    imagemProfile: {
        marginTop: 15,
        width: 180,
        height: 180,
        borderRadius: 90,
    },
    inputBiografia: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '70%',
        height: 160,
        textAlign: 'justify',
    },
    input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '70%',
        height: 60,
    },
    inputTitle: {
        textAlignVertical: 'center',
        color: '#000',
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '20%',
        height: 60,
    },
    resetPassword: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 13,
    },
    buttonEdit: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#255273',
        borderRadius: 10,
    },
    textEdit: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#28AC92',
        marginBottom: 10,
    },
    inputContainerBio: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#28AC92',
        marginBottom: 10,
    },
    inputTextBiografia: {
        color: '#000',
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '20%',
        height: 160,
        textAlign: 'justify',
    },
    icon: {
        backgroundColor: '#EDE8E8',
        paddingVertical: 18,
        width: '10%',
        height: 60,
    },
    iconBiografia: {
        backgroundColor: '#EDE8E8',
        paddingVertical: 18,
        width: '10%',
        height: 160,
    },
    buttons: {
        width: '100%',
    },
    buttonSalvar: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 15,
    },
    buttonCancelar: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#9F4A54',
        marginBottom: 15,
    },
    textSalvar: {
        color: '#fff',
    },
    textCancelar: {
        color: '#fff',
    },
});
