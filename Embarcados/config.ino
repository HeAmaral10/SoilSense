#include <ESP8266WiFi.h>           // Biblioteca para conexão Wi-Fi
#include <MySQL_Connection.h>      // Biblioteca para conexão com banco MySQL
#include <MySQL_Cursor.h>          // Biblioteca para execução de comandos SQL

IPAddress server_addr(54, 39, 75, 7); // IP do servidor MySQL (ex: Clever Cloud)

char user[] = "ulxp3ul2oh31ynyd";           // Nome de usuário do MySQL
char password[] = "RY0DtqgCN2nt9XrMnHWC";   // Senha do MySQL

char ssid[] = ">SEU USUARIO WIFI<";        // Nome da rede Wi-Fi
char pass[] = ">SENHA_WIFI<";              // Senha da rede Wi-Fi

// Comando SQL base: insere dados na tabela 'Temperatura' com ID e valor
char INSERT_DATA[] = "INSERT INTO bvswq5ixvqbanoflaadl.Temperatura (ID_SENSOR, Temperatura) VALUES (%d,%s)";

WiFiClient client;                  // Cliente Wi-Fi
MySQL_Connection conn(&client);    // Objeto de conexão MySQL
MySQL_Cursor* cursor;              // Cursor para executar comandos SQL

void setup() {
  Serial.begin(9600);      // Inicializa comunicação serial
  VerificaWiFi();          // Verifica e conecta ao Wi-Fi
}

void loop() {
  int id;                  // ID do sensor
  float temp;              // Valor da temperatura

  AguardaDados();          // Espera receber dados via Serial
  Leitura(&id, &temp);     // Lê os dados recebidos
  delay(100);              // Pequeno atraso
  EnviaDados(id, temp);    // Envia os dados ao MySQL
  Serial.println();        // Linha em branco para separação
}

// Aguarda até receber dados via Serial
void AguardaDados() {
  while (!(Serial.available() > 0)) {}
}

// Lê mensagem no formato "ID|TEMPERATURA\n" e separa os valores
void Leitura(int *id, float *temp) {
  char mensagem[20];       // Armazena mensagem recebida
  byte atual, i = 0;
  atual = 255;

  if (Serial.available() > 0) {
    while (atual != 10) {  // Continua até encontrar '\n'
      if (Serial.available() > 0) {
        atual = Serial.read();        // Lê byte
        mensagem[i] = (char)atual;    // Armazena caractere
        i++;
      }
    }
    i = 0;
    *id = atoi(strtok(mensagem, "|"));      // Converte primeira parte para inteiro
    *temp = atof(strtok(NULL, "|"));        // Converte segunda parte para float
  }
}

// Envia dados (ID e temperatura) para o banco MySQL
void EnviaDados(int id, float temp) {
  char query[128];          // Armazena a query SQL final
  char temperatura[10];     // Temperatura formatada como string

  VerificaWiFi();           // Garante conexão Wi-Fi

  if (conn.connect(server_addr, 3306, user, password)) {
    delay(1000);
    MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);

    dtostrf(temp, 1, 1, temperatura);             // Converte float para string
    sprintf(query, INSERT_DATA, id, temperatura); // Preenche query com dados

    cur_mem->execute(query);                     // Executa query no banco
    delete cur_mem;                              // Libera memória

    Serial.println(); 
    Serial.println("Data recorded.");            // Confirmação no Serial
  } else {
    Serial.println(); 
    Serial.println("Connection failed.");        // Erro de conexão
  }

  conn.close();  // Fecha a conexão com o banco
}

// Verifica e conecta ao Wi-Fi, se ainda não estiver conectado
void VerificaWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.disconnect();        // Desconecta de redes anteriores
    delay(1000);
    WiFi.begin(ssid, pass);   // Inicia conexão com as credenciais

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);             // Aguarda conexão
    }
  }
}
