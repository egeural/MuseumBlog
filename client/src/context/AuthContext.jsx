import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                api.defaults.headers.common['x-auth-token'] = token;
                try {
                    const res = await api.get('/auth/user');
                    setUser(res.data);
                } catch (err) {
                    console.error('Auth error', err);
                    localStorage.removeItem('token');
                    delete api.defaults.headers.common['x-auth-token'];
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (username, password) => {
        const res = await api.post('/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['x-auth-token'] = res.data.token;

        const userRes = await api.get('/auth/user');
        setUser(userRes.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
