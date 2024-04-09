import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';




const Clients = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5);

    
        const handleEdit = (id) => {
            // L�gica para editar el proyecto con el ID proporcionado
            navigate(`/clientes/${id}`);


            console.log(`Edit client with ID: ${id}`);
        };

        const handleDelete = (id) => {
            // L�gica para eliminar el proyecto con el ID proporcionado           

            axios.delete(`https://localhost:7153/api/Clients/${id}`)
                .then((response) => {
                    setClients(clients.filter(client => client.id !== id));
                })
                .catch((error) => {
                    console.error(`Error al eliminar el proyecto con ID: ${id}`);
                });
                

            console.log(`Delete client with ID: ${id}`);
        };


        useEffect(() => {
            const authToken = getAuthToken();
            if (!authToken) {
                //Navegar a Login
                navigate('/login');
            }

            axios.get('https://localhost:7153/api/Clients', {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',

                }
            })
                .then((response) => { setClients(response.data) })
                .catch((error) => { console.error('Error al obtener la informaci�n de los clientes'); })
        }, []);

    //Barra de búsqueda
    const handleSearch = (event) => {
        setSearch(event.target.value); 
        filteredSearch(event.target.value); 
    }

    //Función para buscar por nombre de cliente
    const filteredSearch = (search) => {
        axios.get('https://localhost:7153/api/Clients')
            .then((response) => {
                const filteredClients = response.data.filter((client) => {
                    return client.name.toLowerCase().includes(search.toLowerCase());
                });
                setClients(filteredClients);
            })
            .catch((error) => {
                console.error('Error al obtener la información de los clientes');
            });
    }

    //Paginación
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const indexOflastClient = Math.min(currentPage * clientsPerPage, clients.length);
    const indexOfFirstClient = Math.min((currentPage - 1) * clientsPerPage, clients.length);
    const currentClients = clients.slice(indexOfFirstClient, indexOflastClient);


    return (
        <>
            <div className="container mt-5">
                <div>
                    <h1 className="text-center text-primary display-4">Clientes</h1>
                    <hr className="text-primary" />
                </div>
                <div className="text-start">
                    <button className="btn btn-success mt-3 mb-5" onClick={() => navigate('/clientes/create')}>
                        <i className="bi bi-person-fill-add"></i> Añadir Cliente
                    </button>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Buscar Nombre de Cliente..." aria-label="Search" aria-describedby="basic-addon1" onChange={handleSearch} />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Cliente</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Direccion</th>
                                <th>Ciudad</th>
                                <th>Pais</th>
                                <th>Contacto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.address}</td>
                                    <td>{client.city}</td>
                                    <td>{client.country}</td>
                                    <td>{client.contact}</td>
                                    <td>                                         
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-outline-primary me-2" onClick={() => handleEdit(client.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                                <span className="d-none d-sm-inline"> Editar</span>
                                            </button>
                                            <button className="btn btn-outline-danger me-2" onClick={() => handleDelete(client.id)}>
                                                <i className="bi bi-trash3"></i>
                                                <span className="d-none d-sm-inline"> Eliminar</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(clients.length / clientsPerPage) }).map((_, index) => (
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

export default Clients;
            