import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { FaCalendarAlt, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { colorThemes } from '../theme'; // Import des thèmes

const EventCard = styled.div`
  border: 1px solid #cbdff2;
  border-left: 5px solid ${(props) => props.theme.borderLeftColor};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: ${(props) => props.theme.backgroundColor};
  color: black;

  &:hover {
  }
`;

const CardHeader = styled.div`
    && {
        padding: 8px 15px;
        position: relative;
        border-bottom: 1px solid #ddd;
        background-color: ${(props) => props.theme.cardHeader};
    }
`;

const CardDate = styled.h3`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: ${(props) => props.theme.cardHeaderText};
    margin-left: 5px;
  }
`;

const CardMenu = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 5px;
  color: #000;
  position: relative;
  top: -5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px; 
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h4`
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
`;

const EventCardComponent = ({ event, colorTheme, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = colorThemes[colorTheme]; // Récupérer les styles du thème

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(event);
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(event.id);
    setShowMenu(false);
  };

  return (
    <ThemeProvider theme={theme}>
        <EventCard>
            <CardHeader>
                <CardDate>
                    <div>
                        <FaCalendarAlt style={{ color: theme.iconColor, fontSize: '12px' }} />
                        <span>
                            {format(new Date(event.dateTime), 'EEE d MMM yyyy', { locale: fr })}
                        </span>
                        
                    </div>
                    <div>
                        <FaClock style={{ color: theme.iconColor, fontSize: '12px' }} />
                        <span>
                            {format(new Date(event.dateTime), 'HH:mm', { locale: fr })}
                        </span>  
                    </div>
                </CardDate>
                <CardMenu>
                <MenuButton onClick={toggleMenu}>⋮</MenuButton>
                {showMenu && (
                    <DropdownMenu>
                    <DropdownButton onClick={handleEdit}>
                      <FaEdit style={{ color: '#aaa' }} />
                      Modifier
                    </DropdownButton>
                    <DropdownButton onClick={handleDelete}>
                      <FaTrash style={{ color: '#aaa' }} />
                      Supprimer
                    </DropdownButton>
                  </DropdownMenu>
                )}
                </CardMenu>
            </CardHeader>

            <CardBody>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
            </CardBody>
        </EventCard>
    </ThemeProvider>
  );
};

export default EventCardComponent;