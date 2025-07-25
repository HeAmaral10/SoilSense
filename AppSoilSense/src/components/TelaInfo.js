import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TelaInfo({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/logo-soilsense.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* Card com texto */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre o SoilSense</Text>
          <Text style={styles.cardText}>
            O aplicativo SoilSense é uma extensão prática e intuitiva do nosso sistema inteligente de monitoramento ambiental voltado para hortas e pequenas plantações. Criado para apoiar pequenos produtores, agricultores urbanos e amantes do cultivo doméstico, o app permite o acompanhamento em tempo real de variáveis essenciais para o desenvolvimento das plantas, como umidade do solo, temperatura e luminosidade.

Por meio da tecnologia IoT (Internet das Coisas), sensores conectados a uma placa Arduino realizam medições constantes, que são transmitidas para a nuvem via Wi-Fi. O app organiza essas informações de forma acessível e visual, ajudando você a tomar decisões mais conscientes sobre irrigação e cuidados com a horta.

Com o SoilSense, você tem:

Monitoramento ambiental em tempo real direto no celular;

Redução de até 30% no uso de água, graças ao controle inteligente da irrigação;

Informações organizadas em gráficos e alertas personalizáveis;

Um aliado para práticas agrícolas mais eficientes, sustentáveis e acessíveis.

Nosso objetivo é democratizar a agricultura de precisão, oferecendo uma ferramenta de baixo custo, fácil uso e alto impacto social, ambiental e econômico. O SoilSense está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS 2 e ODS 11), incentivando a autonomia alimentar, a sustentabilidade urbana e a valorização da agricultura em pequena escala.
          </Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaGraficos')}>
          <Image
            source={require('../assets/graficos.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaDispositivo')}>
          <Image
            source={require('../assets/logo-soilsense.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPrincipal')}>
          <Image
            source={require('../assets/casa.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <Image
            source={require('../assets/perfil.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaInfo')}>
          <Image
            source={require('../assets/info.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5EC36E',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
    opacity: 0.3,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0A2E36',
  },
  cardText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2E36',
    paddingVertical: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
});
