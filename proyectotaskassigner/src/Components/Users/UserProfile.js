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
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >
                    Mi Aplicación
                    </Typography>
                <Button color="inherit" component={Link} to="/proyectos">Proyectos</Button>
                <Button color="inherit" component={Link} to="/clientes">Clientes</Button>
                <Button color="inherit" component={Link} to={"/tareasAsignadas/"+user.id}>Tareas Asignadas</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
         <div >
        <Typography variant="h4">Información del Usuario</Typography>        
        <Typography variant="body1">Nombre: {user.name}</Typography>
        <Typography variant="body1">Apellido: {user.lastName}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        
            </div>
       </>
    );
};

export default NavBar;
