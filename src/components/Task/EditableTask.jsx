import React, { useState } from 'react';
import { Task, DeleteButton, EditForm, EditInput, EditTextarea, ButtonGroup, Button, TaskContent, TaskText } from './todayTask.styles';
import TaskIcon from './TaskIcon.jsx';


const EditableTask = ({ 
  task,
  isEditing,
  onSave,
  onCancel,
  onDelete,
  provided,
  snapshot
}) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title: editedTitle,
      description: editedDescription
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  if (isEditing) {
    return (
      <Task
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        status={task.status}
      >
        <DeleteButton onClick={handleDeleteClick} type="button" />
        <EditForm onSubmit={handleSubmit}>
          <EditInput
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Titre de la tâche"
            required
            autoFocus
          />
          <EditTextarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
          <ButtonGroup>
            <Button type="submit">Enregistrer</Button>
            <Button type="button" variant="cancel" onClick={onCancel}>
              Annuler
            </Button>
          </ButtonGroup>
        </EditForm>
      </Task>
    );
  }

  return (
    <Task
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragging={snapshot.isDragging}
      status={task.status}
    >
      <DeleteButton onClick={handleDeleteClick} type="button" />
      <TaskContent>
        <TaskIcon title={task.title} />
        <TaskText>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </TaskText>
      </TaskContent>
    </Task>
  );
};

export default EditableTask;