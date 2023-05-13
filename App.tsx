import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routers';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#F8FAFF" translucent={false} barStyle={'dark-content'} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}


