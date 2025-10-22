import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, FlatList } from 'react-native';
import api from '../services/api';

export default function PlantScreen() {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    fetchPlantas();
  }, []);

  async function fetchPlantas() {
    try {
      const res = await api.get('/plantas');
      setPlantas(res.data || []);
    } catch (error) {
      Alert.alert('Erro ao buscar plantas', error.message);
    }
  }

  // Fallback para bancos antigos que ainda usam "luminosidadeRecomendada"
  function descricaoLuzAntiga(luxPct) {
    if (luxPct == null) return null;
    if (luxPct >= 90) return 'exige alta luz';
    if (luxPct >= 70) return 'luz moderada';
    return 'baixa luz';
  }

  const renderItem = ({ item }) => {
    const faixaSol =
      (item.solHorasMin != null && item.solHorasMax != null)
        ? `${item.solHorasMin}–${item.solHorasMax} h`
        : null;

    const fallbackLux = descricaoLuzAntiga(item.luminosidadeRecomendada);

    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>

        <View style={styles.row}>
          <Text style={styles.badgeLabel}>💧 Umidade</Text>
          <Text style={styles.badgeValue}>{item.umidadeRecomendada}%</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badgeLabel}>🌡 Temperatura</Text>
          <Text style={styles.badgeValue}>
            {item.temperaturaMin}°C – {item.temperaturaMax}°C
          </Text>
        </View>

        {faixaSol ? (
          <View style={styles.row}>
            <Text style={styles.badgeLabel}>☀️ Sol por dia</Text>
            <Text style={[styles.badgeValue, styles.sunHours]}>{faixaSol}</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.badgeLabel}>☀️ Luz</Text>
            <Text style={styles.badgeValue}>
              {fallbackLux ? `${fallbackLux} (dados antigos)` : '—'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('../assets/logo-soilsense.png')} style={styles.logoOverlay} />
      </View>

      <FlatList
        data={plantas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
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
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#0A2E36', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  badgeLabel: { fontSize: 14, color: '#0A2E36', fontWeight: '600' },
  badgeValue: {
    fontSize: 14,
    color: '#0A2E36',
    backgroundColor: '#E7F5EA',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: '700',
  },
  sunHours: {
    backgroundColor: '#DFF4FF',
  },
});
