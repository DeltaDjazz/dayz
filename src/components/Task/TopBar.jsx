import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, Link } from '../atoms';
import { FaTrash, FaRedo } from 'react-icons/fa'; // Import des icônes

const Navigation = styled.nav`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    padding: 0 20px;
    gap: 10px;
  }

`;

const ActionLinks = styled.div`
  display: flex;
  @media (max-width: 520px) {
    display: block;
    width: 100%;
    overflow: hidden;
  }
`;

const TopBar = ({ onAddTask, onClearTasks, onResetTasks }) => (
  <Navigation>
    <ButtonPrimary onClick={onAddTask}>+ Ajouter une tâche</ButtonPrimary>
    <ActionLinks>
      <Link onClick={onClearTasks}>
          <FaTrash /> Vider les tâches
      </Link>
      <Link onClick={onResetTasks}>
          <FaRedo /> Tâches par défaut
      </Link>
    </ActionLinks>
  </Navigation>
);

export default TopBar;