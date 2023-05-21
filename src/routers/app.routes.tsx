import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Campanhas from '../pages/Campanhas';
import CreateCampanhas from '../pages/CreateCampanha';
import CreatePersonagens from '../pages/CreatePersonagem';
import Personagens from '../pages/Personagens';
import Dice from '../pages/Dice';
import Profile from '../pages/Profile';

export type StackParmsList = {
    Dashboard: undefined;
    Campanhas: undefined;
    CreateCampanhas: undefined;
    Personagens: undefined;
    CreatePersonagem: undefined;
    Dice: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParmsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Campanhas"
                component={Campanhas}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateCampanhas"
                component={CreateCampanhas}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Personagens"
                component={Personagens}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreatePersonagem"
                component={CreatePersonagens}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Dice"
                component={Dice}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;