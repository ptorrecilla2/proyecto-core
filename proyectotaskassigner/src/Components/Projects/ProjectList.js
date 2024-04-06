import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';



const Projects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    
        const handleEdit = (id) => {
            // L�gica para editar el proyecto con el ID proporcionado
            navigate(`/proyectos/${id}`);


            console.log(`Edit project with ID: ${id}`);
        };

        const handleDelete = (id) => {
            // L�gica para eliminar el proyecto con el ID proporcionado           

            axios.delete(`https://localhost:7153/api/Projects/${id}`)
                .then((response) => {
                    setProjects(projects.filter(project => project.id !== id));
                })
                .catch((error) => {
                    console.error(`Error al eliminar el proyecto con ID: ${id}`);
                });
                

            console.log(`Delete project with ID: ${id}`);
        };


        useEffect(() => {
            const authToken = getAuthToken();
            if (!authToken) {
                //Navegar a Login
                navigate('/login');
            }

            axios.get('https://localhost:7153/api/Projects', {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            })
                .then((response) => { setProjects(response.data) })
                .catch((error) => { console.error('Error al obtener la informaci�n de los proyectos'); })
        }, []);




    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => navigate('/proyectos/create') }> Crear Proyecto </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre del Proyecto</TableCell>
                            <TableCell>Nombre del Cliente</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.client.name}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => navigate(`/proyectos/${project.id}/tareas`)}>Ver Tareas</Button>
                                    </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(project.id)}>Editar</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(project.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        );
    };

export default Projects;