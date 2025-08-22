import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/screens/TelaInicial';
import TelaLogin from './src/screens/TelaLogin';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaPrincipal from './src/screens/TelaPrincipal';
import TelaGraficos from './src/screens/TelaGraficos';
import TelaDispositivo from './src/screens/TelaDispositivo';
import TelaPerfil from './src/screens/TelaPerfil';
import TelaInfo from './src/screens/TelaInfo';
import TelaConectar from './src/screens/TelaConectar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ headerShown: false}} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ headerShown: false }} />
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="TelaGraficos" component={TelaGraficos} options={{ headerShown: false }} />
        <Stack.Screen name="TelaDispositivo" component={TelaDispositivo} options={{ headerShown: false }} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ headerShown: false }} />
        <Stack.Screen name="TelaInfo" component={TelaInfo} options={{ headerShown: false }} />
        <Stack.Screen name="TelaConectar" component={TelaConectar} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}