import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../../Services/AuthService';

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', lastName: '', email: '', password: '', roleId: ''});
    const [roles, setRoles] = useState([]);
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const authToken = getAuthToken();    
    const [errors, setErrors] = useState({ name: '', clientId: '' }); 

    

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
        if (id && id !== "create") {
            setIsEdit(true);
        }
        if (id !== "create") {
            axios.get('https://localhost:7153/api/Users/' + id, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => setUser(response.data))
                .catch((error) => console.error('Error al obtener la información de los usuarios'));
        }
        axios.post('https://localhost:7153/api/Users/getRoles', null,{
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => setRoles(response.data) )
                .catch((error) => console.error('Error al obtener la información de los usuarios'));
                
            
                
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        validateField(name, value); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) { 
            const apiUrl = id === "create" ? 'https://localhost:7153/api/Users' : `https://localhost:7153/api/Users/${id}`;
            const axiosMethod = id === "create" ? axios.post : axios.put;

            axiosMethod(apiUrl, user, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(() => navigate('/usuarios'))
                .catch((error) => console.error('Error al obtener la información de los usuarios'));

            console.log('Formulario enviado:', user);
        } else {
            console.log('El formulario no es válido.');
        }
    };

    const validateField = (fieldName, value) => { 
        let errorMessage = '';
        switch (fieldName) {
            case 'name':
                errorMessage = value.trim() === '' ? 'El nombre del usuario es requerido' : '';
                break;
            case 'roleId':
                errorMessage = value === '' ? 'Debe seleccionar un rol' : '';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const validateForm = () => { 
        let isValid = true;
        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                validateField(key, user[key]);
                if (errors[key]) {
                    isValid = false;
                }
            }
        }
        return isValid;
    };

    return (
        <>
            <div className="container mt-5 text-center">
                <div className="text-center">
                    <h1 className="text-primary">{id === 'create' ? 'Crear Usuario' : 'Editar Usuario'}</h1>
                    <hr className="text-primary" />
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-header">
                                <h5>{id === 'create' ? 'Crear Usuario' : 'Editar Usuario'}</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="userName" className="form-label">Nombre</label>
                                            <input type="text" className="form-control" id="userName" name="name" value={user.name} onChange={handleChange} />
                                            {errors.name && <div className="text-danger">{errors.name}</div>} 
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Apellido</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
                                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>} 
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
                                            {errors.email && <div className="text-danger">{errors.email}</div>} 
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Contraseña</label>
                                            <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
                                            {errors.password && <div className="text-danger">{errors.password}</div>} 
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="roleSelect" className="form-label">Seleccionar Rol</label>
                                            <select className="form-select" id="roleSelect" name="roleId" value={user.roleId} onChange={handleChange}>
                                                {roles.map(role => (                                                                                                        
                                                    <option key={role.id} value={role.id}>{role.type}</option>
                                                ))}
                                            </select>
                                            {errors.roleId && <div className="text-danger">{errors.roleId}</div>} 
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary me-2">
                                                {id === 'create' ? 'Crear' : 'Guardar Cambios'}
                                            </button>
                                            <button type="button" className="btn btn-outline-primary me-2" onClick={() => navigate('/usuarios')}>Cancelar</button>
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

export default User;





