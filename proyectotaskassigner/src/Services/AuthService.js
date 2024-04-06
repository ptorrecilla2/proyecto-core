// AuthService.js

import axios from 'axios';

const login = async (email, password) => {
    var response = await axios.post('https://localhost:7153/api/Users/login', { email, password });
    if(response.status === 200){
        const authToken = response.data.token;
        localStorage.setItem('authToken', authToken);
        return true;
    }
    return false;

     
    
};

const logout = () => {
    localStorage.removeItem('authToken');
};

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export { login, logout, getAuthToken };