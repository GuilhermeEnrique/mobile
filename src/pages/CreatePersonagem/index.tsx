import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from '../../routers/app.routes';
import RNPickerSelect from 'react-native-picker-select';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

interface Campanha {
    id: string;
    title: string;
}

export default function CreatePersonagem() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [personality, setPersonality] = useState('');
    const [classe, setClasse] = useState('');
    const [level, setLevel] = useState('');
    const [race, setRace] = useState('');
    const [life, setLife] = useState('');
    const [campanhasId, setCampanha] = useState('');

    const [personagemImage, setPersonagemImage] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [typeImage, setTypeImage] = useState<string>('');

    const [campanhas, setCampanhas] = useState<Campanha[]>([]);

    async function Personagens() {
        navigation.navigate('Personagens');
    }

    useEffect(() => {
        const loadCampanhas = async () => {
            try {
                const response = await api.get('/listen-campanha');
                setCampanhas(response.data.filter((campanha: Campanha) => campanha.id));
            } catch (error) {
                console.log('Error fetching campanhas:', error);
            }
        };

        loadCampanhas();
    }, []);

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
        setPersonagemImage(uri);

        const filename = pickerResult.assets[0].uri.substring(pickerResult.assets[0].uri.lastIndexOf('/') + 1, pickerResult.assets[0].uri.length);
        const extend = filename.split('.')[1];

        setAvatarUrl(filename);
        setTypeImage(extend);
    };

    async function openPersonagem() {
        if (name === '' || description === '' || personality === '' || avatarUrl === '' || race === '' || life === '' || level === '' || campanhasId === '') {
            Alert.alert('Erro', 'Preencha todos os campos para criar uma campanha!');
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('personality', personality);
        formData.append('classe', classe);
        formData.append('level', level);
        formData.append('race', race);
        formData.append('life', life);
        formData.append('campanhasId', campanhasId);
        formData.append('userId', user.id);

        formData.append('file', JSON.parse(JSON.stringify({
            name: avatarUrl,
            uri: personagemImage,
            type: 'image/' + typeImage,
        })));

        try {
            const response = await api.post('/create-personagem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.error) {
                console.log(response.data.error)
                Alert.alert('Error', 'Não foi possível criar um personagem. Por favor, tente novamente mais tarde');
            } else {
                Alert.alert('Sucesso', `Personagem ${name} criado`);
            }
        } catch (e) {
            Alert.alert('Error', 'Erro ao criar sum personagem.');
        }

        setName('');
        setDescription('');
        setLife('');
        setClasse('');
        setLevel('');
        setRace('');
        setAvatarUrl('');
        setCampanha('');
        Personagens()
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerCenter}>
                <Text style={styles.title}>
                    Criar um personagem
                </Text>
                <View style={styles.Inputs}>
                    <TouchableOpacity style={styles.avatarButton} onPress={handleChooseImage}>
                        {personagemImage ? (
                            <Image source={{ uri: personagemImage }} style={styles.preview} />
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
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder='Nível'
                            style={styles.InputLevel}
                            value={level}
                            onChangeText={(text) => setLevel(text)}
                            keyboardType='numeric'
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
                    <TextInput
                        placeholder='Personalidade'
                        style={styles.InputDescription}
                        multiline={true}
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={personality}
                        onChangeText={(text) => setPersonality(text)}
                    />
                    <TextInput
                        placeholder='Raça'
                        style={styles.Input}
                        value={race}
                        onChangeText={(text) => setRace(text)}
                    />
                    <TextInput
                        placeholder='Classe'
                        style={styles.Input}
                        value={classe}
                        onChangeText={(text) => setClasse(text)}
                    />
                    <RNPickerSelect
                        value={campanhasId}
                        onValueChange={(value) => setCampanha(value)}
                        placeholder={{ label: 'Escolha uma campanha', value: null, color: '#646262', }}
                        items={[
                            ...campanhas.map((campanha) => ({
                                label: campanha.title,
                                value: campanha.id,
                            })),
                        ]}
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
        </ScrollView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F8FAFF'
    },
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF'
    },
    title: {
        fontSize: 25,
        margin: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    Inputs: {
        width: '90%',
        alignItems: 'center'
    },
    avatarButton: {
        width: '100%',
        height: 120,
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
        height: 120,
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
        width: '48%',
        height: 47,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262',
    },
    InputLevel: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '49%',
        height: 47,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262',
        marginLeft: 10,
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

