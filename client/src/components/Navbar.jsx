import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-museum-dark shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                    🌍 <span className="hidden md:inline">Museum Explorer</span>
                </Link>
                <div className="flex gap-4">
                    <Link to="/" className="text-white hover:text-museum-light transition">Anasayfa</Link>
                    <Link to="/#turkiye" className="text-white hover:text-museum-light transition">Türkiye</Link>
                    <Link to="/#dunya" className="text-white hover:text-museum-light transition">Dünya</Link>
                    <Link to="/admin/dashboard" className="text-gray-600 hover:text-museum font-medium">Yönetici Paneli</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
