import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore, isAfter, addDays, isWithinInterval } from 'date-fns';
import styled from 'styled-components';
import AddEventButton from '../components/ButtonPrimary';
import EventsSection from '../components/EventsSection';
import EventModal from '../components/EventModal';


// Styles globaux avec styled-components
const GlobalStyles = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    const now = new Date();
    now.setHours(now.getHours() + 2, 0, 0, 0); // Ajoute 2 heures et met les minutes à 0

    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: format(now, 'yyyy-MM-dd'),
      time: format(now, 'HH:mm') // Définit l'heure à l'heure actuelle + 2 heures
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
          {upcomingWeekEvents.length > 0 && (
            <EventsSection
              events={upcomingWeekEvents}
              colorTheme="nextDays"
              title="Les 7 prochains jours"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {futureEvents.length > 0 && (
            <EventsSection
              events={futureEvents}
              colorTheme="futureDays"
              title="Événements à venir"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {pastEvents.length > 0 && (
            <EventsSection
              events={pastEvents}
              colorTheme="pastDays"
              title="Événements passés"
              emptyMessage="Aucun événement passé."
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {events.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#fff', border: '1px solid #fff5', padding: '20px', borderRadius: '5px' }}>
              Aucun événement pour le moment. Vous pouvez ajouter des événements futurs avec des dates et heures, et ils s'afficheront ici.
            </p>
          )}
        </EventsContainer>

        {/* Modal pour ajouter/modifier un événement */}
        <EventModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          newEvent={newEvent}
          editingEvent={editingEvent}
        />
      </AppContainer>
    </GlobalStyles>
  );
}

export default Upcoming;