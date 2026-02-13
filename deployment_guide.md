# Panduan Deployment (Online-kan Web)

Ya, benar sekali! Langkah terbaik adalah upload ke **GitHub** dulu, lalu sambungkan ke **Vercel** (Hosting Gratis & Cepat).

Berikut langkah-langkahnya:

## Langkah 1: Siapkan Git & GitHub
Anda perlu akun GitHub. Jika belum punya, daftar di [github.com](https://github.com/).

### 1. Inisialisasi Git (Di Terminal VS Code)
Jalankan perintah ini satu per satu di terminal Anda:

```bash
# 1. Matikan server dulu (Ctrl + C) jika sedang jalan

# 2. Inisialisasi Git
git init

# 3. Tambahkan semua file
git add .

# 4. Buat commit pertama
git commit -m "Upload Aplikasi Toko Online"
```

### 2. Buat Repository di GitHub
1.  Buka GitHub, klik tombol **+** di pojok kanan atas > **New repository**.
2.  Nama Repository: `toko-online-react` (atau bebas).
3.  Set ke **Public**.
4.  Klik **Create repository**.
5.  Salin kode yang muncul di bagian **"…or push an existing repository from the command line"**.

### 3. Upload Kode ke GitHub
Tempel (Paste) kode yang Anda salin tadi ke Terminal VS Code, lalu Enter.
Biasanya terlihat seperti ini:

```bash
git remote add origin https://github.com/USERNAME_ANDA/toko-online-react.git
git branch -M main
git push -u origin main
```

---

## Langkah 2: Deploy ke Vercel (Hosting)
Cara ini paling mudah dan otomatis update kalau Anda ubah kode.

1.  Buka [vercel.com](https://vercel.com/) dan Login (pilih **Continue with GitHub**).
2.  Klik **Add New...** > **Project**.
3.  Di daftar "Import Git Repository", cari `toko-online-react` yang barusan Anda buat, klik **Import**.
4.  Di halaman konfigurasi:
    *   **Framework Preset**: Vite (biasanya otomatis terdeteksi).
    *   Klik **Deploy**.
5.  Tunggu sebentar (sekitar 1 menit).
6.  **Selesai!** Anda akan dapat link website (contoh: `toko-online-react.vercel.app`).

Link itu bisa Anda bagikan ke siapa saja! 🌍🚀
