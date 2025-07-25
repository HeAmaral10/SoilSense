import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/components/TelaInicial';
import TelaLogin from './src/components/TelaLogin';
import TelaCadastro from './src/components/TelaCadastro';
import TelaPrincipal from './src/components/TelaPrincipal';
import TelaGraficos from './src/components/TelaGraficos';
import TelaDispositivo from './src/components/TelaDispositivo';
import TelaPerfil from './src/components/TelaPerfil';
import TelaInfo from './src/components/TelaInfo';
import TelaConectar from './src/components/TelaConectar';

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