import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';

type CampanhaProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
};

interface CampanhasProps {
    campanhas: CampanhaProps[];
}

export type CampanhaItemProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
    characters: {
        map(arg0: (character: any) => JSX.Element): React.ReactNode;
        id: string;
        name: string;
    };
};

export default function Campanhas({ campanhas }: CampanhasProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [campanhaList, setCampanhaList] = useState(campanhas || []);
    const [modalItem, setModalItem] = useState<CampanhaItemProps | undefined>();
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function Campanhas() {
        navigation.navigate('CreateCampanhas');
    }

    async function handleOpenModalView(id: string) {
        // Lógica para obter os dados da campanha com base no ID
        // setModalItem(response.data);
        setModalVisible(true);
    }
    async function handleRefresh() {
        setRefreshing(true);
        // Lógica de atualização dos dados
        setRefreshing(false);
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Suas campanhas</Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={handleRefresh}
                    disabled={refreshing}
                >
                    {refreshing ? (
                        <Text style={styles.refreshButtonText}>Atualizando...</Text>
                    ) : (
                        <FontAwesome name="refresh" size={24} color="black" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.campanhas}>
                {campanhaList.length === 0 && (
                    <Text style={styles.emptyList}>Nenhuma campanha foi encontrada...</Text>
                )}
                <View style={styles.listCampanhas}>
                    {campanhaList.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.selectCampanha}
                            onPress={() => handleOpenModalView(item.id)}
                        >
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
    campanhas: {

    },
    emptyList: {
        fontSize: 20,
        textAlign: 'center'
    },
    listCampanhas: {

    },
    selectCampanha: {

    },
    refreshButtonText: {

    },
    titleText: {
        marginRight: 15,
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