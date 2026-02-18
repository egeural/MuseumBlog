const Footer = () => {
    return (
        <footer className="bg-museum-dark text-white text-center py-6 mt-12">
            <div className="container mx-auto px-4">
                <p className="mb-2 text-lg font-semibold">Museum Explorer</p>
                <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
                <div className="mt-4 flex justify-center gap-4 text-sm opacity-60">
                    <span>Müze Günlüğü</span>
                    <span>•</span>
                    <span>Keşfet</span>
                    <span>•</span>
                    <span>Öğren</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
