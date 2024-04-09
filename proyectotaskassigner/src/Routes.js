import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Users/Login';
import UserProfile from './Components/Users/UserProfile';
import TaskList from './Components/Tasks/TaskList';
import ProjectList from './Components/Projects/ProjectList';
import Task from './Components/Tasks/Task';
import Project from './Components/Projects/Project';
import Client from './Components/Clients/Client';
import ClientList from './Components/Clients/ClientList';
import TaskDetailsComponent from './Components/Tasks/TaskDetailComponent';
import TaskListAsigned from './Components/Tasks/TaskListAsigned';
import TasksFromProject from './Components/Tasks/TasksFromProject';
import AllTasks from './Components/Tasks/AllTasks';
import UserList from './Components/Users/UserList';
import UserCreationEdition from './Components/Users/UserCreationEdition';
import NavBar from './Components/NavBar';
const AppRoutes = () => {

    return (
        <Router>
            
            <Routes>
                <Route exact path="/" element={<Navigate to='/profile' />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/profile" element={<><NavBar/><UserProfile /></>} />
                <Route path="/tareasasignadas/:id" element={<><NavBar/><TaskListAsigned /></>} />
                <Route path="/tareas/create" element={<><NavBar/><Task /></>} />
                <Route path="/tareas/:id" element={<><NavBar/><TaskDetailsComponent /></>} />
                <Route path="/tareas" element={<><NavBar/><AllTasks /></>} />

                
                
                <Route path="/proyectos" element={<><NavBar/><ProjectList /></>} />
                <Route path="/proyectos/:id/tareas" element={<><NavBar/><TasksFromProject/></>} />
                <Route path="/proyectos/:id" element={<><NavBar/><Project/></>} />

                <Route path="/usuarios" element={<><NavBar/><UserList /></>} />
                <Route path="/usuarios/:id" element={<><NavBar/><UserCreationEdition /></>} />

                <Route path="/clientes" element={<><NavBar/><ClientList /></>} />
                <Route path="/clientes/:id" element={<><NavBar/><Client/></>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
