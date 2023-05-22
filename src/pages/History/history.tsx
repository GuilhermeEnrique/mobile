import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function getIconName(type: string): string {
    switch (type) {
        case '4':
            return 'dice-d4';
        case '6':
            return 'dice-d6';
        case '8':
            return 'dice-d8';
        case '12':
            return 'dice-d12';
        case '20':
            return 'dice-d20';
        case '100':
            return 'dice-multiple';
        default:
            return 'dice-1';
    }
}

const History = ({ history }) => {
    return (
        <ScrollView style={styles.scrollView}>
            {history.map((roll, index) => (
                <View key={index} style={styles.container}>
                    <MaterialCommunityIcons name={getIconName(roll.type)} size={20} color="black" />
                    <Text>Rolagem {index + 1}:</Text>
                    {roll.result.map((result, i) => (
                        <Text key={i}>Dado de número {i + 1} = {result}</Text>
                    ))}
                    <Text>Soma dos resultados: {roll.sum}</Text>
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
    },
});

export default History;
