
import { useState } from 'react';
import { View, Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');

  const handleRegister = async () => {
    if (!nome.trim() || !ultimoNome.trim()) {
      Alert.alert('Digite nome e sobrenome.');
      return;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('As senhas não coincidem.');
      return;
    }

    try {
      const res = await fetch('http://172.28.128.1:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: `${nome} ${ultimoNome}`,
          email,
          senha
        })
    });

      if (res.ok) {
        Alert.alert('Cadastro realizado com sucesso!');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Erro ao cadastrar');
      }
    } catch (err) {
      Alert.alert('Erro de conexão', err.message);
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
        <Text style={styles.titulo}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={ultimoNome}
          onChangeText={setUltimoNome}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleRegister}>
          <Text style={styles.textoBotao}>CRIAR CONTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('InitialScreen')}>
          <Text style={styles.textoBotao}>VOLTAR</Text>
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
