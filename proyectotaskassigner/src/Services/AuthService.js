// AuthService.js
import {jwtDecode} from 'jwt-decode';

import axios from 'axios';

const login = async (email, password) => {
    var response = await axios.post('https://localhost:7153/api/Users/login', { email, password });
    if(response.status === 200){
        const authToken = response.data.token;
        localStorage.setItem('authToken', authToken);
        const decodedToken = jwtDecode(authToken);
        return decodedToken;
    }
    return null;

     
    
};

const logout = () => {
    localStorage.removeItem('authToken');


};

const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Check token expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
            // Token expired, remove it
            logout();
            return null;
        }
        return token;
    }
    return null;
};

const getDecodedToken = () => {
    const token = getAuthToken();
    if (token) {
        return jwtDecode(token);
    }
    return null;
};



export { login, logout, getAuthToken ,getDecodedToken};