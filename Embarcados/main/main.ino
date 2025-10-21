// SoilSense - ESP32

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pinos
const int sensor_ldr = 34;           // Pino analógico
const int sensor_umidade = 32;       // Pino analógico
const int sensor_temperatura = 4;    // Pino digital para DS18B20

// OneWire e sensor de temperatura
OneWire oneWire(sensor_temperatura);
DallasTemperature sensor_t(&oneWire);
DeviceAddress endereco_temp;

int valorUmidade, valorLuz, luz, umidade;

void setup() {
  Serial.begin(115200);  // ESP32 geralmente usa 115200 como padrão
  sensor_t.begin();

  analogReadResolution(12); // ESP32 retorna 0~4095 por padrão
  analogSetAttenuation(ADC_11db); // Opcional, ajusta a faixa de leitura

  pinMode(sensor_umidade, INPUT);
  pinMode(sensor_ldr, INPUT);

  // Verificar se o sensor de temperatura está conectado
  if (!sensor_t.getAddress(endereco_temp, 0)) {
    Serial.println("Sensor de temperatura não encontrado.");
  }
}

void loop() {
  // Leitura dos sensores
  valorUmidade = analogRead(sensor_umidade);
  valorLuz = analogRead(sensor_ldr);
  sensor_t.requestTemperatures();

  // Mapeamento das leituras
  umidade = map(valorUmidade, 764, 884, 100, 0); // Ajuste conforme seu sensor

  // Exibição
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("% | Lux: ");
  Serial.print(valorLuz);
  Serial.print(" | ");

  if (!sensor_t.getAddress(endereco_temp, 0)) {
    Serial.println("Sensor de temperatura não conectado.");
  } else {
    Serial.print("Temperatura: ");
    Serial.print(sensor_t.getTempC(endereco_temp));
    Serial.print(" ");
    Serial.write(176); // Símbolo de grau (°)
    Serial.println("C");
  }

  delay(1000); // Espera 1 segundo
}