import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaInfo() {
  return (
    <Container>
      <HeaderContainer>
        <LogoArea>
          <LogoImg src={logoSoilSense} alt='SoilSense' />
          <Brand>SoilSense</Brand>
        </LogoArea>

        <Options>
          <StyledLink to='/'>Página Inicial</StyledLink>
          <StyledLink to='/sobre'>Sobre</StyledLink>
          <StyledLink to='/perguntas'>Perguntas Frequentes</StyledLink>
          <StyledLink to='/login'>Login</StyledLink>
        </Options>
      </HeaderContainer>

      <MainContent>
        <LogoOverlay src={logoSoilSense} alt="SoilSense" />
        <Card>
          <h2>🌱 Sobre o Projeto SoilSense</h2>
          <p>
            O SoilSense é uma solução tecnológica desenvolvida para transformar a maneira como hortas e pequenas plantações são cuidadas. Nosso objetivo é tornar a agricultura mais eficiente, sustentável e acessível, especialmente para pequenos produtores, horteiros urbanos, escolas e comunidades.
          </p>
          <p>
            A partir da integração de sensores com a tecnologia de Internet das Coisas (IoT), o sistema coleta, transmite e apresenta em tempo real dados essenciais do solo e do ambiente — como umidade, temperatura e luminosidade. Essas informações são disponibilizadas por meio de uma plataforma digital intuitiva, acessível via site e aplicativo.
          </p>
          <p>
            Desenvolvido com componentes de baixo custo e código aberto, o SoilSense representa uma alternativa acessível a sistemas comerciais mais caros, democratizando o acesso à agricultura de precisão.
          </p>
          <h3>🌾 Nossos Diferenciais:</h3>
          <ul>
            <li>Monitoramento ambiental em tempo real;</li>
            <li>Acesso remoto via web e app móvel;</li>
            <li>Redução de até 30% no consumo de água;</li>
            <li>Estímulo à agricultura urbana e periurbana;</li>
            <li>Contribuição direta aos ODS 2 e 11.</li>
          </ul>
          <h3>🧪 Como funciona:</h3>
          <p>
            Utilizamos sensores conectados a uma placa Arduino Uno R3 que monitoram as condições do cultivo. Esses dados são enviados automaticamente a um servidor na nuvem por meio de um módulo Wi-Fi ESP8266, permitindo ao usuário acompanhar tudo de forma prática, precisa e eficiente.
          </p>
          <h3>🤝 Para quem é o SoilSense?</h3>
          <p>
            O projeto é ideal para:
          </p>
          <ul>
            <li>Pequenos agricultores e produtores familiares;</li>
            <li>Hortas comunitárias e escolares;</li>
            <li>Iniciativas de agricultura urbana;</li>
            <li>Entusiastas do cultivo doméstico.</li>
          </ul>
          <h3>🌍 Impacto:</h3>
          <p>
            O SoilSense promove sustentabilidade, uso racional dos recursos naturais e autonomia produtiva. Nossa missão é apoiar quem cultiva o futuro com tecnologia simples, eficaz e transformadora.
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

/* HEADER */
const HeaderContainer = styled.header`
  background: #0A2E36;
  color: #fff;
  border-radius: 32px;
  padding: 12px 32px;
  margin: 20px auto;
  max-width: 1200px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const NavLinks = styled.nav`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
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
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Option = styled.span`
  cursor: pointer;
  font-size: 0.95rem;
`;

/* MAIN CONTENT */
const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* <-- centraliza horizontalmente */
  justify-content: center; /* <-- centraliza verticalmente se desejar */
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
  text-align: left;
  position: relative;
  z-index: 2;

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

/* FOOTER */
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
