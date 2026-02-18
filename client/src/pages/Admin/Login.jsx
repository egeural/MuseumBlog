import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Giriş başarısız. Bilgileri kontrol edin.');
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-museum-dark">Yönetici Girişi</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded focus:outline-none focus:border-museum"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Şifre</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded focus:outline-none focus:border-museum"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="w-full bg-museum text-white py-2 rounded hover:bg-museum-dark transition">
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
