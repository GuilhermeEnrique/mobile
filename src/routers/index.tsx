import React, { useContext } from "react";

import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
    const { isAuthenticated } = useContext(AuthContext)
    const loading = false;

    if (loading) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f5f7fb',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size={60} color='#255273' />
            </View>
        )
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;