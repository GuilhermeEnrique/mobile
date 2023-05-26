import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

interface Campanha {
    id: string;
    title: string;
    // Outros campos da campanha
}


export default function Campanhas() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [campanhas, setCampanhas] = useState<Campanha[]>([]);

    useEffect(() => {
        fetchCampanhas();
    }, []);

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
            return <Text style={styles.emptyList}>Nenhuma campanha foi encontrada...</Text>;
        }

        return (
            <View style={styles.listCampanhas}>
                {campanhas.map(campanha => (
                    <TouchableOpacity
                        key={campanha.id}
                        style={styles.selectCampanha}
                        onPress={() => handleSelectCampanha(campanha.id)}
                    >
                        <Text style={styles.titleText}>{campanha.title}</Text>
                        <FontAwesome name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const handleSelectCampanha = (id: string) => {
        // Implemente a lógica para navegar para a tela de detalhes da campanha
        // com o ID da campanha selecionada
    };

    async function Campanhas() {
        navigation.navigate('CreateCampanhas');

    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Suas campanhas</Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                >
                </TouchableOpacity>
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
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    refreshButton: {
        marginLeft: 16,
        marginTop: 7,
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
        fontSize: 15,
        textAlign: 'center'
    },
    listCampanhas: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 1,
    },
    selectCampanha: {
        width: '90%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    refreshButtonText: {

    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#000',
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
    }

})