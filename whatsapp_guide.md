# Panduan Menambahkan Tombol Chat WhatsApp

Fitur ini akan menambahkan tombol melayang (floating button) di pojok kanan bawah yang langsung membuka WhatsApp saat diklik.

## Langkah 1: Buat Komponen Baru
Buat file baru: `src/components/WhatsAppButton.jsx`

```javascript
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    // Ganti dengan nomor WhatsApp Anda (format: 628xxx)
    const phoneNumber = "6285161427189"; 
    const message = "Halo, saya tertarik dengan produk Anda!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center"
            title="Chat di WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </a>
    );
};

export default WhatsAppButton;
```

## Langkah 2: Pasang di Aplikasi Utama
Buka file: `src/App.jsx`

1.  Import komponen yang baru dibuat di paling atas:
    ```javascript
    import WhatsAppButton from './components/WhatsAppButton';
    ```

2.  Letakkan `<WhatsAppButton />` di dalam `Router`, bisa di dekat `<Footer />` atau di bawah `<Navbar />`, tapi harus di dalam `<div>` utama.

    Contoh `App.jsx` setelah diedit:
    ```javascript
    // ... import lainnya
    import WhatsAppButton from './components/WhatsAppButton'; // <-- TAMBAHKAN INI

    function App() {
      return (
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* ... daftar routes ... */}
              </Routes>
            </main>
            
            <WhatsAppButton /> {/* <-- TAMBAHKAN INI */}
            
            <Footer />
          </div>
        </Router>
      );
    }
    // ...
    ```

## Selesai!
Sekarang tombol WhatsApp warna hijau akan selalu muncul di pojok kanan bawah di semua halaman.
