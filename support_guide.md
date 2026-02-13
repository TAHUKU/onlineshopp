# Panduan Membuat Halaman Layanan Bantuan (Service/Support)

Fitur ini memungkinkan pelanggan mengirim laporan masalah atau pertanyaan melalui formulir. Kita akan membuat halaman khusus `/support` yang berisi formulir kontak.

## Langkah 1: Buat Halaman Support
Buat file baru: `src/pages/Support.jsx`

```javascript
import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi pengiriman data
        console.log("Laporan dikirim:", formData);
        setSubmitted(true);
        // Reset form setelah 3 detik
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Pusat Bantuan</h2>
                    <p className="text-gray-500 mt-2">Ada masalah dengan produk? Ceritakan kepada kami.</p>
                </div>

                {submitted ? (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-6">
                        Terima kasih! Laporan Anda telah kami terima. Tim kami akan segera menghubungi Anda.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Masukkan nama Anda"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="email@contoh.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pesan / Keluhan</label>
                            <textarea
                                name="message"
                                required
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Jelaskan masalah Anda secara detail..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Kirim Laporan
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Support;
```

## Langkah 2: Daftarkan Halaman di `App.jsx`
Agar halaman ini bisa dibuka, kita harus menambahkannya ke sistem routing.

Buka `src/App.jsx`:
1.  Import halaman baru di atas:
    ```javascript
    import Support from './pages/Support';
    ```
2.  Tambahkan Route baru:
    ```javascript
    <Routes>
      {/* ... route lainnya ... */}
      <Route path="/support" element={<Support />} />
    </Routes>
    ```

## Langkah 3: Tambahkan Link di Navbar
Supaya user bisa menemukan halaman ini, tambahkan menu di `src/components/Navbar.jsx`.

Buka `src/components/Navbar.jsx`:
Cari bagian link menu, dan tambahkan link ke `/support`.

```javascript
// ... di dalam bagian return ...
<div className="flex space-x-6 items-center">
    <Link to="/" className="...">Home</Link>
    <Link to="/products" className="...">Products</Link>
    
    {/* TAMBAHKAN INI: */}
    <Link to="/support" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
        Bantuan
    </Link>
    
    <Link to="/cart" ...>...</Link>
</div>
```

## Selesai!
Sekarang Anda punya menu "Bantuan" di navbar yang akan membuka formulir pengaduan masalah.
