import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaGraficos() {
  return (
    <Container>
      <Header />

      <MainContent>
        <LogoOverlay src={logoSoilSense} alt='SoilSense' />
        <Card>
          <h2>Sobre o SoilSense</h2>
          <p>
            O SoilSense é uma solução inteligente para monitoramento do solo,
            auxiliando produtores na tomada de decisões precisas.
          </p>
        </Card>
      </MainContent>

      <NavBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #5EC36E;
  justify-content: space-between;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoOverlay = styled.img`
  width: 200px;
  opacity: 0.2;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;

  h2 {
    color: #0A2E36;
    margin-bottom: 12px;
  }

  p {
    color: #333;
    font-size: 16px;
  }
`;
