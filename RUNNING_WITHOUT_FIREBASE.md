# ✅ Cara Menjalankan Tanpa Firebase

Website ini **sudah siap dijalankan** tanpa perlu install atau setup Firebase!

## 🚀 Quick Start

```bash
# 1. Install dependencies (tanpa Firebase)
npm install --no-optional

# 2. Jalankan dev server
npm run dev

# 3. Buka http://localhost:5173
```

**Selesai!** Website akan berjalan dengan **Mock Data Mode**.

---

## 🎮 Mode Mock Data

Saat berjalan tanpa Firebase, website menggunakan data simulasi:

### ✅ Yang Berfungsi:
- Klik Popcat dan counter naik
- Counter personal tersimpan di browser (localStorage)
- Leaderboard 20 negara dengan data dummy
- Simulasi real-time updates (data naik setiap 2-3 detik)
- Tab switching (Total Pops vs Pops/Second)
- Auto-detect negara
- Semua animasi dan UI

### ⚠️ Limitasi:
- Global counter **tidak** tersinkron antar user
- Data global **reset** setiap refresh halaman
- Leaderboard menggunakan data dummy (bukan real)

---

## 📊 Data Mock

Website akan menampilkan 20 negara dengan data seperti:

| Rank | Country | Total Pops | Pops/Second |
|------|---------|------------|-------------|
| 1    | 🇺🇸 US  | 45M        | 2,100       |
| 2    | 🇧🇷 BR  | 38M        | 1,800       |
| 3    | 🇯🇵 JP  | 28M        | 1,500       |
| ...  | ...     | ...        | ...         |

Data ini akan **otomatis bertambah** setiap beberapa detik untuk simulasi real-time.

---

## 🔄 Upgrade ke Firebase (Opsional)

Jika nanti ingin fitur real-time global:

1. Install Firebase:
   ```bash
   npm install firebase
   ```

2. Setup Firebase project (lihat [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

3. Update config di `src/firebase/config.js`

4. Restart server:
   ```bash
   npm run dev
   ```

Website akan otomatis beralih ke **Firebase Mode**!

---

## 💡 Tips

### Untuk Development Lokal
Mock Data Mode **sangat cocok** untuk:
- Testing UI/UX
- Development fitur baru
- Demo tanpa internet
- Presentasi offline

### Untuk Production
Jika ingin deploy untuk public dengan data real:
- Gunakan Firebase Mode
- Setup rules yang proper
- Monitor usage di Firebase Console

---

## 🛠️ Troubleshooting

### Error "Cannot find module 'firebase'"
Ini **normal** jika Anda tidak install Firebase. Website akan otomatis gunakan Mock Mode.

Jika mau hilangkan warning, install Firebase:
```bash
npm install firebase
```

### Data tidak tersimpan saat refresh
Mock Mode memang tidak simpan global data. Hanya personal counter (Your Pops) yang tersimpan di browser.

Untuk global persistence, gunakan Firebase.

---

## 🎨 Customization

Anda bisa edit data dummy di `src/firebase/service.js`:

```javascript
const MOCK_DATA = {
  countries: {
    'ID': { code: 'ID', totalPops: 12500000, popsPerSecond: 1250 },
    // Tambah/edit negara di sini
  },
  global: {
    totalPops: 350000000, // Edit total global
  }
}
```

---

**Enjoy! 😺**
