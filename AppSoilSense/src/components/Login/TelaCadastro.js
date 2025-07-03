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

export default function TelaCadastro({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [nome, setNome] = useState('');
    const [ultimoNome, setUltimoNome] = useState('');

    const handleCadastro = () => {
        if (!email || !senha || !confirmarSenha || !nome || !ultimoNome) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        // Aqui você pode adicionar a lógica para enviar os dados de cadastro para o servidor
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('TelaLogin'); // Redireciona para a tela de login após o cadastro
    };

  return (
    <View style={styles.container}>
      {/* Logo (adicione o arquivo logo.png na pasta correta) */}
      
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

        <TouchableOpacity
          style={styles.botao}
          onPress={() => handleCadastro()}>
          <Text style={styles.textoBotao}>CRIAR CONTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaInicial')}>
          <Text style={styles.textoBotao}>VOLTAR</Text>
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
    position: 'absolute',
    top: 40,
    width: 100,
    height: 100,
  },
  card: {
    backgroundColor: '#4BB79E', // verde-azulado
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
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
