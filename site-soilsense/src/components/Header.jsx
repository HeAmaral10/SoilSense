import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-soilsense.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <LogoArea>
        <LogoImg src={Logo} alt='SoilSense' />
        <Title>SoilSense</Title>
      </LogoArea>
      <NavLinks menuOpen={menuOpen}>
        <StyledLink to='/'>Início</StyledLink>
        <StyledLink to='/perfil'>Perfil</StyledLink>
        <StyledLink to='/info'>Informações</StyledLink>
      </NavLinks>
      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0A2E36;
  padding: 16px 32px;
  color: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(94,195,110,0.15);
  background: #fff;
  object-fit: cover;
`;

const Title = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #5EC36E;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 32px;
  transition: right 0.3s;

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    right: ${({ menuOpen }) => (menuOpen ? '0' : '-220px')};
    height: 100vh;
    width: 200px;
    background: #0A2E36ee;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 24px 24px 24px;
    gap: 24px;
    box-shadow: -2px 0 12px rgba(0,0,0,0.08);
    z-index: 200;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s;

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #5EC36E;
    transition: width 0.3s;
    position: absolute;
    left: 0;
    bottom: -2px;
  }

  &:hover {
    color: #5EC36E;
  }
  &:hover:after {
    width: 100%;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 300;

  span {
    display: block;
    height: 4px;
    width: 100%;
    background: #5EC36E;
    border-radius: 2px;
    transition: 0.3s;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;
