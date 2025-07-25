import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaPrincipal() {
  const navigate = useNavigate();

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
          <h2>🌱 Bem-vindo ao SoilSense</h2>
          <p>
            O SoilSense ajuda você a monitorar suas plantações de forma prática,
            sustentável e inteligente. Tenha dados do solo em tempo real para tomar
            as melhores decisões!
          </p>
          <Buttons>
            <ButtonPrimary onClick={() => navigate('/cadastro')}>Cadastrar-se</ButtonPrimary>
            <ButtonSecondary onClick={() => navigate('/login')}>Entrar</ButtonSecondary>
          </Buttons>
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

/* MAIN CONTENT */
const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 40px 20px;
  text-align: center;
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
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;

  h2 {
    color: #0A2E36;
    margin-bottom: 16px;
  }

  p {
    color: #555;
    margin-bottom: 32px;
    line-height: 1.5;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonPrimary = styled.button`
  background: #0A2E36;
  color: #fff;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #09414d;
  }
`;

const ButtonSecondary = styled.button`
  background: transparent;
  color: #0A2E36;
  border: 2px solid #0A2E36;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0A2E36;
    color: #fff;
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
