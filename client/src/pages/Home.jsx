import { useEffect, useState } from 'react';
import api from '../utils/api';
import MuseumCard from '../components/MuseumCard';
import SidebarFilter from '../components/SidebarFilter';

const Home = () => {
    const [museums, setMuseums] = useState([]);
    const [filteredMuseums, setFilteredMuseums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const res = await api.get('/museums');
                setMuseums(res.data);
                setFilteredMuseums(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching museums:', err);
                setLoading(false);
            }
        };

        fetchMuseums();
    }, []);

    const handleFilterChange = ({ country, city }) => {
        let result = museums;
        if (country) {
            result = result.filter(m => m.country === country);
        }
        if (city) {
            result = result.filter(m => m.city === city);
        }
        setFilteredMuseums(result);
    };

    if (loading) return <div className="text-center py-20 text-xl text-gray-500">Müzeler yükleniyor...</div>;

    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-museum-dark mb-4">Müze Keşif Günlüğü</h1>
                <p className="text-gray-600 text-lg">Dünyanın dört bir yanındaki müzeleri keşfedin.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <SidebarFilter onFilterChange={handleFilterChange} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold border-l-4 border-museum pl-3">
                            {filteredMuseums.length > 0 ? 'Müzeler' : 'Sonuç Bulunamadı'}
                        </h2>
                        <span className="text-gray-500 text-sm">{filteredMuseums.length} müze listelendi</span>
                    </div>

                    {filteredMuseums.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded shadow-sm">
                            <p className="text-gray-500">Seçilen kriterlere uygun müze bulunamadı.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredMuseums.map(museum => (
                                <MuseumCard key={museum._id} museum={museum} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
