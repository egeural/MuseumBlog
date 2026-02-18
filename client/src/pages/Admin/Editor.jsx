import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../../utils/api';
import RatingInput from '../../components/RatingInput';

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        country: '',
        city: '',
        category: '',
        summary: '',
        content: '',
        photos: [],
        videoUrl: '',
        ratings: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchMuseum = async () => {
                try {
                    const res = await api.get(`/museums/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error('Error fetching museum', err);
                }
            };
            fetchMuseum();
        }
    }, [id]);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!imageFile) return null;
        const data = new FormData();
        data.append('image', imageFile);

        try {
            const res = await api.post('/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.filePath;
        } catch (err) {
            console.error('Upload Error', err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let uploadedPath = null;
        if (imageFile) {
            uploadedPath = await uploadImage();
        }

        const museumData = { ...formData };
        if (uploadedPath) {
            // Replace photos array with new photo for simplicity, or append
            museumData.photos = [uploadedPath];
        }

        try {
            if (id) {
                await api.put(`/museums/${id}`, museumData);
            } else {
                await api.post('/museums', museumData);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Save Error', err);
            alert('Kaydetme hatası');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-museum-dark">
                {id ? 'Müze Düzenle' : 'Yeni Müze Ekle'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Başlık</label>
                        <input type="text" required
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                        <select
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Seçiniz</option>
                            <option value="Tarih">Tarih</option>
                            <option value="Sanat">Sanat</option>
                            <option value="Arkeoloji">Arkeoloji</option>
                            <option value="Bilim">Bilim</option>
                            <option value="Etnografya">Etnografya</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ülke</label>
                        <input type="text" required
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Şehir</label>
                        <input type="text" required
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Görsel Yükle</label>
                    <input type="file"
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        onChange={handleFileChange}
                    />
                    {formData.photos && formData.photos.length > 0 && !imageFile && (
                        <div className="mt-2 text-sm text-green-600">Mevcut görsel korunacak.</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Video Bağlantısı (Youtube/Vimeo)</label>
                    <input
                        type="text"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="w-full border p-2 rounded"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Kısa Özet</label>
                    <textarea required rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Detaylı İçerik</label>
                    <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        className="bg-white h-64 mb-12"
                    />
                </div>

                <RatingInput
                    ratings={formData.ratings || []}
                    setRatings={(newRatings) => setFormData({ ...formData, ratings: newRatings })}
                />

                <div className="flex justify-end gap-4 mt-6">
                    <button type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        İptal
                    </button>
                    <button type="submit"
                        disabled={loading}
                        className="bg-museum text-white px-6 py-2 rounded hover:bg-museum-dark disabled:opacity-50"
                    >
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default Editor;
