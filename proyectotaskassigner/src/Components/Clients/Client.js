import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';


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
                <div className="text-center">
                    <h1 className="text-primary">{id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}</h1>
                    <hr className="text-primary" />
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-header">
                                <h5 className="card-title">{id === 'create' ? 'Crear Cliente' : 'Editar Cliente'}</h5>
                            </div>
                            <div className="card-body">
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
            </div>
        </>
    );
};

export default Client;
