import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';




const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // controla la página actual
    const [usersPerPage] = useState(5); // controla la cantidad de usuarios a mostrar por página
    const [search, setSearch] = useState(""); // controla la barra de búsqueda

    useEffect(() => {
        const authToken = getAuthToken();
        if (!authToken) {
            navigate('/login');
        }

        axios.get('https://localhost:7153/api/Users', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then((response) => { setUsers(response.data); })
        .catch((error) => { console.error('Error al obtener la información de los usuarios'); });
    }, []);

    const handleEdit = (id) => {
        navigate(`/usuarios/${id}`);
        console.log(`Edit user with ID: ${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7153/api/Users/${id}`)
        .then((response) => {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            // Reducir la página actual si el último usuario en la página actual ha sido eliminado
            if ((users.length - 1) % usersPerPage === 0 && currentPage !== 1) {
                setCurrentPage(currentPage - 1);
            }
        })
        .catch((error) => {
            console.error(`Error al eliminar el usuario con ID: ${id}`);
        });
        console.log(`Delete user with ID: ${id}`);
    };

    //Barra de búsqueda
    const handleSearch = (event) => { 
        setSearch(event.target.value); // Actualizar el estado de búsqueda con el valor del input
        filteredSearch(event.target.value); // Filtramos la búsqueda con el valor del input
    }

    //Función para buscar por nombre de usuario o por nombre de cliente
    const filteredSearch = (search) => {
        axios.get('https://localhost:7153/api/Users')
        .then((response) => {
            const filteredUsers = response.data.filter((user) => {
                return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
            });
            setUsers(filteredUsers);
        })
        .catch((error) => {
            console.error('Error al obtener la información de los usuarios');
        });
    }
    
    // Paginación
    const paginate = (pageNumber) => setCurrentPage(pageNumber); // Cambiar la página actual
    const indexOfLastUser = Math.min(currentPage * usersPerPage, users.length); // Índice del último usuario en la página actual
    const indexOfFirstUser = Math.min((currentPage - 1) * usersPerPage, users.length); // Índice del primer usuario en la página actual
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Usuarios a mostrar en la página actual

    return (
        <>
            <div className="container mt-5">
                <div>
                    <h1 className="text-center text-primary display-4">Usuarios</h1>
                    <hr className="text-primary" />
                </div>

                <div className="text-start">
                    <button className="btn btn-success mt-3 mb-5" onClick={() => navigate('/usuarios/create')}>
                        <i className="bi bi-folder-plus"></i> Nuevo Usuario
                    </button>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Buscar Nombre o Apellido" aria-label="Search" aria-describedby="basic-addon1" onChange={handleSearch} />
                </div>           

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Usuario</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.type}</td>
                                    <td>                                        
                                        <button className="btn btn-outline-primary me-2" onClick={() => handleEdit(user.id)}>
                                            <i className="bi bi-pencil-square"></i>
                                            <span className="d-none d-sm-inline"> Editar</span>
                                        </button>
                                        <button className="btn btn-outline-danger me-2" onClick={() => handleDelete(user.id)}>
                                            <i className="bi bi-trash3"></i>
                                            <span className="d-none d-sm-inline"> Eliminar</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
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



            
   

export default UserList;