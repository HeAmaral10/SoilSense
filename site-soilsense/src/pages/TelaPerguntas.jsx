import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaPerguntas() {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoArea>
            <LogoImg src={logoSoilSense} alt="SoilSense" />
            <Brand>SoilSense</Brand>
          </LogoArea>

          <Options>
            <StyledLink to="/">Página Inicial</StyledLink>
            <StyledLink to="/sobre">Sobre</StyledLink>
            <StyledLink to="/perguntas">Perguntas Frequentes</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </Options>
        </HeaderContent>
      </Header>

      <MainContent>
        <LogoOverlay src={logoSoilSense} alt="SoilSense" />
        <Card>
          <h2>❓ Perguntas Frequentes — SoilSense</h2>

          <h3>📌 O que é o SoilSense?</h3>
          <p>
            O SoilSense é um sistema inteligente de monitoramento ambiental para hortas e pequenas plantações. Ele usa sensores conectados a uma plataforma digital para acompanhar, em tempo real, a umidade do solo, temperatura e luminosidade, ajudando no manejo eficiente da produção.
          </p>

          <h3>🌿 Para quem o SoilSense foi criado?</h3>
          <p>O sistema foi desenvolvido especialmente para:</p>
          <ul>
            <li>Pequenos agricultores e produtores familiares;</li>
            <li>Hortas comunitárias e escolares;</li>
            <li>Projetos urbanos de agricultura sustentável;</li>
            <li>Pessoas que cultivam alimentos em casa.</li>
          </ul>

          <h3>⚙️ Quais tecnologias são utilizadas no projeto?</h3>
          <p>O SoilSense utiliza:</p>
          <ul>
            <li>Placa Arduino Uno R3;</li>
            <li>Sensores de umidade, temperatura e luminosidade;</li>
            <li>Módulo Wi-Fi ESP8266 para envio dos dados;</li>
            <li>Plataforma digital (site + aplicativo) para visualização em tempo real.</li>
          </ul>

          <h3>💧 O sistema realmente ajuda a economizar água?</h3>
          <p>
            Sim! Durante os testes, observamos uma redução de até 30% no consumo de água, graças ao monitoramento preciso da umidade do solo. Isso evita irrigações desnecessárias e melhora a eficiência no uso dos recursos.
          </p>

          <h3>📱 É possível acessar os dados pelo celular?</h3>
          <p>
            Sim! O SoilSense possui aplicativo móvel e site responsivo, onde é possível acompanhar as informações do seu cultivo de qualquer lugar, com acesso à internet.
          </p>

          <h3>🛠️ Preciso ter conhecimento técnico para usar o SoilSense?</h3>
          <p>
            Não. O sistema foi pensado para ser simples, intuitivo e acessível. A instalação é descomplicada, e a interface digital foi desenvolvida para atender desde iniciantes até usuários mais experientes.
          </p>

          <h3>💰 Quanto custa o protótipo?</h3>
          <p>
            O custo estimado do protótipo fica entre R$ 150,00 e R$ 250,00, bem abaixo de soluções comerciais disponíveis no mercado, que geralmente são voltadas para grandes propriedades.
          </p>

          <h3>🔋 O sistema precisa estar sempre ligado na energia?</h3>
          <p>
            O protótipo atual usa alimentação elétrica via cabo USB, mas uma versão futura prevê o uso de painéis solares e baterias recarregáveis, tornando o sistema ainda mais sustentável e autônomo.
          </p>

          <h3>🔄 Posso personalizar o sistema para outras variáveis?</h3>
          <p>
            Sim! O projeto é de código aberto, o que permite adaptações para incluir outros sensores, como pH do solo, qualidade do ar e até análises preditivas com inteligência artificial.
          </p>

          <h3>🌎 O SoilSense contribui com a sustentabilidade?</h3>
          <p>
            Com certeza. O projeto está alinhado aos ODS 2 (Fome Zero e Agricultura Sustentável) e ODS 11 (Cidades e Comunidades Sustentáveis), promovendo o uso racional de recursos, o cultivo urbano e a segurança alimentar.
          </p>
        </Card>
      </MainContent>

      <Footer>
        <FooterContent>
          &copy; {new Date().getFullYear()} SoilSense. Todos os direitos reservados.
        </FooterContent>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #5EC36E;
`;

/* HEADER estilo igual ao Footer */
const Header = styled.header`
  background: #0A2E36;
  color: #fff;
  padding: 16px 32px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  padding: 4px;
`;

const Brand = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: #5EC36E;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &:after {
    content: '';
    display: block;
    height: 2px;
    background: #5EC36E;
    width: 0;
    transition: width 0.3s;
    position: absolute;
    bottom: -4px;
    left: 0;
  }

  &:hover:after {
    width: 100%;
  }
`;


const Options = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;


/* MAIN CONTENT, Card, LogoOverlay... */
const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 40px 20px;
`;

const LogoOverlay = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  opacity: 0.03;
  max-width: 100%;
  pointer-events: none;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
  text-align: left;

  h2 {
    color: #0A2E36;
    margin-bottom: 16px;
  }

  h3 {
    color: #0A2E36;
    margin-top: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #555;
    margin-bottom: 16px;
    line-height: 1.5;
  }

  ul {
    margin-left: 20px;
    margin-bottom: 16px;

    li {
      margin-bottom: 8px;
    }
  }
`;

/* FOOTER igual ao Header */
const Footer = styled.footer`
  background: #0A2E36;
  color: #fff;
  padding: 16px 32px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.9rem;
`;
