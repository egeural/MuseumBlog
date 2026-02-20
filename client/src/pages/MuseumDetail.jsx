import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { SERVER_URL } from '../utils/api';

const MuseumDetail = () => {
    const { id } = useParams();
    const [museum, setMuseum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMuseum = async () => {
            try {
                const res = await api.get(`/museums/${id}`);
                setMuseum(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching museum:', err);
                setLoading(false);
            }
        };

        fetchMuseum();
    }, [id]);

    if (loading) return <div className="text-center py-20">Yükleniyor...</div>;
    if (!museum) return <div className="text-center py-20">Müze bulunamadı.</div>;

    const mainImage = museum.photos && museum.photos.length > 0
        ? `${SERVER_URL}${museum.photos[0]}`
        : 'https://via.placeholder.com/800x400';

    return (
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={mainImage} alt={museum.title} className="w-full h-64 md:h-96 object-cover" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="bg-museum-light text-museum-dark px-3 py-1 rounded-full text-sm font-semibold">
                        {museum.category || 'Genel'}
                    </span>
                    <span className="text-gray-500 text-sm">
                        {new Date(museum.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{museum.title}</h1>

                <div className="flex items-center text-gray-600 mb-8">
                    <span className="mr-2">📍</span>
                    <span>{museum.city}, {museum.country}</span>
                </div>

                {/* Summary */}
                <div className="text-lg font-semibold text-gray-800 mb-6 border-l-4 border-museum pl-4">
                    {museum.summary}
                </div>

                {/* Video Section */}
                {museum.videoUrl && (
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 text-museum-dark">Tanıtım Videosu</h3>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={museum.videoUrl.replace('watch?v=', 'embed/')}
                                title="Museum Video"
                                className="w-full h-[400px] rounded-lg shadow-lg"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Rich Content */}
                <div className="prose max-w-none text-gray-800 leading-relaxed mb-8 ql-editor"
                    dangerouslySetInnerHTML={{ __html: museum.content }} />

                {/* Ratings Section */}
                {museum.ratings && museum.ratings.length > 0 && (
                    <div className="bg-museum-light p-6 rounded-lg mb-8">
                        <h3 className="text-2xl font-bold mb-4 text-museum-dark">Değerlendirme</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {museum.ratings.map((rate, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
                                    <span className="font-semibold">{rate.label}</span>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i}>{i < rate.score ? '★' : '☆'}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Link to="/" className="inline-block bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                    &larr; Geri Dön
                </Link>
            </div>
        </article>
    );
};

export default MuseumDetail;
