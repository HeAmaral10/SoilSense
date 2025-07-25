import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui se quiser
    navigate('/perfil');
  };

  const handleCreateAccount = () => {
    navigate('/cadastro');
  };

  return (
    <Container>
      <MainContent>
        <LeftSide>
          <Logo src={logoSoilSense} alt="SoilSense" />
        </LeftSide>

        <RightSide>
          <Card>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Senha" required />
              <Button type="submit">Entrar</Button>
            </Form>
            <Divider />
            <CreateAccount>
              <span>Ainda não tem conta?</span>
              <CreateButton onClick={handleCreateAccount}>
                Crie sua conta
              </CreateButton>
            </CreateAccount>
          </Card>
        </RightSide>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #5EC36E;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 300px;
  max-width: 100%;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;

  h2 {
    color: #0A2E36;
    font-size: 2rem;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  input {
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: #0A2E36;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #09414d;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 24px 0;
`;

const CreateAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #333;
  font-size: 0.95rem;
`;

const CreateButton = styled.button`
  background: transparent;
  color: #0A2E36;
  border: 2px solid #0A2E36;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0A2E36;
    color: #fff;
  }
`;
