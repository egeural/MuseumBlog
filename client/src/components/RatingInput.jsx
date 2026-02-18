import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const RatingInput = ({ ratings, setRatings }) => {
    const [newRating, setNewRating] = useState({ label: '', score: 5 });

    const addRating = () => {
        if (newRating.label.trim()) {
            setRatings([...ratings, newRating]);
            setNewRating({ label: '', score: 5 });
        }
    };

    const removeRating = (index) => {
        const updatedRatings = ratings.filter((_, i) => i !== index);
        setRatings(updatedRatings);
    };

    const updateRating = (index, field, value) => {
        const updatedRatings = ratings.map((r, i) =>
            i === index ? { ...r, [field]: value } : r
        );
        setRatings(updatedRatings);
    };

    return (
        <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-bold mb-2">Değerlendirme Kriterleri</h3>

            {ratings.map((rating, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                        type="text"
                        placeholder="Örn: Otopark, Fiyat"
                        className="border p-1 rounded flex-1"
                        value={rating.label}
                        onChange={(e) => updateRating(index, 'label', e.target.value)}
                    />
                    <input
                        type="number"
                        min="1" max="5"
                        className="border p-1 rounded w-16"
                        value={rating.score}
                        onChange={(e) => updateRating(index, 'score', parseInt(e.target.value))}
                    />
                    <button type="button" onClick={() => removeRating(index)} className="text-red-500">
                        <FaTrash />
                    </button>
                </div>
            ))}

            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    placeholder="Yeni kriter ekle..."
                    className="border p-1 rounded flex-1"
                    value={newRating.label}
                    onChange={(e) => setNewRating({ ...newRating, label: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRating())}
                />
                <input
                    type="number"
                    min="1" max="5"
                    className="border p-1 rounded w-16"
                    value={newRating.score}
                    onChange={(e) => setNewRating({ ...newRating, score: parseInt(e.target.value) })}
                />
                <button type="button" onClick={addRating} className="bg-museum text-white px-3 py-1 rounded">
                    Ekle
                </button>
            </div>
        </div>
    );
};

export default RatingInput;
