// Código SoilSense - Monitoramento de umidade, luminosidade e temperatura do solo

#include <Arduino.h>               // Biblioteca principal do Arduino
#include <DallasTemperature.h>     // Biblioteca para leitura do sensor DS18B20 (temperatura digital)
#include <OneWire.h>               // Protocolo de comunicação 1-Wire usado pelo DS18B20

// Definições dos pinos analógicos onde os sensores estão conectados
const int SENSOR_UMIDADE = 0;        // Sensor de umidade do solo no pino A0
const int SENSOR_LDR = 1;            // Sensor de luminosidade (LDR) no pino A1
const int SENSOR_TEMPERATURA = 2;    // Sensor de temperatura analógico ou DS18B20 no pino A2

// Inicialização da comunicação 1-Wire e do sensor DS18B20
OneWire oneWire(SENSOR_TEMPERATURA);         // Objeto para o protocolo 1-Wire
DallasTemperature sensor(&oneWire);          // Objeto do sensor DS18B20 usando OneWire
DeviceAddress endereco_temp;                 // Armazena o endereço do sensor de temperatura

// Variáveis para armazenar valores brutos e processados dos sensores
int valorUmidade, valorLuz, valorTemperatura, umidade, luz;
float temperatura;

void setup()
{
  Serial.begin(9600);        // Inicializa a comunicação serial a 9600 bps
  sensor.begin();            // Inicia o sensor de temperatura DS18B20
}

void loop()
{
  sensor.requestTemperatures();   // Solicita a leitura da temperatura ao sensor DS18B20

  // Verifica se o sensor DS18B20 está conectado corretamente
  if(!sensor.getAddress(endereco_temp, 0)) {
    Serial.println("Sensor não conectado");  // Mensagem de erro se o sensor não for encontrado
  } else {
    Serial.print("Temperatura (DS18B20): ");
    Serial.print(sensor.getTempC(endereco_temp));  // Lê e exibe a temperatura em Celsius
    Serial.println(" °C");
  }

  // Leitura dos sensores analógicos
  valorUmidade = analogRead(SENSOR_UMIDADE);           // Leitura do sensor de umidade (0 a 1023)
  valorLuz = analogRead(SENSOR_LDR);                   // Leitura do sensor de luminosidade (LDR)
  valorTemperatura = analogRead(SENSOR_TEMPERATURA);   // Leitura do sensor de temperatura analógico (LM35)

  // Conversão da umidade bruta para porcentagem (calibrar conforme seu sensor)
  umidade = map(valorUmidade, 0, 876, 0, 100);

  // Conversão da leitura analógica do LM35 para temperatura em Celsius
  temperatura = (valorTemperatura * 5.0 * 100.0) / 1024.0;

  // Conversão da leitura do LDR para uma escala de 100 (claro) a 0 (escuro)
  luz = map(valorLuz, 54, 974, 100, 0);

  // Impressão dos valores no monitor serial
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("% | Lux: ");
  Serial.print(luz);
  Serial.print(" lx | Temperatura (LM35): ");
  Serial.print(temperatura);
  Serial.print(" ");
  Serial.write(176);  // Caractere ° (graus Celsius)
  Serial.println("C");

  delay(1000);  // Aguarda 1 segundo antes da próxima leitura
}
