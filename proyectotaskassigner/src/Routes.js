import React from 'react';
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

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate to='/profile' />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/tareasasignadas/:id" element={<TaskListAsigned />} />
                <Route path="/tareas/create" element={<Task />} />
                <Route path="/tareas/:id" element={<TaskDetailsComponent />} />
                <Route path="/tareas" element={<AllTasks />} />

                
                
                <Route path="/proyectos" element={<ProjectList />} />
                <Route path="/proyectos/:id/tareas" element={<TasksFromProject/>} />
                <Route path="/proyectos/:id" element={<Project/>} />

                <Route path="/clientes" element={<ClientList />} />
                <Route path="/clientes/:id" element={<Client/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
