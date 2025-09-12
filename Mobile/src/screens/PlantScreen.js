import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import api from '../services/api';

export default function PlantScreen({ navigation }) {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    fetchPlantas();
  }, []);

  async function fetchPlantas() {
    try {
      const res = await api.get('/plantas');
      setPlantas(res.data);
    } catch (error) {
      Alert.alert('Erro ao buscar plantas', error.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('../assets/logo-soilsense.png')} style={styles.logoOverlay} />
      </View>
      <FlatList
        data={plantas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.info}>Umidade Recomendada: {item.umidadeRecomendada}%</Text>
                <Text style={styles.info}>Temperatura Mínima: {item.temperaturaMin}°C</Text>
                <Text style={styles.info}>Temperatura Máxima: {item.temperaturaMax}°C</Text>
                <Text style={styles.info}>Luminosidade: {item.luminosidadeRecomendada}</Text>
            </View>
        )}
        contentContainerStyle={styles.content}
        />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5EC36E' },
  overlay: { position: 'absolute', top: '40%', left: '50%', transform: [{ translateX: -100 }], opacity: 0.03 },
  logoOverlay: { width: 200, height: 200 },
  content: { padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 16, elevation: 4 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#0A2E36' },
  info: { fontSize: 14, color: '#333', marginTop: 4 },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2E36',
    paddingVertical: 10
  },
  menuIcon: { width: 40, height: 40 },
  deleteButton: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
