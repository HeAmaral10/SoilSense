import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import IconCasa from '../assets/casa.png';
import IconGraficos from '../assets/graficos.png';
import IconDispositivo from '../assets/logo-soilsense.png';
import IconPerfil from '../assets/perfil.png';
import IconInfo from '../assets/info.png';

export default function NavBar() {
  const location = useLocation();

  return (
    <NavContainer>
      <StyledLink to='/graficos' $active={location.pathname === '/graficos'}>
        <Icon src={IconGraficos} alt='Gráficos' />
      </StyledLink>
      <StyledLink to='/dispositivo' $active={location.pathname === '/dispositivo'}>
        <Icon src={IconDispositivo} alt='Dispositivo' />
      </StyledLink>
      <StyledLink to='/principal' $active={location.pathname === '/principal'}>
        <Icon src={IconCasa} alt='Principal' />
      </StyledLink>
      <StyledLink to='/perfil' $active={location.pathname === '/perfil'}>
        <Icon src={IconPerfil} alt='Perfil' />
      </StyledLink>
      <StyledLink to='/info' $active={location.pathname === '/info'}>
        <Icon src={IconInfo} alt='Info' />
      </StyledLink>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #0A2E36;
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${({ $active }) => ($active ? 'brightness(1.2)' : 'none')};
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;
