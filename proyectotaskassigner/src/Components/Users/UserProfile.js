import React, { useEffect,useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { logout, getAuthToken } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom'; 


const NavBar = ({ onLogout }) => {
    
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const authToken = getAuthToken();
            if (!authToken) {
                //Navegar a Login
                navigate('/login');             
            }
            axios.post(
                'https://localhost:7153/api/Users/userInfo',
                 null,
                {
                    headers:
                    {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                        
                    }
                }
            ).then((response) => {

                const userInfo = response.data.user;
                setUser(userInfo);
            }).catch((error) => {

            console.error('Error al obtener la informaci�n del usuario');
            })
        
    }, []);

    const handleLogout = () => {
        // L�gica de logout
        logout();
        navigate('/login');

    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand fw-bold fs-3">Bienvenido { user.name}</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/proyectos">Proyectos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/clientes">Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/tareasAsignadas/" + user.id) }>Tareas Asignadas</a>
                            </li>                            
                        </ul>
                    </div>
                </div>
                <button className="btn btn-danger btn-sm mx-5" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Datos de Perfil </h5>
                            <p className="card-text">Nombre: {user.name} </p>
                            <p className="card-text">Apellido: {user.lastName}</p>
                            <p className="card-text">Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>





                
        
       </>
    );
};

export default NavBar;




//<AppBar position="static">
//    <Toolbar>
//        <Typography variant="h6" >
//            Bienvenido {user.name} {user.lastName}
//        </Typography>
//        <Button color="inherit" component={Link} to="/proyectos">Proyectos</Button>
//        <Button color="inherit" component={Link} to="/clientes">Clientes</Button>
//        <Button color="inherit" component={Link} to={"/tareasAsignadas/" + user.id}>Tareas Asignadas</Button>
//        <Button color="inherit" onClick={handleLogout}>Logout</Button>
//    </Toolbar>
//</AppBar>

            //<Typography variant="h4">Información del Usuario</Typography>        
            //<Typography variant="body1">Nombre: {user.name}</Typography>
            //<Typography variant="body1">Apellido: {user.lastName}</Typography>
            //<Typography variant="body1">Email: {user.email}</Typography> 