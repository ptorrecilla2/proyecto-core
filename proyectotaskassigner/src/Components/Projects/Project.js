import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const Project = ({ match }) => { 
    const navigate = useNavigate();
    const [project, setProject] = useState({ name: '', clientId: '' });
    const [clients, setClients] = useState([]);
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const authToken = getAuthToken();
   
    useEffect(() => {
        if (!authToken) {
            //Navegar a Login
            navigate('/login');
        }
        axios.get('https://localhost:7153/api/Clients/', {
            headers:
            {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',

            }
        })
            .then((response) => { setClients(response.data) })
            .catch((error) => { console.error('Error al obtener la informaci�n de los proyectos'); })
        if (id && id != "create") {
            setIsEdit(true);
        }
    }, []);

    useEffect(() => {
        if (!authToken) {
            //Navegar a Login
            navigate('/login');
        }
        if (isEdit) {
            axios.get('https://localhost:7153/api/Projects/' + id, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            })
            .then((response) => { setProject(response.data) })
            .catch((error) => { console.error('Error al obtener la informaci�n de los proyectos'); })
        }
    }, [isEdit]);

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqu� puedes enviar el formulario con los datos del proyecto
        if (id == "create") {
            axios.post('https://localhost:7153/api/Projects/', project, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            }).then((response) => {

                navigate('/proyectos');
            }).catch((error) => {
                console.error('Error al obtener la informaci�n de los proyectos');
            })
        }
        else {
            axios.put('https://localhost:7153/api/Projects/'+id, project, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            }).then((response) => {

                navigate('/proyectos');
            }).catch((error) => {
                console.error('Error al obtener la informaci�n de los proyectos');
            })
        }
                
        console.log('Formulario enviado:', project);
    };


    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5">{id === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}</Typography>
            <TextField
                fullWidth
                label="Nombre del Proyecto"
                name="name"
                value={project.name}
                onChange={handleChange}
            />
            <FormControl fullWidth>
                <InputLabel>Seleccionar Cliente</InputLabel>
                <Select
                    name="clientId"
                    value={project.clientId}
                    onChange={handleChange}
                >
                    {clients.map(client => (
                        <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="outlined" color="primary" onClick={() => navigate('/proyectos')}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                {id === 'create' ? 'Crear' : 'Guardar Cambios'}
            </Button>
        </form>
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