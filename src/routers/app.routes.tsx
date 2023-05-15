import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Campanhas from '../pages/Campanhas';
import CreateCampanhas from '../pages/CreateCampanha';

const Stack = createNativeStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Dashboard" component={CreateCampanhas} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppRoutes;