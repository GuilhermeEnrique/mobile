import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const History = ({ history }) => {
    return (
        <ScrollView style={styles.scrollView}>
            {history.map((roll, index) => (
                <View key={index} style={styles.container}>
                    <FontAwesome5 name="dice" size={20} color="black" />
                    <Text>Rolagem {index + 1}:</Text>
                    {roll.map((result, i) => (
                        <Text key={i}>Dado de número {i + 1} = {result}</Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        minHeight: 100,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#646262',
        backgroundColor: '#EDE8E8',
    },
    container: {
        flexDirection: 'column',
        padding: 13,
        width: '100%',
    }
})

export default History;
