// Código SoilSense

#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>

const int SENSOR_UMIDADE = 0;
const int SENSOR_LDR = 1;
const int SENSOR_TEMPERATURA = 2;
OneWire oneWire(SENSOR_TEMPERATURA);
DallasTemperature sensor(&oneWire);
DeviceAddress endereco_temp;
int valorUmidade, valorLuz, valorTemperatura, umidade, luz;
float temperatura;

void setup()
{
  Serial.begin(9600);
  sensor.begin();
}

void loop()
{
  sensor.requestTemperatures();
  if(!sensor.getAddress(endereco_temp, 0)) {
    Serial.println("Sensor não conectado");
  } else {
    Serial.print("Temperatura: ");
    Serial.print(sensor.getTempC(endereco_temp, 1));
  }
  valorUmidade = analogRead(SENSOR_UMIDADE);
  valorLuz = analogRead(SENSOR_LDR);
  valorTemperatura = analogRead(SENSOR_TEMPERATURA);
  umidade = map(valorUmidade, 0, 876, 0, 100);
  temperatura = (valorTemperatura * 5.0 * 100.0) / 1024.0;
  luz = map(valorLuz,54, 974, 100, 0);
  
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("% | Lux: ");
  Serial.print(luz);
  Serial.print(" lx | Temperatura: ");
  Serial.print(temperatura);
  Serial.print(" ");
  Serial.write(176);
  Serial.println("C");

  delay(1000);
}