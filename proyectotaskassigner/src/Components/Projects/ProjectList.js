import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';



const Projects = () => {
       const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);

    useEffect(() => {
        const authToken = getAuthToken();
        if (!authToken) {
            navigate('/login');
        }

        axios.get('https://localhost:7153/api/Projects', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then((response) => { setProjects(response.data); })
        .catch((error) => { console.error('Error al obtener la información de los proyectos'); });
    }, []);

    const handleEdit = (id) => {
        navigate(`/proyectos/${id}`);
        console.log(`Edit project with ID: ${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7153/api/Projects/${id}`)
        .then((response) => {
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
            // Reducir la página actual si el último proyecto en la página actual ha sido eliminado
            if ((projects.length - 1) % projectsPerPage === 0 && currentPage !== 1) {
                setCurrentPage(currentPage - 1);
            }
        })
        .catch((error) => {
            console.error(`Error al eliminar el proyecto con ID: ${id}`);
        });
        console.log(`Delete project with ID: ${id}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastProject = Math.min(currentPage * projectsPerPage, projects.length);
    const indexOfFirstProject = Math.min((currentPage - 1) * projectsPerPage, projects.length);
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center text-primary display-4">Proyectos de Task Allocator</h1>
                <hr className="text-primary" />

                <div className="text-start">
                    <button className="btn btn-success mt-3 mb-5" onClick={() => navigate('/proyectos/create')}>
                        <i className="bi bi-folder-plus"></i> Nuevo Proyecto
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Proyecto</th>
                                <th>Nombre del Cliente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentProjects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.client.name}</td>
                                    <td>
                                        <button className="btn btn-outline-success me-2" onClick={() => navigate(`/proyectos/${project.id}/tareas`)}>
                                            <i className="bi bi-eye"></i> Ver Tareas
                                        </button>
                                        <button className="btn btn-outline-primary me-2" onClick={() => handleEdit(project.id)}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </button>
                                        <button className="btn btn-outline-danger me-2" onClick={() => handleDelete(project.id)}>
                                            <i className="bi bi-trash3"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};



            //    <Button variant="outlined" color="primary" onClick={() => navigate('/proyectos/create') }> Crear Proyecto </Button>
            //<TableContainer component={Paper}>
            //    <Table>
            //        <TableHead>
            //            <TableRow>
            //                <TableCell>ID</TableCell>
            //                <TableCell>Nombre del Proyecto</TableCell>
            //                <TableCell>Nombre del Cliente</TableCell>
            //            </TableRow>
            //        </TableHead>
            //        <TableBody>
            //            {projects.map((project) => (
            //                <TableRow key={project.id}>
            //                    <TableCell>{project.id}</TableCell>
            //                    <TableCell>{project.name}</TableCell>
            //                    <TableCell>{project.client.name}</TableCell>
            //                    <TableCell>
            //                        <Button variant="outlined" color="primary" onClick={() => navigate(`/proyectos/${project.id}/tareas`)}>Ver Tareas</Button>
            //                        </TableCell>
            //                    <TableCell>
            //                        <Button variant="outlined" color="primary" onClick={() => handleEdit(project.id)}>Editar</Button>
            //                    </TableCell>
            //                    <TableCell>
            //                        <Button variant="outlined" color="error" onClick={() => handleDelete(project.id)}>Eliminar</Button>
            //                    </TableCell>
            //                </TableRow>
            //            ))}
            //        </TableBody>
            //    </Table>
            //</TableContainer>
   

export default Projects;