import React ,{useState,useEffect}from 'react';
import { Grid, Paper, Typography, TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { getAuthToken } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';

const Task = () => {
    const navigate = useNavigate();
    if (!getAuthToken()) {
        navigate("/login");
      }
      const headers = {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      };

    const [newTask, setnewTask] = useState({
        name: '',
        initialDate: new Date(),
        finalDate: new Date(),
        project: {id:0,name:''},
        priority: '',
        status: '',
        dev: {id:0,name:''},
        manager: {id:0,name:''},
    });
    const [projects, setProjects] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState({});
    const [statusOptions, setStatusOptions] = useState({});
useEffect(() => {
    axios.post('https://localhost:7153/api/ProjectTasks/getProjectTaskOptions', null, { headers })
    .then((response) => {
        setProjects(response.data.projectList);
        setParticipants(response.data.users);
        setPriorityOptions(response.data.priorityList);
        setStatusOptions(response.data.statusList);
    })
    .catch((error) => {
        console.error('Error fetching data', error);
    });

}, []);

    const handleProjectChange = (event) => {
        setnewTask({ ...newTask, project:projects.find(p=>p.id == event.target.value)});
    };

    const handleDevChange = (event) => {
        setnewTask({ ...newTask, dev: participants.find(p=>p.id == event.target.value)});
    };

    const handleManagerChange = (event) => {
        setnewTask({ ...newTask, manager: participants.find(p=>p.id == event.target.value)});
    };

    const handlePriorityChange = (event) => {
        setnewTask({ ...newTask, priority: event.target.value });
    };
    
    const handleStatusChange = (event) => {
        setnewTask({ ...newTask, status: event.target.value });
    };
    
    const handleInitialDateChange = (event) => {
        setnewTask({ ...newTask, initialDate: event.target.value });
    };
    
    const handleFinalDateChange = (event) => {
        setnewTask({ ...newTask, finalDate: event.target.value });
    };

    const handleTaskSave = async () => {
        try {
          await axios.post(
            `https://localhost:7153/api/ProjectTasks/saveTask?idDev=${newTask.dev.id}&idManager=${newTask.manager.id}`,
            newTask,
            { headers }
          );
          setnewTask({ });
          navigate("/tareas");
        } catch (error) {
          console.error("Error saving task:", error);
        }
      };
    return (
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5">Task Form</Typography>
        
        <TextField
          label="Descripcion"
          value={newTask.name}
          onChange={(e) =>
            setnewTask({ ...newTask, name: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha de Creacion"
          type="date"
          value={newTask.initialDate}
          onChange={handleInitialDateChange}
          
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha Vencimiento"
          type="date"
          value={newTask.finalDate}
          onChange={handleFinalDateChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Proyecto"
          select
          value={newTask.project.id}
          onChange={handleProjectChange}
          fullWidth
          margin="normal"
        >
          {projects.map((projectKey) => (
            <MenuItem key={projectKey.id} value={projectKey.id}>
              {projectKey.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Prioridad"
          select
          value={newTask.priority}
          onChange={handlePriorityChange}
          fullWidth
          margin="normal"
        >
          {Object.keys(priorityOptions).map((priorityKey) => (
            <MenuItem key={priorityKey} value={priorityKey}>
              {priorityKey}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Estado"
          select
          value={newTask.status}
          onChange={handleStatusChange}
          fullWidth
          margin="normal"
        >
          {Object.keys(statusOptions).map((statusKey) => (
            <MenuItem key={statusKey} value={statusKey}>
              {statusKey}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Desarrollador"
          select
          value={newTask.dev.id}
          onChange={handleDevChange}
          fullWidth
          margin="normal"
        >
          {participants.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Manager"
          select
          value={newTask.manager.id}
          onChange={handleManagerChange}
          fullWidth
          margin="normal"
        >
          {participants.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTaskSave}
        >
          Guardar
        </Button>
        
        
    
  </Paper>
</Grid>
    );
}
export default Task;