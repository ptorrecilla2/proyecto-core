import React ,{useState,useEffect}from 'react';
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

    const handleTaskSave = async (e) => {
            e.preventDefault();
            // Create a new object instead of mutating the original one
            const taskToSave = {
                ...newTask,
                initialDate: new Date(newTask.initialDate),
                finalDate: new Date(newTask.finalDate)
            };
    
            axios.post(
                `https://localhost:7153/api/ProjectTasks/saveTask?idDev=${newTask.dev.id}&idManager=${newTask.manager.id}`,
                taskToSave,
                { headers }
            ).then((response) => navigate("/tareas")).catch((error) => {
                console.log("Failed to save task. Server returned status: ", error);
            });

        
    };
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="text-primary">Tarea</h1>
                <hr className="text-primary" />
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card mb-5">
                        <div className="card-header">
                            <h5 className="card-title">Task Form</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleTaskSave}>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripcion</label>
                                    <input type="text" className="form-control" id="description" name="name" value={newTask.name} onChange={(e) => setnewTask({ ...newTask, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="initialDate" className="form-label">Fecha de Inicio</label>
                                    <input type="date" className="form-control" id="initialDate" name="initialDate" value={newTask.initialDate} onChange={handleInitialDateChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="finalDate" className="form-label">Fecha de Entrega</label>
                                    <input type="date" className="form-control" id="finalDate" name="finalDate" value={newTask.finalDate} onChange={handleFinalDateChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="project" className="form-label">Proyecto</label>
                                    <select className="form-select" id="project" name="project" value={newTask.project.id} onChange={handleProjectChange}>
                                        <option value="">Seleccione un proyecto</option>
                                        {projects.map((projectKey) => (
                                            <option key={projectKey.id} value={projectKey.id}>{projectKey.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="priority" className="form-label">Prioridad</label>
                                    <select className="form-select" name="priority" id="priority" value={newTask.priority} onChange={handlePriorityChange}>
                                        <option value="">Seleccione una prioridad</option>
                                        {Object.keys(priorityOptions).map((priorityKey) => (
                                            <option key={priorityKey} value={priorityKey}>{priorityKey}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Estado</label>
                                    <select className="form-select" id="status" name="status" value={newTask.status} onChange={handleStatusChange}>
                                        <option value="">Seleccione un estado</option>
                                        {Object.keys(statusOptions).map((statusKey) => (
                                            <option key={statusKey} value={statusKey}>{statusKey}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dev" className="form-label">Desarrollador</label>
                                    <select className="form-select" id="dev" name="dev" value={newTask.dev.id} onChange={handleDevChange}>
                                        <option value="">Seleccione un desarrollador</option>
                                        {participants.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="manager" className="form-label">Manager</label>
                                    <select className="form-select" name="manager" id="manager" value={newTask.manager.id} onChange={handleManagerChange}>
                                        <option value="">Seleccione un manager</option>
                                        {participants.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="card-footer text-end">
                                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/tareas')}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default Task;