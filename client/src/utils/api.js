import axios from 'axios';

// In production (Railway), the frontend is served from the same server as the API.
// So we use a relative URL. In development we use localhost.
const baseURL = import.meta.env.MODE === 'production'
    ? '/api'
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auto-attach JWT token from localStorage for every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
