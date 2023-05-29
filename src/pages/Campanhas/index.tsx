import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

interface Campanha {
    id: string;
    title: string;
    description: string;
    banner: string;
    created_at: string;
    characters: string;
}

export default function Campanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [campanhas, setCampanhas] = useState<Campanha[]>([]);
    const [selectedCampanha, setSelectedCampanha] = useState<Campanha | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [campanhaImage, setCampanhaImage] = useState('');

    useEffect(() => {
        fetchCampanhas();
        fetchCampanhaImage()
    }, []);

    async function fetchCampanhaImage(campanhaId?: string) {
        try {
            let response;
            if (campanhaId) {
                response = await api.get(`/listen-campanha/${campanhaId}`);
            } else {
                response = await api.get('/listen-campanha');
            }
            const imageFileName = response.data.banner; // Obter o primeiro objeto da resposta (assumindo que seja o único)
            const imageURL = `${api.defaults.baseURL}/uploads/campaign/${imageFileName}`;
            setCampanhaImage(imageURL);
        } catch (error) {
            console.log(error);
        }
    };



    const fetchCampanhas = async () => {
        try {
            const response = await api.get('/listen-campanha');
            setCampanhas(response.data);
        } catch (error) {
            console.log('Error fetching campanhas:', error);
        }
    };

    const renderCampanhas = () => {
        if (campanhas.length === 0) {
            return (
                <View>
                    <FontAwesome name="remove" size={50} style={styles.icon} />
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
                        <FontAwesome name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const handleSelectCampanha = (campanha: Campanha) => {
        setSelectedCampanha(campanha);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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
                            <Text style={styles.modalDescription}>Descrição: {selectedCampanha.description}</Text>
                            <Text style={styles.modalCreatedDate}>
                                Criado em: {selectedCampanha.created_at}
                            </Text>
                            <Text style={styles.modalPersonagem}>
                                Personagem vinculado: {selectedCampanha.characters}
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <FontAwesome name="trash" size={50} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <FontAwesome name="edit" size={50} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                    <FontAwesome name="remove" size={50} style={styles.icon} />
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
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    icon: {
        color: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',

        textShadowColor: '#000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
    },
    listCampanhas: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 1,
    },
    selectCampanha: {
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
    titleTextCampanha: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        color: '#fff',

        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
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
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    modalID: {
        fontSize: 14,
        marginBottom: 20,
    },
    modalDescription: {
        textAlign: 'justify',
        fontSize: 16,
        marginBottom: 10,
    },
    modalCreatedDate: {
        fontSize: 14,
        marginBottom: 5,
    },
    modalPersonagem: {
        fontSize: 14,
    },
    modalCloseButton: {
        padding: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#000',
    },
})