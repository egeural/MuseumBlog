import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MuseumDetail from './pages/MuseumDetail';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Editor from './pages/Admin/Editor';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/museum/:id" element={<MuseumDetail />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
              <Route path="/admin/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
            </Routes>
          </main>
          <footer className="bg-museum-dark text-white text-center py-4 mt-8">
            <p>&copy; {new Date().getFullYear()} Museum Explorer. Tüm hakları saklıdır.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
