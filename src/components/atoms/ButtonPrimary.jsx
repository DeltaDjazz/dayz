import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  margin: 0px;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  position: relative;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    inset: -3px; /* Dépasse légèrement pour créer un contour */
    border-radius: 0.5rem;
    background: linear-gradient(45deg, #00fff7, #ff00f7);
    z-index: -1;
    padding: 3px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  &:hover {
    z-index: 0;
    color: #fff;
    background: #1906ff3b;
  }

  @media (max-width: 520px) {
    display: block;
    width: 100%; /* Prend toute la largeur sur les appareils mobiles */
  }

`;

const ButtonPrimary = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
);

export default ButtonPrimary;