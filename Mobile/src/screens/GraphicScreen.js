import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';


export default function GraphicScreen({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);
  const [plantaRecomendada, setPlantaRecomendada] = useState(null);
  const [indexAtual, setIndexAtual] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispositivoAtual = dispositivos[indexAtual];

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dispositivosResponse = await api.get('/dispositivos?usuarioId=1');
        const listaDispositivos = dispositivosResponse.data || [];

        setDispositivos(listaDispositivos);

        if (listaDispositivos.length > 0) {
          const plantasResponse = await api.get('/plantas');
          const planta = plantasResponse.data.find(
            (p) =>
              p.nome.toLowerCase() === listaDispositivos[0].planta.toLowerCase()
          );
          setPlantaRecomendada(planta);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  useEffect(() => {
    if (dispositivoAtual) {
      api.get('/plantas')
        .then((res) => {
          const planta = res.data.find(
            (p) => p.nome.toLowerCase() === dispositivoAtual.planta.toLowerCase()
          );
          setPlantaRecomendada(planta);
        })
        .catch((err) => console.error('Erro ao buscar planta:', err));
    }
  }, [indexAtual]);

  const corPorComparacao = (valor, ideal, tipo = 'igual') => {
    if (tipo === 'min') return valor >= ideal ? '#0A2E36' : '#B00020';
    if (tipo === 'max') return valor <= ideal ? '#0A2E36' : '#B00020';
    if (tipo === 'entre') return valor >= ideal[0] && valor <= ideal[1] ? '#0A2E36' : '#B00020';
    return valor === ideal ? '#0A2E36' : '#B00020';
  };

  const proximoDispositivo = () => {
    setIndexAtual((prev) => (prev + 1) % dispositivos.length);
  };

  const dispositivoAnterior = () => {
    setIndexAtual((prev) =>
      prev - 1 < 0 ? dispositivos.length - 1 : prev - 1
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/logo-soilsense.png')}
          style={styles.backgroundLogo}
          resizeMode="contain"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0A2E36" />
        ) : dispositivoAtual && plantaRecomendada ? (
          <>
            <Text style={styles.title}>📊 {dispositivoAtual.nome}</Text>
            <Text style={styles.label}>🌿 Planta: {dispositivoAtual.planta}</Text>

            <Text style={styles.label}>💧 Umidade:</Text>
            <Text style={[styles.value,
              { color: corPorComparacao(dispositivoAtual.umidade, plantaRecomendada.umidadeRecomendada, 'min') }]}>
              {dispositivoAtual.umidade}%
            </Text>
            <Text style={styles.note}>
              Mínimo recomendado: {plantaRecomendada.umidadeRecomendada}%
            </Text>

            <Text style={styles.label}>🌡 Temperatura:</Text>
            <Text style={[styles.value,
              {
                color: corPorComparacao(
                  dispositivoAtual.temperatura,
                  [plantaRecomendada.temperaturaMin, plantaRecomendada.temperaturaMax],
                  'entre'
                )
              }]}>
              {dispositivoAtual.temperatura}°C
            </Text>
            <Text style={styles.note}>
              Recomendado: {plantaRecomendada.temperaturaMin}° a {plantaRecomendada.temperaturaMax}°
            </Text>

            <Text style={styles.label}>☀️ Luminosidade:</Text>
            <Text style={[styles.value,
              {
                color: corPorComparacao(dispositivoAtual.luminosidade, plantaRecomendada.luminosidadeRecomendada, 'min')
              }]}>
              {dispositivoAtual.luminosidade}/100
            </Text>
            <Text style={styles.note}>
              Ideal: {plantaRecomendada.luminosidadeRecomendada}/100
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.navButton} onPress={dispositivoAnterior}>
                <Text style={styles.navText}>⬅ Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={proximoDispositivo}>
                <Text style={styles.navText}>Próximo ➡</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.note}>Nenhum dispositivo encontrado.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5EC36E' },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  backgroundLogo: {
    position: 'absolute',
    width: 200,
    height: 200,
    opacity: 0.1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A2E36',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#0A2E36',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#0A2E36',
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2E36',
    paddingVertical: 10,
  },
  menuIcon: { width: 40, height: 40 },
});
