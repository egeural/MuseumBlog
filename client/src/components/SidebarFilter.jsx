import { useState, useEffect } from 'react';
import api from '../utils/api';

const SidebarFilter = ({ onFilterChange }) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await api.get('/museums');
                // Extract unique countries
                const uniqueCountries = [...new Set(res.data.map(m => m.country))];
                setCountries(uniqueCountries);

                // Extract cities based on selected country or all
                if (selectedCountry) {
                    const filteredCities = [...new Set(res.data
                        .filter(m => m.country === selectedCountry)
                        .map(m => m.city))];
                    setCities(filteredCities);
                } else {
                    const uniqueCities = [...new Set(res.data.map(m => m.city))];
                    setCities(uniqueCities);
                }
            } catch (err) {
                console.error("Error fetching locations", err);
            }
        };
        fetchLocations();
    }, [selectedCountry]);

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedCity('');
        onFilterChange({ country, city: '' });
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        onFilterChange({ country: selectedCountry, city });
    };

    const clearFilters = () => {
        setSelectedCountry('');
        setSelectedCity('');
        onFilterChange({ country: '', city: '' });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-bold text-lg mb-4 text-museum-dark border-b pb-2">Filtrele</h3>

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Ülke</label>
                <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-museum"
                >
                    <option value="">Tümü</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Şehir</label>
                <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-museum"
                    disabled={!selectedCountry}
                >
                    <option value="">Tümü</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <button
                onClick={clearFilters}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
            >
                Filtreleri Temizle
            </button>
        </div>
    );
};

export default SidebarFilter;
