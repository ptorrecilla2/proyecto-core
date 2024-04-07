import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
//import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

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
    const [isEdit, setIsEdit] = useState(false); 
    const [showModal, setShowModal] = useState(false);

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

        if (id && id !== "create") {
            setIsEdit(true);
        }
    }, []);

    //UseEffect para el modo edicion
    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
        if (isEdit) {
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
    }, [isEdit]);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleChanges = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
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
        <>
            <div className="container mt-5 text-center">
                <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
                    {id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}
                </button>
                <button className="btn btn-danger" onClick={() => navigate('/clientes')}>Cancelar</button>
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h5 className="modal-title">{id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="clientName" className="form-label">Nombre del Cliente</label>
                                            <input type="text" className="form-control" id="clientName" name="name" value={client.name} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientEmail" className="form-label">Email del Cliente</label>
                                            <input type="text" className="form-control" id="clientEmail" name="email" value={client.email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientPhone" className="form-label">Telefono del Cliente</label>
                                            <input type="text" className="form-control" id="clientPhone" name="phone" value={client.phone} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientAddress" className="form-label">Direccion del Cliente</label>
                                            <input type="text" className="form-control" id="clientAddress" name="address" value={client.address} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientCity" className="form-label">Ciudad del Cliente</label>
                                            <input type="text" className="form-control" id="clientCity" name="city" value={client.city} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientCountry" className="form-label">Pais del Cliente</label>
                                            <input type="text" className="form-control" id="clientCountry" name="country" value={client.country} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="clientContact" className="form-label">Contacto del Cliente</label>
                                            <input type="text" className="form-control" id="clientContact" name="contact" value={client.contact} onChange={handleChange} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary me-2">
                                                    {id === 'create' ? 'Crear' : 'Guardar Cambios'}
                                                </button>
                                            <button type="button" className="btn btn-outline-primary me-2" onClick={() => navigate('/clientes')}>Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>    
                ) }
            </div>
        </>
    );
};

export default Client;


//<form onSubmit={handleSubmit}>
//    <Typography variant="h5">{id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}</Typography>
//    <TextField
//        fullWidth
//        label="Nombre del Cliente"
//        name="name"
//        value={client.name}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Email del Cliente"
//        name="email"
//        value={client.email}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Telefono del Cliente"
//        name="phone"
//        value={client.phone}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Direccion del Cliente"
//        name="address"
//        value={client.address}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Ciudad del Cliente"
//        name="city"
//        value={client.city}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Pais del Cliente"
//        name="country"
//        value={client.country}
//        onChange={handleChange}
//    />
//    <TextField
//        fullWidth
//        label="Contacto del Cliente"
//        name="contact"
//        value={client.contact}
//        onChange={handleChange}
//    />
//    <Button type="submit" variant="contained" color="primary">
//        {id === 'create' ? 'Crear' : 'Guardar Cambios'}
//    </Button>
//    <Button variant="outlined" color="primary" onClick={() => navigate('/clientes')}>Cancelar</Button>
//</form>