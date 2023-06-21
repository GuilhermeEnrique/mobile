import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

interface Campanha {
    id: string;
    title: string;
    description: string;
    banner: string;
    created_at: string;
    characters: {
        name: string;
        classe: string;
    }[];
}

export default function Campanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [campanhas, setCampanhas] = useState<Campanha[]>([]);
    const [selectedCampanha, setSelectedCampanha] = useState<Campanha | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [campanhaImage, setCampanhaImage] = useState('');
    const [deletedCampanhaId, setDeletedCampanhaId] = useState<string | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchCampanhaImage();
        fetchCampanhas();
    }, [isFocused, deletedCampanhaId]);

    async function fetchCampanhaImage(campanhaId?: string) {
        try {
            let response;
            if (campanhaId) {
                response = await api.get(`/listen-campanha?id=${campanhaId}`);
                const campanha = response.data[0];
                if (campanha) {
                    const imageFileName = campanha.banner;
                    const imageURL = `${api.defaults.baseURL}/uploads/campaign/${imageFileName}`;
                    setCampanhaImage(imageURL);
                }
            } else {
                response = await api.get('/listen-campanha');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCampanhas = async () => {
        try {
            const response = await api.get('/listen-campanha');
            setCampanhas(response.data.filter((campanha: Campanha) => campanha.id !== deletedCampanhaId));
        } catch (error) {
            console.log('Error fetching campanhas:', error);
        }
    };

    const renderCampanhas = () => {
        if (campanhas.length === 0) {
            return (
                <View>
                    <FontAwesome name="warning" size={50} style={styles.icon} />
                    <Text style={styles.emptyList}>Nenhuma campanha foi encontrada...</Text>
                </View>);
        }

        return (
            <View style={styles.listCampanhas}>
                {campanhas.map(campanha => (
                    <TouchableOpacity
                        key={campanha.id}
                        style={styles.selectCampanha}
                        onPress={() => handleSelectCampanha(campanha)}
                    >
                        <Text style={styles.titleTextCampanha}>{campanha.title}</Text>
                        <FontAwesome name="chevron-down" size={20} color="black" style={styles.IconCampanha} />
                    </TouchableOpacity>
                ))}
            </View >
        );
    };

    const handleSelectCampanha = (campanha: Campanha) => {
        setSelectedCampanha(campanha);
        fetchCampanhaImage(campanha.id);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const EditCampanha = () => {
        setModalVisible(false);
        if (selectedCampanha) {
            navigation.navigate('UpdateCampanha', {
                id: selectedCampanha.id,
                title: selectedCampanha.title,
                description: selectedCampanha.description,
                banner: selectedCampanha.banner,
            });
        }
    }

    const handleDeleteCampanha = async () => {
        try {
            const response = await api.delete(`/delete-campanha?campanhasId=${selectedCampanha?.id}`);

            if (response.status === 200) {
                console.log('Campanha excluída com sucesso!');
                setDeletedCampanhaId(selectedCampanha?.id ?? null);
            } else {
                console.log('Ocorreu um erro ao excluir a campanha.');
            }

            setModalVisible(false);
        } catch (error) {
            console.log('Ocorreu um erro ao excluir a campanha:', error);
        }
    };

    function formatDateTime(dateTime: string) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('pt-BR');
        const formattedTime = date.toLocaleTimeString('pt-BR');
        return `${formattedDate} às ${formattedTime}`;
    }

    async function Campanhas() {
        navigation.navigate('CreateCampanhas');
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Suas campanhas</Text>
            </View>

            <View style={styles.campanhas}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {renderCampanhas()}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.buttonNewCampanha} onPress={Campanhas}>
                <FontAwesome name="plus-circle" size={24} style={styles.IconNewCampanha} />
                <Text style={styles.TitleNewCampanha}>Criar uma nova Campanha</Text>
            </TouchableOpacity>

            {selectedCampanha && (
                <Modal visible={isModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                style={styles.bannerImage}
                                source={campanhaImage ? { uri: campanhaImage } : require('../../assets/usuario.png')}
                            />
                            <Text style={styles.modalTitle}>{selectedCampanha.title}</Text>
                            <Text style={styles.modalID}>ID: {selectedCampanha.id}</Text>

                            <Text style={styles.TextDescription}>Descrição</Text>
                            <ScrollView style={styles.descriptionScrollView}>
                                <Text style={styles.modalDescription}>{selectedCampanha.description}</Text>
                            </ScrollView>

                            <Text style={styles.modalCreatedDate}>
                                Criado em: {formatDateTime(selectedCampanha.created_at)}
                            </Text>
                            <Text style={styles.modalPersonagem}>Personagens vinculados:</Text>
                            <ScrollView style={styles.PersonagemScrollView}>
                                <View style={styles.ViewPersonagemModal}>
                                    {selectedCampanha.characters.map((character, index) => (
                                        <Text key={index} style={styles.textPersonagem}>
                                            {character.name} é um {character.classe}!
                                        </Text>
                                    ))}
                                </View>
                            </ScrollView>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={handleDeleteCampanha}>
                                    <FontAwesome name="trash" size={50} style={styles.iconDelete} />
                                    <Text style={styles.iconDelete}>Deletar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={EditCampanha}>
                                    <AntDesign name="edit" size={50} color="black" style={styles.iconEdit} />
                                    <Text style={styles.iconEdit}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <FontAwesome name="remove" size={50} style={styles.iconFechar} />
                                    <Text style={styles.iconFechar}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
            }
        </View >
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
    campanhas: {
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
        textShadowRadius: 2,
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
    iconFechar: {
        color: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',
    },
    listCampanhas: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 1,
    },
    selectCampanha: {
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
    backgroundImage: {
        justifyContent: 'center',
        width: '100%',
        height: '20%',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    titleTextCampanha: {
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
    IconCampanha: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonNewCampanha: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 60,
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#255273',
        marginBottom: 25,
    },
    IconNewCampanha: {
        color: '#F8FAFF'
    },
    TitleNewCampanha: {
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
        padding: 30,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    modalID: {
        fontSize: 12,
        marginBottom: 10,
    },
    descriptionScrollView: {
        width: '100%',
        maxHeight: 200,
    },
    PersonagemScrollView: {
        maxHeight: 80,
        width: '100%',
        textAlign: 'center'
    },
    ViewPersonagemModal: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    textPersonagem: {
        margin: 2,
        textAlign: 'center',
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
    modalCreatedDate: {
        marginTop: 5,
        fontSize: 14,
        marginBottom: 5,
    },
    modalPersonagem: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    modalCloseButton: {
        paddingHorizontal: 50,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#000',
    },
})