// SoilSense - ESP32 (com hora da leitura + deep sleep + JSON)
// Mantém variáveis originais do seu código

#include <Arduino.h>
#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <time.h>

// ---------- Config WiFi / Hora ----------
const char* WIFI_SSID = "CLARO_2GEABD70";
const char* WIFI_PASS = "B8EABD70";
const char* NTP_SERVER = "pool.ntp.org";

// São Paulo (sem horário de verão atualmente)
const long   GMT_OFFSET_SEC      = -3 * 3600;  // -03:00
const int    DAYLIGHT_OFFSET_SEC = 0;

// Intervalo entre leituras (deep sleep)
const uint64_t SLEEP_SECONDS = 60;  // ajuste aqui
#define uS_TO_S_FACTOR 1000000ULL

// ---------- Pinos (iguais ao seu código) ----------
const int sensor_ldr = 34;           // Pino analógico
const int sensor_umidade = 32;       // Pino analógico
const int sensor_temperatura = 4;    // Pino digital para DS18B20

// ---------- OneWire e sensor de temperatura (nomes originais) ----------
OneWire oneWire(sensor_temperatura);
DallasTemperature sensor_t(&oneWire);
DeviceAddress endereco_temp;

// ---------- Variáveis originais ----------
int valorUmidade, valorLuz, luz, umidade;

// ---------- Utilitário ----------
int clampInt(int v, int lo, int hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

bool wifiConecta(uint32_t timeout_ms = 15000) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  uint32_t t0 = millis();
  while (WiFi.status() != WL_CONNECTED && (millis() - t0) < timeout_ms) {
    delay(200);
  }
  return WiFi.status() == WL_CONNECTED;
}

bool sincronizaHora() {
  // Configura fuso e NTP
  configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);
  // Tenta obter hora válida
  struct tm timeinfo;
  for (int i = 0; i < 20; i++) { // ~20 tentativas (~2s)
    if (getLocalTime(&timeinfo)) {
      return true;
    }
    delay(100);
  }
  return false;
}

String agoraISO8601() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    // fallback: millis() se não tiver hora
    return String("1970-01-01T00:00:00-03:00");
  }
  char buf[40];
  // ISO-8601 local com offset -03:00
  strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%S-03:00", &timeinfo);
  return String(buf);
}

// ---------- Setup ----------
void setup() {
  Serial.begin(115200);
  // Pequena espera para estabilizar a USB/Serial após acordar
  delay(200);

  sensor_t.begin();
  analogReadResolution(12); // ESP32: 0~4095
  analogSetAttenuation(ADC_11db);

  pinMode(sensor_umidade, INPUT);
  pinMode(sensor_ldr, INPUT);

  // Tenta obter endereço do DS18B20 (primeiro da linha OneWire)
  if (!sensor_t.getAddress(endereco_temp, 0)) {
    // Não imprime texto solto para não sujar o JSON; apenas seguimos e reportamos null
  }

  // --- Conecta WiFi e acerta a hora ---
  bool wifi_ok = wifiConecta();
  if (wifi_ok) {
    sincronizaHora();
    // WiFi pode ser desligado para economizar (hora já ficou no RTC)
    WiFi.disconnect(true, true); // true,true: apaga credenciais da sessão e desliga rádio
    WiFi.mode(WIFI_OFF);
    btStop(); // garante BLE/Bluetooth off
  }
}

// ---------- Loop: faz 1 leitura, imprime JSON e dorme ----------
void loop() {
  // Leitura dos sensores
  valorUmidade = analogRead(sensor_umidade);
  valorLuz     = analogRead(sensor_ldr);
  luz          = valorLuz; // mantém a variável 'luz' do código original

  // DS18B20
  sensor_t.requestTemperatures();
  bool temp_disponivel = sensor_t.getAddress(endereco_temp, 0);
  float tempC = NAN;
  if (temp_disponivel) {
    tempC = sensor_t.getTempC(endereco_temp);
    if (tempC == DEVICE_DISCONNECTED_C) {
      tempC = NAN;
    }
  }

  // Mapeamento de umidade (igual ao seu, com clamp 0..100)
  umidade = map(valorUmidade, 764, 884, 100, 0);
  umidade = clampInt(umidade, 0, 100);

  // Hora local (ISO-8601)
  String horaISO = agoraISO8601();

  // ====== Saída JSON (uma linha por amostra) ======
  // Mantemos nomes de variáveis de base, e publicamos campos autoexplicativos
  // Use JSONL/NDJSON no PC (um JSON por linha).
  Serial.print('{');
  Serial.print("\"hora\":\"");             Serial.print(horaISO);             Serial.print("\",");
  Serial.print("\"umidade_pct\":");        Serial.print(umidade);             Serial.print(",");
  Serial.print("\"valorUmidade\":");       Serial.print(valorUmidade);        Serial.print(",");
  Serial.print("\"valorLuz\":");           Serial.print(valorLuz);            Serial.print(",");
  Serial.print("\"luz\":");                Serial.print(luz);                 Serial.print(",");
  Serial.print("\"temperatura_c\":");      if (isnan(tempC)) Serial.print("null"); else Serial.print(tempC, 2);
  Serial.print(",");
  Serial.print("\"millis\":");             Serial.print(millis());
  Serial.println('}');

  // --- Entra em deep sleep para "desligar" até a próxima leitura ---
  // Timer wakeup
  esp_sleep_enable_timer_wakeup(SLEEP_SECONDS * uS_TO_S_FACTOR);

  // Opcional: reduzir consumo antes de dormir
  //adc_power_off();   // desliga ADC
  // gpio_deep_sleep_hold_en(); // se quiser manter estados de pinos

  // Pequeno flush para garantir envio do JSON pela USB/Serial
  Serial.flush();
  delay(50);

  esp_deep_sleep_start();

  // nunca chega aqui
}
