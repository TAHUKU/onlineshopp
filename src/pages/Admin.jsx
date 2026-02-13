import React, {useState, useEffect} from "react";
import { Lock, User, Trash2, LogOut } from "lucide-react";

const Admin = () => {
    //  State untuk login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // State untuk menyimpan laporan
    const [reports, setReports] = useState([]);

  useEffect(() => {
        // Cek apakah sudah login sebelumnya (opsional)
        const session = sessionStorage.getItem('admin_session');
        if (session === 'active') {
            setIsLoggedIn(true);
            loadReports();
        }
    }, []);

    // Fungsi untuk memuat laporan dari localStorage
    const loadReports = () => {
        const data = JSON.parse(localStorage.getItem('support_reports') || '[]');
        setReports(data);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'Hakkul' && password === 'Hakkul230505') {
            sessionStorage.setItem('admin_session', 'active');
            setIsLoggedIn(true);
            loadReports();
        } else {
            setError('Username atau password salah');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_session');
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setError('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus laporan ini?')) {
            const updatedReports = reports.filter(report => report.id !== id);
            localStorage.setItem('support_reports', JSON.stringify(updatedReports));
            setReports(updatedReports);
        }
    };

    // --- TAMPILAN JIKA BELUM LOGIN ---
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <div className="text-center mb-6">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                    </div>
                    
                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- TAMPILAN JIKA SUDAH LOGIN (DASHBOARD) ---
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Laporan Masuk</h2>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">Belum ada laporan masuk.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{report.name}</h3>
                                    <p className="text-sm text-gray-500">{report.email}</p>
                                    <p className="text-sm text-gray-400 mt-1">{report.date}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(report.id)}
                                    className="text-gray-400 hover:text-red-600 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 whitespace-pre-wrap">{report.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;