# 🚀 Quick Start Guide

## Langkah-Langkah Menjalankan Website

### 1️⃣ Install Dependencies

Buka terminal/command prompt di folder `popcat-website` dan jalankan:

```bash
npm install
```

Tunggu sampai selesai (biasanya 1-2 menit).

### 2️⃣ Jalankan Development Server

```bash
npm run dev
```

Anda akan melihat output seperti:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3️⃣ Buka Browser

Buka browser (Chrome, Firefox, Edge, dll) dan akses:
```
http://localhost:5173
```

**Selesai!** Website sudah berjalan! 🎉

---

## 🎮 Cara Menggunakan Website

1. **Klik Popcat** - Klik gambar kucing untuk menambah counter
2. **Lihat Stats** - Lihat total pops Anda dan global pops di bagian atas
3. **Cek Leaderboard** - Scroll ke bawah untuk melihat ranking 20 negara
4. **Switch Tab** - Klik tab "Pops/Second" untuk lihat ranking pops per detik
5. **About** - Klik tombol info (i) di pojok kiri bawah untuk info tentang Popcat

---

## 💡 Mode Operasi

### Mock Data Mode (Default)

Website akan otomatis berjalan dengan **Mock Data Mode** karena Firebase belum di-setup.

**Fitur Mock Mode:**
- ✅ Data dummy 20 negara
- ✅ Simulasi update real-time
- ✅ Counter personal (tersimpan di browser)
- ⚠️ Data global **tidak** tersimpan (reset setiap refresh)

### Real Firebase Mode

Untuk mendapatkan **real-time global sync**:

1. Ikuti panduan di **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
2. Setup Firebase project
3. Update `src/firebase/config.js` dengan config Anda
4. Restart server (`npm run dev`)

Setelah itu:
- ✅ Data global tersimpan di cloud
- ✅ Real-time sync dengan user lain
- ✅ Leaderboard real dari seluruh dunia
- ✅ Data tidak hilang saat refresh

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server (dengan hot reload)
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

---

## 🌍 Auto-detect Negara

Website akan otomatis mendeteksi negara Anda menggunakan **IP Geolocation API**.

Jika deteksi gagal, default ke **Indonesia (ID)**.

Anda bisa melihat negara Anda di counter: `[KODE_NEGARA] Your Pops`

---

## 📱 Responsive Design

Website ini fully responsive dan optimal di:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

---

## 🎨 Tampilan

- **Dark Mode** premium (#121212 background)
- **Gradient effects** untuk teks dan border
- **Smooth animations** saat klik
- **Glow effects** dan ripple saat pop
- **Custom scrollbar** dengan accent color

---

## ❓ Troubleshooting

### Port 5173 sudah digunakan

Jika port 5173 sudah dipakai aplikasi lain:

```bash
# Vite akan otomatis gunakan port lain (5174, 5175, dll)
npm run dev
```

Atau edit `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port custom
  },
})
```

### Module not found

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
```

### Browser tidak terbuka otomatis

Buka manual di `http://localhost:5173` atau port yang ditampilkan di terminal.

---

## 🔥 Tips

1. **Spam Click**: Coba klik super cepat untuk lihat animasi!
2. **Keyboard**: Tekan Space atau Enter saat fokus di Popcat
3. **DevTools**: Buka F12 untuk lihat Firebase sync logs
4. **Competition**: Ajak teman untuk compete di leaderboard!

---

**Have fun popping! 😺💥**
