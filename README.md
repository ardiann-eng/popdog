# $POPCAT Website - Collect your Pop! 😺

Website $POPCAT modern dengan tampilan dark mode yang elegan, profesional, dan **real-time global leaderboard**!

## ✨ Fitur

- **Animasi $POPCAT** - Gambar berubah setiap kali diklik dengan animasi smooth dan efek visual
- **Global Pops Counter** - Total klik dari seluruh dunia yang update real-time
- **Your Pops Counter** - Penghitung klik personal yang tersimpan per negara
- **🏆 Leaderboard 20 Negara** - Ranking negara dengan pops terbanyak + pops per second
- **Auto-detect Negara** - Otomatis mendeteksi lokasi Anda menggunakan IP geolocation
- **Real-time Sync** - Data sync real-time menggunakan Firebase Realtime Database
- **Dark Mode Premium** - Tampilan modern dengan background #121212 dan accent colors
- **Responsive Design** - Tampilan optimal di desktop dan mobile
- **Social Media Links** - Tautan ke X (Twitter) dan Telegram
- **About Section** - Informasi tentang $POPCAT

## 🛠️ Teknologi

- React 18
- Vite (Lightning fast build tool)
- Tailwind CSS (Utility-first CSS)
- Firebase Realtime Database (Real-time sync)
- localStorage (Personal data persistence)
- IP Geolocation API (Auto-detect negara)

## 🚀 Cara Menjalankan

### Quick Start (Tanpa Firebase) ⭐ RECOMMENDED

Website sudah dilengkapi **Mock Data Mode** yang bisa langsung dijalankan **tanpa setup apapun**:

```bash
# 1. Install dependencies (tanpa Firebase)
npm install --no-optional

# 2. Jalankan development server
npm run dev

# 3. Buka browser dan akses http://localhost:5173
```

**Selesai!** Website akan berjalan dengan data dummy yang simulasi real-time updates!

📖 Detail lengkap: [RUNNING_WITHOUT_FIREBASE.md](./RUNNING_WITHOUT_FIREBASE.md)

### Setup Firebase (Real-time Global Data)

Untuk mendapatkan fitur **real-time global leaderboard** yang sebenarnya:

1. Baca panduan lengkap di **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
2. Buat Firebase project dan Realtime Database
3. Update konfigurasi di `src/firebase/config.js`
4. Jalankan `npm install` dan `npm run dev`

## 📦 Build untuk Production

```bash
npm run build
```

## 👀 Preview Production Build

```bash
npm run preview
```

## 📁 Struktur Folder

```
popcat-website/
├── src/
│   ├── components/
│   │   ├── POPCATImage.jsx      # Komponen gambar interaktif
│   │   ├── TotalPopsCounter.jsx # Counter global & personal
│   │   ├── Leaderboard.jsx      # Leaderboard 20 negara
│   │   ├── RefLinks.jsx         # Social media links
│   │   └── About.jsx            # About modal
│   ├── firebase/
│   │   ├── config.js            # Firebase configuration
│   │   └── service.js           # Firebase service layer
│   ├── App.jsx                  # Main app
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── FIREBASE_SETUP.md            # Panduan setup Firebase
└── README.md                    # Dokumentasi ini
```

## 🎨 Customization

### Warna Theme
Edit `tailwind.config.js` untuk mengubah color scheme:
```javascript
colors: {
  'dark-bg': '#121212',      // Background utama
  'dark-card': '#1A1A1A',    // Card background
  'accent-cyan': '#00D9FF',  // Accent color 1
  'accent-purple': '#9333EA', // Accent color 2
  'text-gray': '#E0E0E0',    // Text color
}
```

### Social Media Links
Edit `src/components/RefLinks.jsx` untuk mengubah URL social media.

---

Made with ❤️ using React + Vite + Tailwind CSS + Firebase
