import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout, getAuthToken, getRole } from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
const NavBar = () => {

    const role = getRole();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const authToken = getAuthToken();
            if (!authToken || !role) {
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

    //useEffect para obtener las notificaciones
     useEffect(() => {
        const authToken = getAuthToken();
        if (!authToken) {
            navigate('/login');
        }
        
    }, [user.id]);



    const handleLogout = () => {
        // L�gica de logout
        logout();
        navigate('/login');

    };

    return (
        
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand fw-bold fs-3">Bienvenido { user.name}</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {role === 'Admin' ? (
                                <>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/proyectos">Proyectos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/clientes">Clientes</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="/usuarios">Usuarios</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/tareas">Tareas</a>
                            </li>
                            </>
                        ):(
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => navigate("/tareasAsignadas/" + user.id) }>Tareas Asignadas</button>
                            </li>
                        )}
                                                        
                        </ul>
                    </div>
                </div>
            <Notification />
            <button className="btn btn-danger btn-sm mx-5" style={{ color: 'red', background:'#FDFEFE' }} onClick={handleLogout}> <i className="bi bi-door-open">Salir</i></button>
            </nav>
        
    );
}

export default NavBar;