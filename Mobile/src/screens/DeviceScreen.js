import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function DeviceScreen({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('../assets/logo-soilsense.png')} style={styles.logoOverlay} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {dispositivos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>🌿 Planta: {item.planta}</Text>
            <Text style={styles.info}>💧 Umidade: {item.umidade}%</Text>
            <Text style={styles.info}>🌡 Temperatura: {item.temperatura}°C</Text>
            <Text style={styles.info}>🔋 Bateria: {item.bateria}%</Text>
            <Text style={styles.info}>☀️ Luminosidade: {item.luminosidade}</Text>
            <Text style={styles.info}>📅 Data: {item.data}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5EC36E' },
  overlay: { position: 'absolute', top: '40%', left: '50%', transform: [{ translateX: -100 }], opacity: 0.03 },
  logoOverlay: { width: 200, height: 200 },
  content: { padding: 20, paddingTop: 80 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 16, elevation: 4 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#0A2E36' },
  info: { fontSize: 14, color: '#333', marginTop: 4 },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2E36',
    paddingVertical: 10
  },
  menuIcon: { width: 40, height: 40 }
});
