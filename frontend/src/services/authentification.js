import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, {
            username,
            password,
        });
        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return localStorage.getItem('token');
};

export default {
    login,
    logout,
    getCurrentUser,
};
