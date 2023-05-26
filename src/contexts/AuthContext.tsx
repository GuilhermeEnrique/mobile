import React, { useState, createContext, ReactNode, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { Alert } from "react-native";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    updateUser: (userData: Partial<UserProps>) => void;
};

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
    biografia?: string;
    banner?: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

type SignInProps = {
    email: string;
    password: string;
};

type SignUpProps = {
    name: string;
    email: string;
    password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: "",
        name: "",
        email: "",
        token: "",
        biografia: "",
        banner: "",
    });
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem("@diceroll");
            let hasUser: UserProps = JSON.parse(userInfo || "{}");

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`;

                setUser(hasUser);
            }
            setLoading(false);
        }

        getUser();
    }, []);

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post("/session", {
                email,
                password,
            });
            const { id, name, token } = response.data;

            const data = {
                ...response.data,
            };

            await AsyncStorage.setItem("@diceroll", JSON.stringify(data));

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
                token,
            });

            setLoadingAuth(false);
        } catch (error) {
            console.log("erro ao acessar", error);
            setLoadingAuth(false);
            alert("Credenciais incorretas, tente novamente");
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post("/create-user", {
                name,
                email,
                password,
            });

            Alert.alert('Sucesso', 'Conta criada com sucesso!')
            
            setLoadingAuth(false);
        } catch (error) {
            console.log("Erro ao registrar", error);
            setLoadingAuth(false);
            Alert.alert("Error", "Erro ao registrar usuário. Por favor, tente novamente.");
        }
    }

    async function signOut() {
        await AsyncStorage.clear().then(() => {
            setUser({
                id: "",
                name: "",
                email: "",
                token: "",
            });
        });
    }

    const updateUser = (userData: Partial<UserProps>) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...userData,
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut,
                signUp,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
