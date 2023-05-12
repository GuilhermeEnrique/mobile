import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routers';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F8FAFF" translucent={false} barStyle={'dark-content'} />
      <Routes />
    </NavigationContainer>
  );
}


