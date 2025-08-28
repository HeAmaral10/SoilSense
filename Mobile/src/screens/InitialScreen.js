import { View, Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function InitialScreen({ navigation }) {

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/logo-soilsense.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.titulo}>Bem-vindo ao SoilSense</Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.textoBotao}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EE37B', // Verde claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'centered',
    top: 10,
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
  card: {
    backgroundColor: '#4BB79E', // verde-azulado
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
    width: windowWidth * 0.8,
    marginTop: 50,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#025C4C',
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
