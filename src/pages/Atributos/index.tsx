import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { useNavigation, useIsFocused, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { StackParmsList } from '../../routers/app.routes';
import { api } from '../../services/api';

type AtributosPersonagemRouteProp = RouteProp<StackParmsList, 'Atributos'>;

type Props = {
    route: AtributosPersonagemRouteProp;
};


export default function Atributos({ route }: Props) {
    const { id } = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>();
    const [editMode, setEditMode] = useState(false);
    const [hasAtributos, setHasAtributos] = useState(false);
    const isFocused = useIsFocused();

    const [force, setForce] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');
    const [personagemId, setpersonagemId] = useState('');

    const fetchAtributos = async () => {
        try {
            const response = await api.get(`/listen-atributos?personagemId=${id}`);
            if (response.data.length > 0) {
                setForce(response.data[0].force);
                setDexterity(response.data[0].dexterity);
                setConstitution(response.data[0].constitution);
                setIntelligence(response.data[0].intelligence);
                setWisdom(response.data[0].wisdom);
                setCharisma(response.data[0].charisma);
                setHasAtributos(true);
            } else {
                setHasAtributos(false);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar os atributos.');
        }
    };

    useEffect(() => {
        fetchAtributos();
    }, [isFocused])

    const handleCreate = async () => {
        const data = {
            force: force,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
            personagemId: id,
        };

        try {
            const response = await api.post(`/create-atributos`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Alert.alert('Sucesso', 'Atributos registrados com sucesso.');
            setEditMode(false);
            fetchAtributos();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os atributos. Tente novamente mais tarde!');
        }
    };

    const handleDeletar = async () => {
        try {
            await api.delete('/delete-atributos', {
                params: {
                    id: personagemId
                }
            });
            Alert.alert('Sucesso', 'Os atributos foram excluídos.');
            setEditMode(false);
            setForce('');
            setDexterity('');
            setConstitution('');
            setIntelligence('');
            setWisdom('');
            setCharisma('');
            fetchAtributos();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao deletar os atributos. Tente novamente mais tarde!');
        }
    };

    const handleUpdate = async () => {
        const data = {
            personagemId: id,
            force,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma
        };

        try {
            const response = await api.put('/update-atributos', data);
            Alert.alert('Sucesso', 'Atributos atualizados com sucesso.');
            fetchAtributos();
            setEditMode(false);
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar os atributos. Tente novamente mais tarde!');
        }
    };

    const handleAdicionar = () => {
        setEditMode(true);
    };

    const handleEditar = () => {
        setEditMode(!editMode);
    };

    const handleCancelar = () => {
        setEditMode(!editMode);
    };

    async function handleBack() {
        navigation.navigate('Personagens');
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Atributos</Text>
                {hasAtributos && (
                    <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletar}>
                        <FontAwesome name="trash" size={30} color="white" />
                    </TouchableOpacity>
                )}
            </View>
            <Image
                source={require('../Atributos/1484843.png')}
                style={styles.image}
            />
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Força</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={force.toString()}
                    onChangeText={setForce}
                    editable={editMode}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Destreza</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={dexterity.toString()}
                    onChangeText={setDexterity}
                    editable={editMode}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Sabedoria</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={wisdom.toString()}
                    onChangeText={setWisdom}
                    editable={editMode}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Inteligência</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={intelligence.toString()}
                    onChangeText={setIntelligence}
                    editable={editMode}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Carisma</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={charisma.toString()}
                    onChangeText={setCharisma}
                    editable={editMode}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.titleTextInput}>Constituição</Text>
                <TextInput
                    style={[
                        styles.inputValue,
                        editMode ? { backgroundColor: '#F8FAFF' } : { backgroundColor: '#EDE8E8' }
                    ]}
                    keyboardType="numeric"
                    value={constitution.toString()}
                    onChangeText={setConstitution}
                    editable={editMode}
                />
            </View>

            {editMode ? (
                <View style={styles.buttonsEditMode}>
                    <TouchableOpacity style={styles.buttonSalvar} onPress={hasAtributos ? handleUpdate : handleCreate}>
                        <Text style={styles.textButton}>{hasAtributos ? 'Atualizar' : 'Salvar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancelarEditMode} onPress={handleCancelar}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.buttons}>
                    {hasAtributos ? (
                        <TouchableOpacity style={styles.buttonEdit} onPress={handleEditar}>
                            <Text style={styles.textButton}>Editar atributos</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.buttonAdicionar} onPress={handleAdicionar}>
                            <Text style={styles.textButton}>Adicionar atributos</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.buttonCancelar} onPress={handleBack}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    image: {
        width: '40%',
        height: '20%',
    },
    titleText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonDelete: {
        marginTop: 20,
        backgroundColor: '#9F4A54',
        padding: 10,
        borderRadius: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDE8E8',
        padding: 13,
        width: '90%',
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    inputValue: {
        color: '#000',
        backgroundColor: '#F8FAFF',
        width: '20%',
        fontSize: 20,
        height: 46,
        textAlign: 'center',
    },
    titleTextInput: {
        flexBasis: '80%', 
        textAlign: 'left',
        fontSize: 16,
        color: '#000',
    },
    buttons: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonsEditMode: {
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonSalvar: {
        backgroundColor: '#598381',
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10
    },
    buttonAdicionar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#598381',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    buttonEdit: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#255273',
        borderRadius: 10,
        marginVertical: 10
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
    },
    buttonCancelarEditMode: {
        backgroundColor: '#9F4A54',
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
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
})