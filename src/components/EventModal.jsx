import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  color: #fff;
  background:linear-gradient(to bottom, #E05DF2, #5959C1);
  border: 1px solid #6C6A6D;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;

  h2 {font-size:20px; color: #fff; text-align: center;}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #fff;
`;

const FormGroup = styled.div`
    && {
        margin-bottom: 20px;
    }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #fff;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 6px;
`;

const FormTextarea = styled.textarea`
  background-color: #fff; 
  width: 100%;
  padding: 8px;
  border: 1px solid #fff;
  min-height: 80px;
  border-radius: 6px;
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
  background-color: #00c68eab;
  width: 100%;
  color: #fff;
  border: none;
  padding: 8px 14px;
  margin-top: 20px;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background: #47c600;
    color:  white;
    
  }
`;

const EventModal = ({
  showModal,
  onClose,
  onSubmit,
  onInputChange,
  newEvent,
  editingEvent,
}) => {
  if (!showModal) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>{editingEvent ? "Modifier l'événement" : "Ajouter un événement"}</h2>
        <CloseButton onClick={onClose}>×</CloseButton>

        <form onSubmit={onSubmit}>
          <FormGroup>
            <FormLabel>Titre</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={newEvent.title}
              onChange={onInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea
              name="description"
              value={newEvent.description}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <FormLabel>Date</FormLabel>
              <FormInput
                type="date"
                name="date"
                value={newEvent.date}
                onChange={onInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Heure</FormLabel>
              <FormInput
                type="time"
                name="time"
                value={newEvent.time}
                onChange={onInputChange}
                required
              />
            </FormGroup>
          </FormRow>

          <SubmitButton type="submit">
            {editingEvent ? "Mettre à jour" : "Ajouter"}
          </SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EventModal;