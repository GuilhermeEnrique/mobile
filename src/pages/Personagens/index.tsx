import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

interface Personagens {
    id: string;
    name: string;
    // Outros campos do personagens
}

export default function Personagens() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();

    const [personagens, setPersonagens] = useState<Personagens[]>([]);

    useEffect(() => {
        fetchPersonagens();
    }, []);

    const fetchPersonagens = async () => {
        try {
            const response = await api.get('/listen-personagens');
            setPersonagens(response.data);
        } catch (error) {
            console.log('Error fetching campanhas:', error);
        }
    };

    const renderPersonagens = () => {
        if (personagens.length === 0) {
            return (
                <View>
                    <FontAwesome name="remove" size={50} style={styles.icon} />
                    <Text style={styles.emptyList}>Nenhum personagem foi encontrado...</Text>
                </View>);
        }

        return (
            <View style={styles.listPersonagens}>
                {personagens.map(personagem => (
                    <TouchableOpacity
                        key={personagem.id}
                        style={styles.selectCampanha}
                        onPress={() => handleSelectCampanha(personagem.id)}
                    >
                        <Text style={styles.titleTextPerson}>{personagem.name}</Text>
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

    async function Personagem() {
        navigation.navigate('CreatePersonagem');
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
    listPersonagens: {
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
    titleTextPerson: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        color: '#fff',

        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
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
    }

})