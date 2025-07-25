
import { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, Alert, TextInput, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/usuarios?email=${email}&senha=${senha}`);
      const data = await res.json();

      if (data.length > 0) {
        Alert.alert('Login realizado!');
        navigation.navigate('TelaPrincipal', { usuario: data[0] });
      } else {
        Alert.alert('Email ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-soilsense.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.titulo}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EE37B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 40,
    width: 100,
    height: 100,
  },
  card: {
    backgroundColor: '#4BB79E',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
    width: windowWidth * 0.8,
    marginTop: 150,
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
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '000000',
    backgroundColor: '#fff',
    color: '#000',
  },
});
