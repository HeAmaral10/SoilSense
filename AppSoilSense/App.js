import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/components/TelaInicial';
import TelaLogin from './src/components/TelaLogin';
import TelaCadastro from './src/components/TelaCadastro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ headerShown: false}} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}