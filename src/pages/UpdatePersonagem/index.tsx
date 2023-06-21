import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParmsList } from "../../routers/app.routes";
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

type UpdatePersonagemRouteProp = RouteProp<StackParmsList, 'UpdatePersonagem'>;

type Props = {
    route: UpdatePersonagemRouteProp;
};

type Campanha = {
    id: string;
    label: string;
    value: string;
};

export default function UpdatePersonagem({ route }: Props) {
    const { id } = route.params;
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [campanhas, setCampanhas] = useState<Campanha[]>([]);
    const [personagemCampanha, setPersonagemCampanha] = useState('');

    async function Personagens() {
        navigation.navigate('Personagens');
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [personality, setPersonality] = useState('');
    const [classe, setClasse] = useState('');
    const [level, setLevel] = useState('');
    const [race, setRace] = useState('');
    const [life, setLife] = useState('');
    const [campanhasId, setCampanha] = useState('');
    const [banner, setBanner] = useState('');

    useEffect(() => {
        fetchPermissions();
        fetchPersonagem();
        fetchCampanhas();
    }, []);

    const fetchPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('A permissão para acessar a biblioteca de mídia é necessária!');
        }
    };

    const fetchPersonagem = async () => {
        try {
            const response = await api.get(`/listen-personagens?id=${id}`);
            const imageFileName = response.data[0].banner;
            const imageURL = `${api.defaults.baseURL}/uploads/character/${imageFileName}`;
            setBanner(imageURL);
            setLevel(response.data[0].level);
            setLife(response.data[0].life);
            setName(response.data[0].name);
            setDescription(response.data[0].description);
            setPersonality(response.data[0].personality);
            setRace(response.data[0].race);
            setClasse(response.data[0].classe);
            setPersonagemCampanha(response.data[0].campanhas.title);
            setCampanha(response.data[0].campanhas.id);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCampanhas = async () => {
        try {
            const response = await api.get('/listen-campanha');
            const campanhasData = response.data.map((campanha: any) => ({
                id: campanha.id,
                label: campanha.title,
                value: campanha.id,
            }));
            setCampanhas(campanhasData);
        } catch (error) {
            console.log(error);
        }
    };

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
    };

    const selectImageFromPicker = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            // quality: 1,
        });

        if (pickerResult.canceled === true) {
            return;
        }

        const selectedAsset = pickerResult.assets[0];
        const uri = selectedAsset.uri;
        const filename = pickerResult.assets[0].uri.substring(pickerResult.assets[0].uri.lastIndexOf('/') + 1, pickerResult.assets[0].uri.length);
        const extend = filename.split('.')[1];

        const formData = new FormData();
        formData.append('file', JSON.parse(JSON.stringify({
            name: filename,
            uri: uri,
            type: 'image/' + extend
        })));

        try {
            const response = await api.put(`/update-personagem/?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data === '') {
                console.log(response.data)
                Alert.alert("Oops!", "Ocorreu um erro durante a atualização do seu personagem. Por favor, tente novamente mais tarde!")
            } else {
                console.log(response.data)
                fetchPersonagem();
                Alert.alert('Sucesso', `Imagem atualizada com sucesso!`)
            }
        } catch (e) {
            Alert.alert("Erro", "Ocorreu um erro ao atualizar seu personagem. Tente Novamente mais tarde!");
            console.log(e);
        }
    }

    const UpdatePersonagem = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('life', life);
        formData.append('level', level);
        formData.append('personality', personality);
        formData.append('classe', classe);
        formData.append('race', race);
        formData.append('campanhasId', campanhasId);
        formData.append('userId', user.id);

        try {
            const response = await api.put(`/update-personagem/?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Personagens();
            if (response.data === '') {
                console.log(response.data)
                Alert.alert("Oops!", "Ocorreu um erro durante a atualização do seu personagem. Por favor, tente novamente mais tarde!")
            } else {
                Alert.alert('Sucesso', `${name} atualizado com sucesso!`)
            }
        } catch (e) {
            Alert.alert("Erro", "Ocorreu um erro ao atualizar seu personagem. Tente Novamente mais tarde!");
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Atualizar personagem</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Image
                    source={banner ? { uri: banner } : require('../../assets/usuario.png')}
                    style={styles.preview}
                />
                <TouchableOpacity style={styles.icon} onPress={handleChooseImage}>
                    <FontAwesome name="camera" size={50} color="#EDE8E8" />
                </TouchableOpacity>
                <View style={styles.formNumber}>
                    <TextInput
                        placeholder="Pontos de vida"
                        style={styles.inputNumber}
                        value={life}
                        onChangeText={setLife}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Nível"
                        style={styles.inputNumber}
                        value={level}
                        onChangeText={setLevel}
                        keyboardType="numeric"
                    />
                </View>
                <TextInput
                    placeholder="Nome do personagem"
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    placeholder="Descrição"
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    style={styles.InputDescription}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <TextInput
                    placeholder="Personalidade"
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    style={styles.InputDescription}
                    value={personality}
                    onChangeText={(text) => setPersonality(text)}
                />
                <TextInput
                    placeholder="Raça"
                    style={styles.input}
                    value={race}
                    onChangeText={(text) => setRace(text)}
                />
                <TextInput
                    placeholder="Classe"
                    style={styles.input}
                    value={classe}
                    onChangeText={(text) => setClasse(text)}
                />
                <RNPickerSelect
                    value={campanhasId}
                    onValueChange={(value) => setCampanha(value)}
                    placeholder={{
                        label: personagemCampanha,
                        value: personagemCampanha,
                        color: '#646262'
                    }}
                    items={campanhas}
                />
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.ButtonSalvar} onPress={UpdatePersonagem}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonCancelar} onPress={Personagens}>
                    <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#F8FAFF'
    },
    header: {
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 10,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        paddingHorizontal: 10,
    },
    preview: {
        width: '100%',
        height: 280,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262',
    },
    icon: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 40,
        top: 240,
        right: 170,
        position: 'absolute',
    },
    formNumber: {
        marginTop: 30,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputNumber: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '48%',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262',
    },
    input: {
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '100%',
        height: 50,
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
        borderColor: '#646262',
    },
    footer: {
        width: '100%',
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    ButtonSalvar: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 10
    },
    ButtonCancelar: {
        backgroundColor: '#9F4A54',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        width: '100%',
        borderRadius: 10,
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    }
})