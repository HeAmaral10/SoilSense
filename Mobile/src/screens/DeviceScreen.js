import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';

export default function DeviceScreen({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [resDisp, resPlantas] = await Promise.all([
        api.get('/dispositivos', { params: { usuarioId: 1 } }),
        api.get('/plantas'),
      ]);
      setDispositivos(resDisp.data || []);
      setPlantas(resPlantas.data || []);
    } catch (error) {
      Alert.alert('Erro ao buscar dados', error.message);
    }
  }

  function getPlanta(nome) {
    const alvo = String(nome || '').toLowerCase();
    return plantas.find(p => p.nome.toLowerCase() === alvo);
  }

  async function handleDelete(id) {
    Alert.alert(
      'Apagar dispositivo',
      'Tem certeza que deseja apagar este dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/dispositivos/${id}`);
              setDispositivos(dispositivos.filter((d) => d.id !== id));
            } catch (error) {
              Alert.alert('Erro ao apagar', error.message);
            }
          },
        },
      ]
    );
  }

  function abrirGraficos(dispositivo) {
    navigation.navigate('DataScreen', {
      deviceId: dispositivo.id,
      deviceName: dispositivo.nome,
      planta: dispositivo.planta,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('../assets/logo-soilsense.png')} style={styles.logoOverlay} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {dispositivos.map((item) => {
          const pl = getPlanta(item.planta);
          return (
            <View key={item.id} style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>Planta: {item.planta}</Text>
              {pl && (
                <Text style={styles.info}>
                  Sol por dia: <Text style={{fontWeight:'700'}}>{pl.solHorasMin}–{pl.solHorasMax} h</Text>
                </Text>
              )}
              <Text style={styles.info}>Bateria: {item.bateria}%</Text>
              <Text style={styles.info}>Localização: {item.localizacao}</Text>

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                <TouchableOpacity style={styles.chartButton} onPress={() => abrirGraficos(item)}>
                  <Text style={styles.chartButtonText}>Ver gráficos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>Apagar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  deleteButton: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  chartButton: {
    backgroundColor: '#0A2E36',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  chartButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
