import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function TelaGraficos({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/logo-soilsense.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaGraficos')}>
          <Image
            source={require('../assets/graficos.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaDispositivo')}>
          <Image
            source={require('../assets/logo-soilsense.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPrincipal')}>
          <Image
            source={require('../assets/casa.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <Image
            source={require('../assets/perfil.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaInfo')}>
          <Image
            source={require('../assets/info.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5EC36E', // verde de fundo da tela
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
    opacity: 0.3,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2E36',
    paddingVertical: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
});
