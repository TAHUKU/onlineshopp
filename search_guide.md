# Panduan Menambahkan Fitur Search

Berikut adalah langkah-langkah untuk menambahkan fitur pencarian produk secara manual di file `src/pages/Products.jsx`.

## File Target: `src/pages/Products.jsx`

Silakan ikuti instruksi di bawah ini. Kode yang perlu ditambahkan/diubah ditandai dengan komentar.

```javascript
// 1. Tambahkan useState di import
import React, { useContext, useState } from 'react'; 
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { ShopContext } from '../context/ShopContext';
import { Search } from 'lucide-react'; // Opsional: Tambahkan icon Search jika ingin

const Products = () => {
    const { addToCart } = useContext(ShopContext);
    
    // 2. Buat state untuk menyimpan kata kunci pencarian
    const [searchQuery, setSearchQuery] = useState('');

    // 3. Filter produk berdasarkan kata kunci
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Collection</h2>
            
            {/* 4. Tambahkan Input Search Disini */}
            <div className="max-w-md mx-auto mb-8 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Cari produk..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* 5. Ubah 'products.map' menjadi 'filteredProducts.map' */}
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
```

## Penjelasan Singkat
1.  **State `searchQuery`**: Menyimpan apa yang Anda ketik di kotak pencarian.
2.  **`filteredProducts`**: Membuat daftar baru yang hanya berisi produk yang namanya cocok dengan `searchQuery`. Kita gunakan `.toLowerCase()` agar pencarian tidak peduli huruf besar/kecil.
3.  **Input Field**: Tempat mengetik. Setiap kali mengetik (`onChange`), kita update `searchQuery`.
4.  **Mapping**: Kita menampilkan `filteredProducts` (daftar yang sudah disaring) alih-alih semua `products`.
