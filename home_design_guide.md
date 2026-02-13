# Panduan Mempercantik Halaman Utama (Dashboard)

Ini adalah langkah-langkah untuk mengubah halaman `Home.jsx` yang polos menjadi halaman landing yang modern dan menarik. Kita akan menambahkan **Hero Section** (Banner Besar), **Fitur Unggulan**, dan **Produk Pilihan**.

## File Target: `src/pages/Home.jsx`

Silakan ganti **seluruh isi** file `src/pages/Home.jsx` dengan kode di bawah ini, atau ketik bagian-bagiannya secara bertahap.

### 1. Import Icon dan Komponen
Kita butuh beberapa icon untuk bagian fitur dan komponen `ProductCard` untuk menampilkan produk.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../utils/formatCurrency';
```

### 2. Buat Komponen `Home`
Di dalam fungsi `Home`, kita akan membagi tampilan menjadi 3 bagian utama.

```javascript
const Home = () => {
  // Ambil 3 produk pertama untuk ditampilkan sebagai "Featured"
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* BAGIAN 1: HERO SECTION (Banner Utama) */}
      <div className="relative bg-gray-900 text-white py-24 px-6 overflow-hidden">
        {/* Background Image Effect */}
        <div className="absolute inset-0 opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
                alt="Background" 
                className="w-full h-full object-cover"
            />
        </div>
        
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Gaya Masa Depan <br/> <span className="text-indigo-400">Dimulai Di Sini</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Temukan koleksi eksklusif dengan kualitas terbaik untuk menunjang gaya hidup Anda.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Belanja Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* BAGIAN 2: LAYANAN KAMI (Features) */}
      <div className="py-16 bg-white section-features">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-gray-800">
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                    <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gratis Ongkir</h3>
                <p className="text-gray-500 text-sm">Untuk pesanan di atas Rp 500rb</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Garansi Resmi</h3>
                <p className="text-gray-500 text-sm">Jaminan uang kembali 30 hari</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                    <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Support 24/7</h3>
                <p className="text-gray-500 text-sm">Hubungi kami kapan saja</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pembayaran Aman</h3>
                <p className="text-gray-500 text-sm">100% Transaksi Terenkripsi</p>
            </div>
        </div>
      </div>

      {/* BAGIAN 3: PRODUK PILIHAN (Trending) */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Sedang Tren</h2>
                    <p className="text-gray-500">Produk paling diminati minggu ini</p>
                </div>
                <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1">
                    Lihat Semua <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                    // Note: Kita menggunakan ProductCard yang sudah ada, tapi tanpa fungsi AddToCart di sini agar lebih simpel
                    // Atau Anda bisa menambahkan dummy function
                    <div key={product.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                         <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
```

## Penjelasan

1.  **Hero Section**: Bagian paling atas dengan gambar background besar dan tombol "Belanja Sekarang". Ini memberikan kesan pertama yang profesional.
2.  **Features Section**: Menampilkan icon (Truk, Perisai, Jam) untuk memberitahu user kelebihan toko Anda (Trust signals).
3.  **Featured Products**: Menampilkan 3 produk pertama dari data `products` agar user langsung melihat barang dagangan tanpa harus klik menu "Products".
