import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TelaInfo({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/logo-soilsense.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* Card com texto */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre o SoilSense</Text>
          <Text style={styles.cardText}>
            O SoilSense é uma solução inteligente para monitoramento do solo,
            auxiliando produtores na tomada de decisões precisas.
          </Text>
        </View>
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
    backgroundColor: '#5EC36E',
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0A2E36',
  },
  cardText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
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
