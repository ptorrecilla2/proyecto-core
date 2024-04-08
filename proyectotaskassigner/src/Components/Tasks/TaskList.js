import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../Services/AuthService';

function TaskList({ tasks }) {
  const role = getRole();
  const navigate = useNavigate();

  const groupTasksByStatus = () => {
    const groupedTasks = {};
    tasks.forEach(task => {
      if (!groupedTasks[task.status]) {
        groupedTasks[task.status] = [];
      }
      groupedTasks[task.status].push(task);
    });
    return groupedTasks;
  };

  const renderTasksByStatus = () => {
    const groupedTasks = groupTasksByStatus();
    const statusList = Object.keys(groupedTasks);

    return statusList.map(status => (
      <Accordion key={status}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{status}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {groupedTasks[status].map(task => (
              <div key={task.id}>
                <Typography onClick={() => navigate('/tareas/' + task.id)}>{task.name}</Typography>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <div>
      {role === 'Admin' && (
        <Button variant="contained" color="primary" onClick={() => navigate('/tareas/create')}>
          Crear Tarea
        </Button>
      )}
      {renderTasksByStatus()}
    </div>
  );
}

export default TaskList;
