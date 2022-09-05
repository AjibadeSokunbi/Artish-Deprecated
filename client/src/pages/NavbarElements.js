import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`

  height: 80px;
  display: flex;
  justify-content: space-around;
  color: #000
  z-index: 10;

`;

export const NavLink = styled(Link)`
   color: #000
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.9rem;
  height: 70%;

  cursor: pointer;
  &.active {
    background: -webkit-linear-gradient(rgb(55, 120, 204), #f8b9d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media screen and (max-width:900px) {
    padding: 0 0.5rem;
}

`;

export const Bars = styled(FaBars)`
  display: none;
  color: #000;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;



`;


