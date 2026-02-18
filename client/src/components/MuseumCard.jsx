import { Link } from 'react-router-dom';

const MuseumCard = ({ museum }) => {
    // Fotoğraf yoksa placeholder göster
    const imageUrl = museum.photos && museum.photos.length > 0
        ? `http://localhost:5000${museum.photos[0]}`
        : 'https://via.placeholder.com/400x250?text=Muze';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={imageUrl}
                alt={museum.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase font-bold text-museum tracking-wider">{museum.country}</span>
                    <span className="text-xs text-gray-500">{new Date(museum.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{museum.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {museum.summary}
                </p>
                <Link
                    to={`/museum/${museum._id}`}
                    className="inline-block bg-museum text-white px-4 py-2 rounded text-sm hover:bg-museum-dark transition-colors"
                >
                    Detayları Oku
                </Link>
            </div>
        </div >
    );
};

export default MuseumCard;
