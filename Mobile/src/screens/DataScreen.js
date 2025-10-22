import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import api from '../services/api';

const screenWidth = Dimensions.get('window').width;

// ===== Calibração =====
const SUN_DIRECT_THRESHOLD = 3000; // ajuste conforme seu LDR/circuito

export default function DataScreen({ route }) {
  const params = route?.params || {};
  const deviceIdParam = params.deviceId;
  const deviceNameParam = params.deviceName;
  const plantaParam = params.planta;

  const [dispositivoAtual, setDispositivoAtual] = useState(null);
  const [plantaRecomendada, setPlantaRecomendada] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------- Helpers ----------
  const corPorComparacao = (valor, ideal, tipo = 'entre') => {
    if (tipo === 'entre') return valor >= ideal[0] && valor <= ideal[1] ? '#0A2E36' : '#B00020';
    return '#0A2E36';
  };

  const leituraLumRaw = (h) => Number(h?.valorLuz ?? h?.luz ?? 0);

  // Agrupa por data local (YYYY-MM-DD) e soma horas com valor acima do limiar
  function horasSolPorDia(hist, limiar) {
    // ordenado por hora
    const arr = (hist || []).slice().sort((a, b) => String(a.hora).localeCompare(String(b.hora)));
    const daily = {}; // { 'YYYY-MM-DD': horas }
    for (let i = 0; i < arr.length - 1; i++) {
      const a = arr[i], b = arr[i + 1];
      const t1 = new Date(a.hora);
      const t2 = new Date(b.hora);
      const hours = Math.max(0, (t2 - t1) / 36e5);
      const raw = leituraLumRaw(a);
      const dayKey = t1.toISOString().slice(0,10); // YYYY-MM-DD
      if (!daily[dayKey]) daily[dayKey] = 0;
      if (raw >= limiar) daily[dayKey] += hours; // assume passo-constante até a próxima leitura
    }
    return daily;
  }

  // ---------- Carrega metadados ----------
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        if (!deviceIdParam) {
          const dispositivosResponse = await api.get('/dispositivos?usuarioId=1');
          const lista = dispositivosResponse.data || [];
          if (lista.length > 0) setDispositivoAtual(lista[0]);
        } else {
          const byId = await api.get(`/dispositivos/${deviceIdParam}`);
          setDispositivoAtual(byId.data);
        }
      } catch (err) {
        console.error('Erro ao buscar dispositivo:', err?.message || err);
      }
    };
    fetchMeta();
  }, [deviceIdParam]);

  useEffect(() => {
    const fetchPlanta = async () => {
      if (!dispositivoAtual && !plantaParam) return;
      try {
        const plantasResponse = await api.get('/plantas');
        const alvo = (dispositivoAtual?.planta || plantaParam || '').toLowerCase();
        const planta = (plantasResponse.data || []).find((p) => p.nome.toLowerCase() === alvo);
        setPlantaRecomendada(planta || null);
      } catch (err) {
        console.error('Erro ao buscar planta:', err?.message || err);
      }
    };
    fetchPlanta();
  }, [dispositivoAtual, plantaParam]);

  // ---------- Carrega histórico ----------
  useEffect(() => {
    const fetchHistorico = async () => {
      setLoading(true);
      try {
        const id = deviceIdParam || dispositivoAtual?.id;
        if (!id) return;

        let hist = [];

        // 1) /leituras?deviceId=ID
        try {
          const r = await api.get(`/leituras?deviceId=${id}`);
          if (Array.isArray(r.data)) hist = r.data;
        } catch (e) {}

        // 2) /leituras/ID
        if (hist.length === 0) {
          try {
            const r2 = await api.get(`/leituras/${id}`);
            if (Array.isArray(r2.data)) {
              hist = r2.data;
            } else if (r2.data?.[id]) {
              hist = r2.data[id];
            } else if (r2.data?.leituras?.[id]) {
              hist = r2.data.leituras[id];
            }
          } catch (e) {}
        }

        // 3) /leituras (fallback)
        if (hist.length === 0) {
          try {
            const r3 = await api.get(`/leituras`);
            if (Array.isArray(r3.data)) {
              hist = r3.data.filter((x) => String(x.deviceId) === String(id));
            } else if (r3.data?.[id]) {
              hist = r3.data[id];
            } else if (r3.data?.leituras?.[id]) {
              hist = r3.data.leituras[id];
            }
          } catch (e) {}
        }

        hist = (hist || []).slice().sort((a, b) => String(a.hora).localeCompare(String(b.hora)));
        setHistorico(hist);
      } catch (err) {
        console.error('Erro ao buscar histórico:', err?.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, [deviceIdParam, dispositivoAtual?.id]);

  // ---------- Dados dos gráficos ----------
  const labels = useMemo(() => {
    const arr = historico.map((h) => {
      const t = String(h.hora || '').split('T')[1] || '';
      return t ? t.substring(0, 8) : h.hora;
    });
    if (arr.length <= 12) return arr;
    const step = Math.ceil(arr.length / 12);
    return arr.map((v, i) => (i % step === 0 ? v : '') );
  }, [historico]);

  const serieTemperatura = useMemo(() => {
    return historico.map((h) => Number(h.temperatura_c ?? h.temperatura ?? 0));
  }, [historico]);

  const serieLuminosidadeRAW = useMemo(() => historico.map(leituraLumRaw), [historico]);
  const serieLimiteSolDireto = useMemo(() => historico.map(() => SUN_DIRECT_THRESHOLD), [historico]);

  // ---------- Cálculo de horas de sol direto ----------
  const horasPorDia = useMemo(() => horasSolPorDia(historico, SUN_DIRECT_THRESHOLD), [historico]);
  const todayKey = useMemo(() => new Date().toISOString().slice(0,10), []);
  const horasHoje = horasPorDia[todayKey] ?? 0;

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(10, 46, 54, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    propsForDots: { r: '3' },
    propsForBackgroundLines: { strokeDasharray: '4 8' },
  };

  const idealSol = plantaRecomendada ? [plantaRecomendada.solHorasMin, plantaRecomendada.solHorasMax] : [0, 0];
  const corHorasHoje = corPorComparacao(horasHoje, idealSol, 'entre');

  // prepara lista de últimos dias (máx. 7)
  const ultimosDias = useMemo(() => {
    const entries = Object.entries(horasPorDia).sort((a,b) => a[0].localeCompare(b[0]));
    return entries.slice(-7);
  }, [horasPorDia]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0A2E36" />
          <Text style={styles.note}>Carregando dados…</Text>
        </View>
      ) : !dispositivoAtual ? (
        <View style={styles.center}>
          <Text style={styles.note}>Nenhum dispositivo selecionado.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{deviceNameParam || dispositivoAtual.nome}</Text>

          {/* ---- Resumo e requisitos da planta ---- */}
          {plantaRecomendada && (
            <>
              <Text style={styles.label}>🌿 Planta: {dispositivoAtual.planta || plantaParam}</Text>
              <Text style={styles.label}>💧 Umidade atual: <Text style={{ fontWeight: '700' }}>{dispositivoAtual.umidade ?? '-'}%</Text></Text>
              <Text style={styles.label}>🌡 Temperatura atual: <Text style={{ fontWeight: '700' }}>{dispositivoAtual.temperatura ?? '-'}°C</Text></Text>
              <Text style={styles.label}>☀️ Sol necessário por dia: <Text style={{ fontWeight: '700' }}>{idealSol[0]}–{idealSol[1]} h</Text></Text>

              {/* Indicador de sol direto HOJE */}
              <Text style={styles.label}>🕒 Sol direto hoje:
                <Text style={{ fontWeight: '800', color: corHorasHoje }}>
                  {' '}{horasHoje.toFixed(2)} h
                </Text>
                <Text style={{ color: '#555' }}>
                  {'  '}(limiar {SUN_DIRECT_THRESHOLD} ADC)
                </Text>
              </Text>
            </>
          )}

          {/* --------- Gráfico: Temperatura --------- */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Temperatura (°C)</Text>
            {historico.length === 0 ? (
              <Text style={styles.note}>Sem histórico para exibir.</Text>
            ) : (
              <LineChart
                data={{
                  labels,
                  datasets: [{ data: serieTemperatura, color: (o=1) => `rgba(10,46,54,${o})` }],
                  legend: ['Temperatura (°C)'],
                }}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                formatYLabel={(v) => Number(v).toFixed(1)}
              />
            )}
          </View>

          {/* --------- Gráfico: Luminosidade (ADC) --------- */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Luminosidade</Text>
            {historico.length === 0 ? (
              <Text style={styles.note}>Sem histórico para exibir.</Text>
            ) : (
              <LineChart
                data={{
                  labels,
                  datasets: [
                    { data: serieLuminosidadeRAW, color: (o=1) => `rgba(10,46,54,${o})` },
                    { data: serieLimiteSolDireto, color: (o=1) => `rgba(176,0,32,${o})` } // linha limite
                  ],
                  legend: ['Luminosidade', 'Limite Sol Direto'],
                }}
                width={screenWidth * 0.9}
                height={240}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                yAxisSuffix=""
                fromZero
              />
            )}
            <Text style={styles.recoNote}>
              Interpretação: valores acima de {SUN_DIRECT_THRESHOLD} sugerem luz solar direta.
            </Text>
          </View>

          {/* --------- Resumo dos últimos dias: horas de sol direto --------- */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Horas de sol direto — últimos dias</Text>
            {ultimosDias.length === 0 ? (
              <Text style={styles.note}>Sem dados para calcular.</Text>
            ) : (
              ultimosDias.map(([dia, horas]) => (
                <Text key={dia} style={styles.dayRow}>
                  {dia} → <Text style={{fontWeight:'700'}}>{horas.toFixed(2)} h</Text>
                </Text>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5EC36E' },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 32,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#0A2E36', marginBottom: 8 },
  label: { fontSize: 16, color: '#0A2E36', fontWeight: '600', marginTop: 8 },
  note: { fontSize: 14, color: '#333', marginTop: 8, textAlign: 'center' },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 6,
    width: screenWidth * 0.94,
    alignItems: 'center',
  },
  chartTitle: { fontSize: 16, fontWeight: '700', color: '#0A2E36', marginBottom: 6 },
  chart: { borderRadius: 12 },
  recoNote: { marginTop: 6, fontSize: 12, color: '#555', textAlign: 'center' },
  dayRow: { fontSize: 14, color: '#0A2E36', marginTop: 4 },
});
