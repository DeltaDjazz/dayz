import { NavLink } from 'react-router-dom';
import styled from 'styled-components';



import React from 'react';
import logoToday from '../assets/img/logo-today.png';
import logoUpcoming from '../assets/img/logo-upcoming.png';

const NavBar = styled.nav`
  display: flex;
  align-items: center; // Centre verticalement les éléments
  justify-content: center; // Centre horizontalement les éléments
  background: #0000004f;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
`;

const LogoTitle = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 40px;
  text-decoration: none;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    background-color:rgba(255, 255, 255, 0.06);
  }
  &.active {
    opacity: 1;
    background-color:rgba(255, 255, 255, 0.14);
  }
`;

function Navigation() {
  return (
    <NavBar>
      <StyledNavLink to="/today-list" end>
        <LogoImg src={logoToday} alt="Today" />
        <LogoTitle>Today-List</LogoTitle>
      </StyledNavLink>
      <StyledNavLink to="/upcoming">
        <LogoImg src={logoUpcoming} alt="Upcoming" />
        <LogoTitle>Upcoming</LogoTitle>
      </StyledNavLink>
    </NavBar>
  );
}

export default Navigation;