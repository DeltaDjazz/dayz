
import styled from 'styled-components';
import { colors, getColorByStatus, getColorDarkByStatus } from './colors';
export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #ff4444;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right:40px;
`;

export const EditInput = styled.input`
  padding: 8px;
  border: none;
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
  width: 100%;
  &:focus-visible {
     outline: 2px solid #000;
  }
`;

export const EditTextarea = styled.textarea`
  padding: 8px;
  border: none;
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
  width: 100%;
  resize: vertical;
  min-height: 60px;
  &:focus-visible {
     outline: 2px solid #000;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 14px;
  background: ${props => props.variant === 'cancel' ? 'white' : 'black'};
  color: ${props => props.variant === 'cancel' ? '#333' : 'white'};

  &:hover {
    background: ${props => props.variant === 'cancel' ? '#e0e0e0' : '#1906ffaa'};
  }
`;






// Modification du style Task pour gérer le positionnement relatif
export const Task = styled.div`
  position: relative;
  border-radius: 1px;
  padding: 15px;
  margin-bottom: 10px;
  background: ${props => getColorByStatus(props.status)};
  border-top: 4px solid ${props => getColorDarkByStatus(props.status)};;
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0, 0, 0, 0.15)' : '0 2px 3px rgba(0, 0, 0, 0.05)'};
  user-select: none;
  height: ${props => props.status === 'backlog' ? '100%' : 'auto'};
  
  &:hover {
    background-color: ${props => {
      switch (props.status) {
        case 'todo': return colors.yellowLight;
        case 'en cours': return colors.blueLight;
        case 'terminé': return colors.greenLight;
        default: return '#ccc';
      }
    }};
  }

  h3 {
    color: #000;
    font-size: 14px;
    margin: 0 0 8px 0;
    padding-right: 24px; // Espace pour le bouton de suppression
    overflow-wrap: break-word;
  }

  p {
    font-size: 12px;
    margin: 0;
    color: #000;
    overflow-wrap: break-word;
  }
`;

export const TaskContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TaskText = styled.div`
  flex: 1;
`;