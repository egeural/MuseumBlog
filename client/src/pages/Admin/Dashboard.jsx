import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import AuthContext from '../../context/AuthContext';

const Dashboard = () => {
    const [museums, setMuseums] = useState([]);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const res = await api.get('/museums');
                setMuseums(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMuseums();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bu müzeyi silmek istediğinize emin misiniz?')) {
            try {
                await api.delete(`/museums/${id}`); // NOTE: Check for escapes here too in future
                setMuseums(museums.filter(m => m._id !== id));
            } catch (err) {
                alert('Silme işlemi başarısız');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-museum-dark">Yönetici Paneli</h1>
                <div className="flex gap-4">
                    <Link to="/" className="text-museum hover:underline mr-4">Siteye Git</Link>
                    <span className="self-center font-semibold">Merhaba, {user?.username}</span>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Çıkış</button>
                </div>
            </div>

            <div className="bg-white rounded shadow p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Müzeler Listesi</h2>
                    <Link to="/admin/editor" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        + Yeni Müze Ekle
                    </Link>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3">Başlık</th>
                            <th className="p-3">Ülke/Şehir</th>
                            <th className="p-3">Tarih</th>
                            <th className="p-3">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {museums.map(m => (
                            <tr key={m._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{m.title}</td>
                                <td className="p-3">{m.country}, {m.city}</td>
                                <td className="p-3">{new Date(m.createdAt).toLocaleDateString('tr-TR')}</td>
                                <td className="p-3 flex gap-2">
                                    <Link to={`/admin/editor/${m._id}`} className="text-blue-600 hover:underline">Düzenle</Link>
                                    <button onClick={() => handleDelete(m._id)} className="text-red-600 hover:underline">Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
