import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ScrollView, } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StackParmsList } from "../../routers/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { RouteProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from '../../services/api';

type InventarioPersonagemRouteProp = RouteProp<StackParmsList, 'Inventario'>;

type Props = {
    route: InventarioPersonagemRouteProp;
};

interface Inventario {
    id: string;
    name: string;
    type: string;
    description: string;
    amount: string;
    personagemId: string;
}


export default function Inventario({ route }: Props) {
    const { id } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [itens, setItens] = useState<Inventario[]>([]);
    const [editItem, setEditItem] = useState<Inventario | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [viewItem, setViewItem] = useState(null);
    const [modalView, setModalView] = useState(false);

    const [itemId, setItemId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetchItens();
    }, []);

    const handleAdicionarItem = () => {
        setModalVisible(true);
    };

    const handleSalvarItem = async () => {
        if (name === '' || amount === '' || type === '') {
            Alert.alert('Erro', 'Preencha os campos corretamente para adicionar um item!');
            return;
        }

        const data = {
            name: name,
            type: type,
            description: description,
            amount: amount,
            personagemId: id
        };

        try {
            const response = await api.post('/create-inventario', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.error) {
                console.log(response.data.error)
                Alert.alert('Error', 'Não foi possível adicionar um item. Por favor, tente novamente mais tarde');
            } else {
                // Fecha a modal
                setName('');
                setType('');
                setDescription('');
                setAmount('');
                setModalVisible(false);
                fetchItens();
            }
        } catch (error) {
            Alert.alert('Error', 'Erro ao adicionar um item!');
            console.log(error);
        }
    };

    const handleFecharModal = () => {
        // Fecha a modal sem salvar o novo item
        setModalVisible(false);
        setModalEdit(false);
    };

    const fetchItens = async () => {
        try {
            const response = await api.get(`/listen-inventario?personagemId=${id}`);
            setItens(response.data.filter((item: Inventario) => item.personagemId === id));
        } catch (error) {
            console.log('Error fetching itens:', error);
        }
    };

    const renderItens = () => {
        if (itens.length === 0) {
            return (
                <View>
                    <FontAwesome name="warning" size={50} style={styles.icon} />
                    <Text style={styles.emptyList}>Nenhum item foi encontrado...</Text>
                </View>
            );
        }

        return (
            <View style={styles.listItens}>
                {itens.map((item) => (
                    <View style={styles.selectItem} key={item.id}>
                        <Text style={styles.titleTextItem}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleViewItem(item)}>
                            <FontAwesome name="eye" size={25} color="black" style={styles.IconItem} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEditItem(item)}>
                            <FontAwesome name="edit" size={25} color="black" style={styles.IconItem} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                            <FontAwesome name="trash" size={25} color="black" style={styles.IconItem} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const handleViewItem = (item: Inventario) => {
        setModalView(true);
    };


    const handleEditItem = (item: Inventario) => {
        setItemId(item.id);
        setName(item.name);
        setType(item.type);
        setDescription(item.description);
        setAmount(item.amount);

        // Abra a modal de edição
        setModalEdit(true);
    };

    const handleUpdateItem = async () => {
        const data = {
            id: itemId,
            name: name,
            type: type,
            description: description,
            amount: amount,
            personagemId: id
        };

        try {
            const response = await api.put(`/update-inventario`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.error) {
                console.log(response.data.error);
                Alert.alert('Error', 'Não foi possível atualizar o item. Por favor, tente novamente mais tarde!');
            } else {

                setName('');
                setType('');
                setDescription('');
                setAmount('');
                setModalEdit(false);
                setEditItem(null);
                fetchItens();
            }
        } catch (error) {
            Alert.alert('Error', 'Erro ao atualizar o item!');
            console.log(error);
        }
    };


    const handleDeleteItem = async (item: Inventario) => {
        try {
            await api.delete(`/delete-item?id=${item.id}`);
            setItens((prevItens) => prevItens.filter((i) => i.id !== item.id));
            Alert.alert('Sucesso', 'Item excluído com sucesso');
        } catch (error) {
            console.log('Erro ao excluir item:', error);
            Alert.alert('Erro', 'Erro ao excluir item. Por favor, tente novamente mais tarde');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Inventário</Text>
            </View>
            <View style={styles.inventario}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {renderItens()}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.buttonAdicionar} onPress={handleAdicionarItem} >
                <Text style={styles.textButton}>Adicionar item</Text>
            </TouchableOpacity>


            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo"
                            value={type}
                            onChangeText={setType}
                        />
                        <TextInput
                            style={styles.InputDescription}
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            placeholder="Descrição"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Quantidade"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleSalvarItem}>
                            <Text style={styles.modalEdit} >Salvar item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleFecharModal}>
                            <Text style={styles.modalCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalEdit} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo"
                            value={type}
                            onChangeText={setType}
                        />
                        <TextInput
                            style={styles.InputDescription}
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            placeholder="Descrição"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Quantidade"
                            value={amount.toString()}
                            onChangeText={setAmount}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateItem}>
                            <Text style={styles.modalEdit}>Atualizar item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleFecharModal}>
                            <Text style={styles.modalCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
        paddingTop: 20,
    },
    titleContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inventario: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    titleText: {
        flex: 1,
        fontSize: 25,
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
    emptyList: {
        color: '#9F4A54',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listItens: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 1,
    },
    selectItem: {
        flexDirection: 'row',
        backgroundColor: '#EDE8E8',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,

        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    titleTextItem: {
        textAlign: 'left',
        fontSize: 16,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconItem: {
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    },
    buttonAdicionar: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    buttonCancelar: {
        backgroundColor: '#9F4A54',
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
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
        height: 140,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#646262'
    },
    modalButton: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalEdit: {
        width: 200,
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        backgroundColor: '#255273',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    modalCancelar: {
        width: 200,
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        backgroundColor: '#9F4A54',
        textAlign: 'center',
        justifyContent: 'center',
    },
})