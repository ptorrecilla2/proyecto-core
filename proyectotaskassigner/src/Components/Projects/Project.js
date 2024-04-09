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
    const [errors, setErrors] = useState({ name: '', clientId: '' }); 

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
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
        validateField(name, value); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) { 
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
        } else {
            console.log('El formulario no es válido.');
        }
    };

    const validateField = (fieldName, value) => { 
        let errorMessage = '';
        switch (fieldName) {
            case 'name':
                errorMessage = value.trim() === '' ? 'El nombre del proyecto es requerido' : '';
                break;
            case 'clientId':
                errorMessage = value === '' ? 'Debe seleccionar un cliente' : '';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const validateForm = () => { 
        let isValid = true;
        for (const key in project) {
            if (Object.hasOwnProperty.call(project, key)) {
                validateField(key, project[key]);
                if (errors[key]) {
                    isValid = false;
                }
            }
        }
        return isValid;
    };

    return (
        <>
            
            <div className="container mt-5 text-center">
                <div className="text-center">
                    <h1 className="text-primary">{id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}</h1>
                    <hr className="text-primary" />
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-header">
                                <h5 className="card-title">{id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
                                            <input type="text" className="form-control" id="projectName" name="name" value={project.name} onChange={handleChange} />
                                            {errors.name && <div className="text-danger">{errors.name}</div>} 
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientSelect" className="form-label">Seleccionar Cliente</label>
                                            <select className="form-select" id="clientSelect" name="clientId" value={project.clientId} onChange={handleChange}>
                                                {clients.map(client => (                                                                                                        
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </select>
                                            {errors.clientId && <div className="text-danger">{errors.clientId}</div>} 
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
            </div>
        </>
    );
};

export default Project;
