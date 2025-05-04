import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import EventCardComponent from './EventCardComponent';
import { colorThemes } from '../theme'; // Import des thèmes

const SectionContainer = styled.section`
    && {
        padding: 20px;
        margin-bottom: 10px;
        background: linear-gradient(180deg, rgba(255, 255, 240, 0.2) 10.25%, rgba(255, 255, 240, 0.04) 96.75%);
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

const SectionTitle = styled.h2`
    && {
        margin-bottom: 20px;
        border-bottom: 2px solid ${(props) => props.theme.titleColor};
        padding-bottom: 10px;
        color: ${(props) => props.theme.titleColor};
    }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  grid-auto-flow: row;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;




const EventsSection = ({ events, title, colorTheme, onEdit, onDelete }) => {

  const theme = colorThemes[colorTheme]; // Récupérer les styles du thème

  return (
    <ThemeProvider  theme={theme}>
        <SectionContainer>
            <SectionTitle >{title}</SectionTitle>
            <EventsGrid>
                {
                events.map((event) => (
                    <EventCardComponent
                    key={event.id}
                    event={event}
                    colorTheme={colorTheme} // Transmettre le thème à EventCardComponent
                    onEdit={onEdit}
                    onDelete={onDelete}
                    />
                ))}

            </EventsGrid>
        </SectionContainer>
    </ThemeProvider>
  );
};

export default EventsSection;