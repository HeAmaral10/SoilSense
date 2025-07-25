import React from 'react';
import styled from 'styled-components';
import logoSoilSense from '../assets/logo-soilsense.png';

export default function TelaPerfil() {
  return (
    <Container>
      <MainContent>
        <LeftSide>
          <Logo src={logoSoilSense} alt="Logo do projeto SoilSense" />
        </LeftSide>

        <RightSide>
          <Card>
            <h2>Seu Perfil</h2>
            <p>Gerencie suas informações pessoais e preferências.</p>
            <ProfileDetails>
              <FormGroup>
                <label htmlFor="nome">Nome</label>
                <input id="nome" type="text" placeholder="Seu nome" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="seuemail@email.com" />
              </FormGroup>

              <SaveButton>Salvar Alterações</SaveButton>
            </ProfileDetails>
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
  width: 280px;
  max-width: 90%;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: #0A2E36;
    font-size: 28px;
    margin-bottom: 16px;
  }

  p {
    color: #555;
    margin-bottom: 24px;
    font-size: 16px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    margin-bottom: 8px;
    font-weight: 600;
    color: #0A2E36;
  }

  input {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
`;

const SaveButton = styled.button`
  background: #0A2E36;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #09414d;
  }
`;
