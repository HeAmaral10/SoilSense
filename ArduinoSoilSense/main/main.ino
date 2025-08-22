// SoilSense

#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>

int sensor_ldr = 0;
int sensor_umidade = 1;
int sensor_temperatura = 2;
OneWire oneWire(sensor_temperatura);
DallasTemperature sensor_t(&oneWire);
DeviceAddress endereco_temp;
int valorUmidade, valorLuz, valorTemperatura, umidade, luz;
float temperatura;

void setup()
{
  Serial.begin(9600);
  sensor_t.begin();
}

void loop()
{
  /*sensor_t.requestTemperatures();
  if(!sensor_t.getAddress(endereco_temp, 0)) {
    Serial.println("Sensor não conectado");
  } else {
    Serial.print("Temperatura: ");
    Serial.print(sensor_t.getTempC(endereco_temp, 1));
  }*/

  valorUmidade = analogRead(sensor_umidade);
  valorLuz = analogRead(sensor_ldr);
  sensor_t.requestTemperatures();
  umidade = map(valorUmidade, 0, 1023, 100, 0);
  temperatura = (valorTemperatura * 5.0 * 100.0) / 1024.0;
  luz = map(valorLuz,54, 974, 100, 0);
  
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("% | Lux: ");
  Serial.print(luz);
  Serial.print(" lx | Temperatura: ");
  Serial.print(sensor_t.getTempC(endereco_temp, 1));
  Serial.print(" ");
  Serial.write(176);
  Serial.println("C");

  delay(1000);

}