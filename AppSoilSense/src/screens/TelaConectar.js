
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;

export default function TelaConectar({ navigation }) {
  const [nomeDispositivo, setNomeDispositivo] = useState('');
  const [plantaSelecionada, setPlantaSelecionada] = useState('');
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    async function carregarPlantas() {
      try {
        const res = await fetch('http://localhost:4000/plantas');
        const data = await res.json();
        setPlantas(data);
      } catch (error) {
        Alert.alert('Erro ao buscar plantas', error.message);
      }
    }
    carregarPlantas();
  }, []);

  const handleSalvar = async () => {
    if (!nomeDispositivo || !plantaSelecionada) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/dispositivos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeDispositivo,
          planta: plantaSelecionada,
          umidade: 0,
          temperatura: 0,
          luminosidade: 0,
          bateria: 0,
          data: new Date().toLocaleDateString(),
          usuarioId: 1 // exemplo fixo, pode ser dinâmico após login
        })
      });

      if (res.ok) {
        Alert.alert('Dispositivo conectado com sucesso!');
        navigation.navigate('TelaDispositivo');
      } else {
        Alert.alert('Erro ao salvar dispositivo');
      }
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
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
        <Text style={styles.titulo}>Conectar dispositivo</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do dispositivo"
          value={nomeDispositivo}
          onChangeText={setNomeDispositivo}
        />

        <Text style={styles.label}>Selecione a planta monitorada:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plantaSelecionada}
            onValueChange={(itemValue) => setPlantaSelecionada(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            {plantas.map((planta) => (
              <Picker.Item key={planta.id} label={planta.nome} value={planta.nome} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
          <Text style={styles.textoBotao}>SALVAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaPrincipal')}>
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
    width: windowWidth * 0.85,
    marginTop: 150,
  },
  titulo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: 6,
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '100%',
  },
  picker: {
    width: '100%',
    height: 40,
    color: '#000',
  },
  botao: {
    backgroundColor: '#025C4C',
    paddingVertical: 12,
    marginTop: 10,
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
