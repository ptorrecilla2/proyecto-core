import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';



const Clients = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    
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




    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => navigate('/clientes/create') }> Crear Cliente </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre del Cliente</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Pais</TableCell>
                            <TableCell>Contacto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell>{client.address}</TableCell>
                                <TableCell>{client.city}</TableCell>
                                <TableCell>{client.country}</TableCell>
                                <TableCell>{client.contact}</TableCell>
                                
                                
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(client.id)}>Editar</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(client.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        );
    };

export default Clients;