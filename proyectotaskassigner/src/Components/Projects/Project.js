import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';

const Project = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({ name: '', clientId: '' });
    const [clients, setClients] = useState([]);
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const authToken = getAuthToken();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
        axios.get('https://localhost:7153/api/Clients/', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => setClients(response.data))
            .catch((error) => console.error('Error al obtener la información de los proyectos'));

        if (id && id !== "create") {
            setIsEdit(true);
        }
    }, []);

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
        if (isEdit) {
            axios.get('https://localhost:7153/api/Projects/' + id, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => setProject(response.data))
                .catch((error) => console.error('Error al obtener la información de los proyectos'));
        }
    }, [isEdit]);

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = id === "create" ? 'https://localhost:7153/api/Projects/' : `https://localhost:7153/api/Projects/${id}`;
        const axiosMethod = id === "create" ? axios.post : axios.put;

        axiosMethod(apiUrl, project, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(() => navigate('/proyectos'))
            .catch((error) => console.error('Error al obtener la información de los proyectos'));

        console.log('Formulario enviado:', project);
    };

    return (
        <>
            <div className="container mt-5 text-center">
            <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
                {id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}
                </button>
                <button className="btn btn-danger" onClick={() => navigate('/proyectos')}>Cancelar</button>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
                                        <input type="text" className="form-control" id="projectName" name="name" value={project.name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="clientSelect" className="form-label">Seleccionar Cliente</label>
                                        <select className="form-select" id="clientSelect" name="clientId" value={project.clientId} onChange={handleChange}>
                                            {clients.map(client => (
                                                <option key={client.id} value={client.id}>{client.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary me-2">
                                            {id === 'create' ? 'Crear' : 'Guardar Cambios'}
                                        </button>
                                        <button type="button" className="btn btn-outline-primary me-2" onClick={() => navigate('/proyectos')}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    );
};

export default Project;





//<form onSubmit={handleSubmit}>
//    <Typography variant="h5">{id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}</Typography>
//    <TextField
//        fullWidth
//        label="Nombre del Proyecto"
//        name="name"
//        value={project.name}
//        onChange={handleChange}
//    />
//    <FormControl fullWidth>
//        <InputLabel>Seleccionar Cliente</InputLabel>
//        <Select
//            name="clientId"
//            value={project.clientId}
//            onChange={handleChange}
//        >
//            {clients.map(client => (
//                <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
//            ))}
//        </Select>
//    </FormControl>
//    <Button variant="outlined" color="primary" onClick={() => navigate('/proyectos')}>Cancelar</Button>
//    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
//        {id === 'create' ? 'Crear' : 'Guardar Cambios'}
//    </Button>
//</form>