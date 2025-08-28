import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ConectScreen from './src/screens/ConectScreen';
import DeviceScreen from './src/screens/DeviceScreen';
import GraphicScreen from './src/screens/GraphicScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InitialScreen from './src/screens/InitialScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#238879ff', // cor de fundo do drawer
          width: 250,
        },
        drawerActiveTintColor: '#003d6eff', // cor do texto do item ativo
        drawerInactiveTintColor: '#333', // cor do texto do item inativo
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#52AC95', // cor de fundo do header
        },
      }}
    >
      <Drawer.Screen name="MainScreen" component={MainScreen} options={{ title: 'Tela Principal' }} />
      <Drawer.Screen name="ConectScreen" component={ConectScreen} options={{ title: 'Conectar Dispositivo' }} />
      <Drawer.Screen name="DeviceScreen" component={DeviceScreen} options={{ title: 'Gerenciar Dispositivos' }} />
      <Drawer.Screen name="GraphicScreen" component={GraphicScreen} options={{ title: 'Gráficos' }} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
