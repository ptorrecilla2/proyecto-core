// AuthService.js

import axios from 'axios';

const login = async (email, password) => {
    var response = await axios.post('https://localhost:7153/api/Users/login', { email, password });
    if(response.status === 200){
        const authToken = response.data.token;
        const role = response.data.role.type;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('role', role);
        setTimeout(() => {
            localStorage.removeItem('token');
          }, 3600000);
        return true;
    }
    return false;

     
    
};

const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
};

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

const getRole = () => {
    return localStorage.getItem('role');
}


export { login, logout, getAuthToken,getRole };