import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, Alert } from 'react-native';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

interface Personagens {
    id: string;
    name: string;
    description: string;
    personality: string;
    classe: string;
    race: string;
    level: string;
    life: string;
    banner: string;
    created_at: string;
    campanhas: {
        title: string;
    };
    Users: {
        name: string;
    }
}

export default function Personagens() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [personagens, setPersonagens] = useState<Personagens[]>([]);
    const [selectedPersonagem, setSelectedPersonagem] = useState<Personagens | null>(null);
    const [personagemImage, setPersonagemImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deletedPersonagemId, setDeletedPersonagemId] = useState<string | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchPersonagemImage();
        fetchPersonagens();
    }, [isFocused, deletedPersonagemId]);


    const fetchPersonagens = async () => {
        try {
            const response = await api.get('/listen-personagens');
            setPersonagens(response.data);
        } catch (error) {
            console.log('Error fetching campanhas:', error);
        }
    };

    async function fetchPersonagemImage(personagemId?: string) {
        try {
            let response;
            if (personagemId) {
                response = await api.get(`/listen-personagens?id=${personagemId}`);
                const personagem = response.data[0];
                if (personagem) {
                    const imageFileName = personagem.banner;
                    const imageURL = `${api.defaults.baseURL}/uploads/character/${imageFileName}`;
                    setPersonagemImage(imageURL);
                }
            } else {
                // console.log('nao foi possivel puxar a imagem')
            }
        } catch (error) {
            console.log(error);
        }
    };

    const DeletePersonagem = async () => {
        try {
            const response = await api.delete(`/delete-personagem?personagemId=${selectedPersonagem?.id}`);

            if (response.status === 200) {
                Alert.alert('Personagem excluído com sucesso!');
                setDeletedPersonagemId(selectedPersonagem?.id ?? null);
            } else {
                console.log('Ocorreu um erro ao excluir o personagem.');
            }
            setModalVisible(false);
        } catch (error) {
            console.log('Ocorreu um erro ao excluir o personagem:', error);
        }
    };

    const renderPersonagens = () => {
        if (personagens.length === 0) {
            return (
                <View>
                    <FontAwesome name="warning" size={50} style={styles.icon} />
                    <Text style={styles.emptyList}>Nenhum personagem foi encontrado...</Text>
                </View>);
        }

        return (
            <View style={styles.listPersonagens}>
                {personagens.map(personagem => (
                    <TouchableOpacity
                        key={personagem.id}
                        style={styles.selectPersonagem}
                        onPress={() => handleSelectPersonagem(personagem)}
                    >
                        <Text style={styles.titleTextPerson}>{personagem.name}</Text>
                        <FontAwesome name="chevron-down" size={25} color="black" style={styles.IconPersonagem} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const handleSelectPersonagem = (personagem: Personagens) => {
        setSelectedPersonagem(personagem);
        fetchPersonagemImage(personagem.id);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    async function Personagem() {
        navigation.navigate('CreatePersonagem');
    }

    const UpdatePersonagem = () => {
        setModalVisible(false);
        if (selectedPersonagem) {
            navigation.navigate('UpdatePersonagem', {
                id: selectedPersonagem.id,
                name: selectedPersonagem.name,
                description: selectedPersonagem.description,
                personality: selectedPersonagem.personality,
                classe: selectedPersonagem.classe,
                race: selectedPersonagem.race,
                level: selectedPersonagem.level,
                life: selectedPersonagem.life,
                banner: selectedPersonagem.banner,
                campanhas: selectedPersonagem.campanhas,
            });
        }
    }

    function formatDateTime(dateTime: string) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('pt-BR');
        const formattedTime = date.toLocaleTimeString('pt-BR');
        return `${formattedDate} às ${formattedTime}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Seus personagens</Text>
            </View>
            <View style={styles.personagens}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {renderPersonagens()}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.buttonNewPerson} onPress={Personagem}>
                <FontAwesome name="plus-circle" size={24} style={styles.IconNewPerson} />
                <Text style={styles.TitleNewPerson}>Criar um novo personagem</Text>
            </TouchableOpacity>
            {selectedPersonagem && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                style={styles.bannerImage}
                                source={personagemImage ? { uri: personagemImage } : require('../../assets/usuario.png')}
                            />
                            <Text style={styles.modalTitle}>{selectedPersonagem.name}</Text>
                            <View style={styles.modalNumber}>
                                <Text style={styles.modalRace}>Raça: {selectedPersonagem.race}</Text>
                                <Text style={styles.modalClasse}>Classe: {selectedPersonagem.classe}</Text>
                            </View>
                            <View style={styles.modalNumber}>
                                <Text style={styles.modalLife}>Vida: {selectedPersonagem.life}</Text>
                                <Text style={styles.modalLevel}>Nível: {selectedPersonagem.level}</Text>
                            </View>

                            <Text style={styles.TextDescription}>Descrição</Text>
                            <ScrollView style={styles.descriptionScrollView}>
                                <Text style={styles.modalDescription}>{selectedPersonagem.description}</Text>
                            </ScrollView>
                            <Text style={styles.TextDescription}>Personalidade</Text>
                            <ScrollView style={styles.descriptionScrollView}>
                                <Text style={styles.modalDescription}>{selectedPersonagem.personality}</Text>
                            </ScrollView>
                            <Text style={styles.modalCampanha}>Participa de: {selectedPersonagem.campanhas.title}</Text>
                            <Text style={styles.modalCreatedDate}>Criado por {selectedPersonagem.Users.name}</Text>
                            <Text style={styles.modalCreatedDate}>Criado em: {formatDateTime(selectedPersonagem.created_at)}</Text>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={DeletePersonagem}>
                                    <FontAwesome name="trash" size={40} style={styles.iconDelete} />
                                    <Text style={styles.iconDelete}>Deletar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <AntDesign name="book" size={40} color="black" style={styles.iconEdit} />
                                    <Text style={styles.iconEdit}>Atributos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={UpdatePersonagem}>
                                    <AntDesign name="edit" size={40} color="black" style={styles.iconEdit} />
                                    <Text style={styles.iconEdit}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <MaterialIcons name="inventory" size={40} color="black" style={styles.iconEdit} />
                                    <Text style={styles.iconEdit}>Inventário</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <FontAwesome name="remove" size={40} style={styles.iconFechar} />
                                    <Text style={styles.iconFechar}>Fechar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF'
    },
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    personagens: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    emptyList: {
        color: '#9F4A54',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        color: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',

        textShadowColor: '#000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
    },
    listPersonagens: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 1,
    },
    selectPersonagem: {
        backgroundColor: '#EDE8E8',
        width: 400,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,

        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    titleTextPerson: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20,
        width: '100%',
        height: '20%',
        fontWeight: 'bold',
        color: '#fff',

        alignItems: 'center',
        justifyContent: 'center',

        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    IconPersonagem: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonNewPerson: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 60,
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#255273',
        marginBottom: 25,
    },
    IconNewPerson: {
        color: '#F8FAFF'
    },
    TitleNewPerson: {
        fontSize: 17,
        color: '#F8FAFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalClasse: {
        fontSize: 15,
    },
    modalCampanha: {
        marginTop: 10,
        fontSize: 18,
    },
    modalCreatedDate: {
        fontSize: 12,
    },
    modalRace: {
        fontSize: 15,
    },
    modalNumber: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modalLife: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    modalLevel: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    descriptionScrollView: {
        maxHeight: 180,
    },
    TextDescription: {
        margin: 2,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalDescription: {
        textAlign: 'justify',
        fontSize: 16,
        marginBottom: 10,
    },
    modalCloseButton: {
        paddingHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        marginHorizontal: 20,
    },
    iconFechar: {
        color: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',
    },
    iconDelete: {
        color: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',
    },
    iconEdit: {
        color: '#255273',
        textAlign: 'center',
        justifyContent: 'center',
    },
})