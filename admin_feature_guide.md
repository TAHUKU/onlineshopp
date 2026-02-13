# Panduan Membuat Dashboard Admin (Lihat Laporan)

Fitur ini terdiri dari 2 bagian:
1.  **Simpan Laporan**: Mengubah halaman Support agar laporan tersimpan (kita pakai `localStorage` sebagai database sementara).
2.  **Halaman Admin**: Halaman khusus dengan login untuk melihat laporan yang tersimpan.

---

## Langkah 1: Update Halaman Support (`src/pages/Support.jsx`)
Kita perlu mengedit file `Support.jsx` agar data yang dikirim disimpan ke memori browser.

Ganti bagian `handleSubmit` dengan kode berikut:

```javascript
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- KODE BARU MULAI SINI ---
        // 1. Ambil data lama dari localStorage (kalau ada)
        const existingReports = JSON.parse(localStorage.getItem('support_reports') || '[]');
        
        // 2. Tambahkan laporan baru dengan tanggal
        const newReport = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            ...formData
        };
        
        // 3. Simpan kembali ke localStorage
        localStorage.setItem('support_reports', JSON.stringify([newReport, ...existingReports]));
        // --- KODE BARU SELESAI ---

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };
```

---

## Langkah 2: Buat Halaman Admin (`src/pages/Admin.jsx`)
Buat file baru bernama `src/pages/Admin.jsx`. Halaman ini punya fitur Login sederhana.

```javascript
import React, { useState, useEffect } from 'react';
import { Lock, User, Trash2, LogOut } from 'lucide-react';

const Admin = () => {
    // State untuk login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // State untuk data laporan
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Cek apakah sudah login sebelumnya (opsional)
        const session = sessionStorage.getItem('admin_session');
        if (session === 'active') {
            setIsLoggedIn(true);
            loadReports();
        }
    }, []);

    const loadReports = () => {
        const data = JSON.parse(localStorage.getItem('support_reports') || '[]');
        setReports(data);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // LOGIN SEDERHANA (Hardcoded)
        // Username: admin
        // Password: password123
        if (username === 'admin' && password === 'password123') {
            setIsLoggedIn(true);
            sessionStorage.setItem('admin_session', 'active'); // Simpan sesi login
            loadReports();
            setError('');
        } else {
            setError('Username atau Password salah!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('admin_session');
        setUsername('');
        setPassword('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus laporan ini?')) {
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
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium bg-red-50 px-4 py-2 rounded-lg transition"
                >
                    <LogOut className="w-4 h-4" /> Returns
                    Logout
                </button>
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada laporan masuk.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{report.name}</h3>
                                    <p className="text-sm text-gray-500">{report.email}</p>
                                </div>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    {report.date}
                                </span>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-4">
                                {report.message}
                            </p>
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => handleDelete(report.id)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                    title="Hapus Laporan"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
```

---

## Langkah 3: Daftarkan Route Admin (`src/App.jsx`)
Terakhir, tambahkan route agar halaman ini bisa diakses lewat URL `/admin`.

File `src/App.jsx`:
```javascript
// ... import lainnya
import Admin from './pages/Admin'; // Import halaman Admin

// ... di dalam <Routes> ...
<Route path="/admin" element={<Admin />} />
```

---
## Cara Menggunakan
1.  Buka browser, masuk ke `http://localhost:5173/admin` (atau port yang sesuai).
2.  Login dengan:
    *   **Username**: admin
    *   **Password**: password123
3.  Di sana Anda bisa melihat semua pesan yang dikirim lewat halaman Support.
