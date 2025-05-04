import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore, isAfter, addDays, isWithinInterval } from 'date-fns';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { fr } from 'date-fns/locale';
import styled from 'styled-components';
import AddEventButton from '../components/ButtonPrimary';
import EventsSection from '../components/EventsSection';

// Styles globaux avec styled-components
const GlobalStyles = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: #f8f9fa;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const AppHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
`;


const EventsContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const EventsSection2 = styled.section`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 10.25%, rgba(255, 255, 255, 0.04) 96.75%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  border-bottom: 2px solid #07ffff;
  padding-bottom: 10px;
  color: #07ffff;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  grid-auto-flow: row; /* Force l'affichage ligne par ligne */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  border: 1px solid #cbdff2;
  border-left: 5px solid #52afe6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  background-color: #f5faff;
  color: black;

  &:hover {
    
  }
`;

const CardHeader = styled.div`
  background-color: #cbdff2;
  padding: 8px 15px;
  position: relative;
  border-bottom: 1px solid #ddd;

  h3{ color: #5c2cdf; }
`;

const CardDate = styled.h3`
  font-size: 14px;
`;

const CardMenu = styled.div`
  position: absolute;
  top: 2px;
  right: 10px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 5px;
  color: #666;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 120px;
`;

const DropdownButton = styled.button`
  display: block;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 80px;
  resize: vertical;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const EmptyMessage = styled.p`
  color: #666;
  font-style: italic;
`;

// Composant principal
function Upcoming() {
  // Charger les événements depuis le localStorage au démarrage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00'
  });

  

  // Sauvegarder les événements dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
    
    if (editingEvent) {
      // Mise à jour de l'événement existant
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id, dateTime: eventDate } : event
      ));
    } else {
      // Création d'un nouvel événement
      const event = {
        ...newEvent,
        id: Date.now(),
        dateTime: eventDate
      };
      setEvents([...events, event]);
    }
    
    setShowModal(false);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00'
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: format(event.dateTime, 'yyyy-MM-dd'),
      time: format(event.dateTime, 'HH:mm')
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const openNewEventModal = () => {
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00'
    });
    setShowModal(true);
  };

  // Catégoriser les événements
  const now = new Date();
  const nextWeek = addDays(now, 7);
  
  const pastEvents = events
    .filter(event => isBefore(event.dateTime, now))
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  
  const upcomingWeekEvents = events
    .filter(event => isWithinInterval(event.dateTime, { start: now, end: nextWeek }))
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  
  const futureEvents = events
    .filter(event => isAfter(event.dateTime, nextWeek))
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <GlobalStyles>
      <AppContainer>
        <AppHeader>
          <AddEventButton onClick={openNewEventModal}>
            + Ajouter un événement
          </AddEventButton>
        </AppHeader>

        <EventsContainer>
          {/* Événements des 7 prochains jours */}
          <EventsSection
            events={upcomingWeekEvents}
            colorTheme="nextDays"
            title="Les 7 prochains jours"
            emptyMessage="Aucun événement prévu cette semaine."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <EventsSection
            events={futureEvents}
            colorTheme="futureDays"
            title="Événements à venir"
            emptyMessage="Aucun événement futur prévu."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <EventsSection
            events={pastEvents}
            colorTheme="pastDays"
            title="Événements passés"
            emptyMessage="Aucun événement passé."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </EventsContainer>

        {/* Modal pour ajouter/modifier un événement */}
        {showModal && (
          <ModalOverlay>
            <ModalContainer>
              <h2>{editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}</h2>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
              
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Titre</FormLabel>
                  <FormInput
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <FormInput
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Heure</FormLabel>
                    <FormInput
                      type="time"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <SubmitButton type="submit">
                  {editingEvent ? 'Mettre à jour' : 'Ajouter'}
                </SubmitButton>
              </form>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AppContainer>
    </GlobalStyles>
  );
}

export default Upcoming;