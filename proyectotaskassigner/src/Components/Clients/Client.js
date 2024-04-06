import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const Client = () => { 
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        contact: ''
    
    });
    const { id } = useParams();
    const authToken = getAuthToken();
   

    useEffect(() => {
        if (!authToken) {
            //Navegar a Login
            navigate('/login');
        }
        if (id !== "create") {
            axios.get('https://localhost:7153/api/Clients/' + id, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            })
            .then((response) => { setClient(response.data) })
            .catch((error) => { console.error('Error al obtener la informacion del cliente'); })
        }
    }, []);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqu� puedes enviar el formulario con los datos del proyecto
        if (id == "create") {
            axios.post('https://localhost:7153/api/Clients/', client, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            }).then((response) => {
                
                navigate('/clientes');
            }).catch((error) => {
                console.error('Error al obtener la informaci�n de los proyectos');
            })
        }
        else {
            axios.put('https://localhost:7153/api/Clients/'+id, client, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            }).then((response) => {

                navigate('/clientes');
            }).catch((error) => {
                console.error('Error al obtener la informaci�n de los proyectos');
            })
        }
                
        console.log('Formulario enviado:', client);
    };


    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5">{id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}</Typography>
            <TextField
                fullWidth
                label="Nombre del Cliente"
                name="name"
                value={client.name}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Email del Cliente"
                name="email"
                value={client.email}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Telefono del Cliente"
                name="phone"
                value={client.phone}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Direccion del Cliente"
                name="address"
                value={client.address}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Ciudad del Cliente"
                name="city"
                value={client.city}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Pais del Cliente"
                name="country"
                value={client.country}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Contacto del Cliente"
                name="contact"
                value={client.contact}
                onChange={handleChange}
            />
            <Button variant="outlined" color="primary" onClick={() => navigate('/clientes')}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                {id === 'create' ? 'Crear' : 'Guardar Cambios'}
            </Button>
        </form>
    );
};

export default Client;
