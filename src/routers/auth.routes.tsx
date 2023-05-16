import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'

export type StackParmsList = {
    Home: undefined;
    SignIn: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<StackParmsList>();

function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;