# 🔥 Firebase Setup Guide untuk $POPCAT Website

Website ini sudah dilengkapi dengan **Mock Data Mode** sehingga bisa langsung dijalankan tanpa Firebase. Namun, untuk mendapatkan fitur **real-time global leaderboard** yang sebenarnya, Anda perlu setup Firebase.

## 📋 Opsi 1: Menggunakan Mock Data (Tanpa Firebase)

Website sudah otomatis menggunakan mock data jika Firebase belum di-setup. Anda bisa langsung:

```bash
npm install
npm run dev
```

**Fitur Mock Data:**
- Data dummy 20 negara dengan pops
- Simulasi update real-time setiap 2-3 detik
- Tidak ada persistensi global (data lokal di browser)

---

## 🚀 Opsi 2: Setup Firebase (Real-time Global Data)

### Langkah 1: Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** atau **"Tambahkan project"**
3. Beri nama project (contoh: `popcat-global`)
4. (Opsional) Aktifkan Google Analytics
5. Klik **"Create project"**

### Langkah 2: Setup Realtime Database

1. Di Firebase Console, pilih project Anda
2. Klik **"Realtime Database"** di menu samping
3. Klik **"Create Database"**
4. Pilih lokasi server (pilih yang terdekat dengan mayoritas user):
   - `asia-southeast1` untuk Asia Tenggara
   - `us-central1` untuk Amerika
   - `europe-west1` untuk Eropa
5. Pilih **"Start in test mode"** (untuk development)
6. Klik **"Enable"**

### Langkah 3: Atur Database Rules

Setelah database dibuat, klik tab **"Rules"** dan ganti dengan:

```json
{
  "rules": {
    "countries": {
      "$countryCode": {
        ".read": true,
        ".write": true,
        "code": {
          ".validate": "newData.isString()"
        },
        "totalPops": {
          ".validate": "newData.isNumber()"
        },
        "popsPerSecond": {
          ".validate": "newData.isNumber()"
        }
      }
    },
    "global": {
      ".read": true,
      ".write": true,
      "totalPops": {
        ".validate": "newData.isNumber()"
      }
    }
  }
}
```

**Catatan:** Untuk production, gunakan rules yang lebih ketat dengan authentication.

### Langkah 4: Daftar Web App

1. Di Firebase Console, klik ⚙️ **Settings** > **Project settings**
2. Scroll ke bawah, klik **"Add app"** > pilih **Web** (ikon `</>``)
3. Beri nama app (contoh: `popcat-web`)
4. (Opsional) Centang **"Also set up Firebase Hosting"**
5. Klik **"Register app"**
6. Copy **Firebase configuration** object yang muncul

### Langkah 5: Update Firebase Config

Buka file `src/firebase/config.js` dan ganti dengan config Anda:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAcq39Uqs8t6RrfTlV23Kb-UY6LHq8XW-Y",
  authDomain: "popcat-global.firebaseapp.com",
  databaseURL: "https://popcat-global-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "popcat-global",
  storageBucket: "popcat-global.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

**PENTING:** `databaseURL` harus sesuai dengan region yang Anda pilih saat setup Realtime Database.

### Langkah 6: Install Dependencies & Run

```bash
npm install
npm run dev
```

Website akan otomatis:
- ✅ Menggunakan Firebase Realtime Database
- ✅ Sync data real-time antar semua user
- ✅ Menghitung Pops Per Second secara otomatis
- ✅ Auto-detect negara user

---

## 🔐 Security: Production Rules

Untuk production, gunakan rules yang lebih ketat:

```json
{
  "rules": {
    "countries": {
      "$countryCode": {
        ".read": true,
        ".write": "auth != null",
        "totalPops": {
          ".validate": "newData.isNumber() && newData.val() >= data.val()"
        }
      }
    },
    "global": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

Ini memastikan:
- Semua orang bisa membaca data
- Hanya authenticated users yang bisa menulis
- TotalPops hanya bisa bertambah (tidak bisa dikurangi)

---

## 📊 Database Structure

Firebase Realtime Database akan memiliki struktur seperti ini:

```json
{
  "global": {
    "totalPops": 350000000
  },
  "countries": {
    "ID": {
      "code": "ID",
      "totalPops": 12500000,
      "popsPerSecond": 1250
    },
    "US": {
      "code": "US",
      "totalPops": 45000000,
      "popsPerSecond": 2100
    }
    // ... negara lainnya
  }
}
```

---

## 🐛 Troubleshooting

### Error: "Permission denied"
- Pastikan Database Rules sudah di-set dengan benar
- Untuk testing, gunakan test mode (write/read: true)

### Data tidak update real-time
- Cek apakah `databaseURL` sudah benar di config
- Periksa Console browser untuk error

### Website masih pakai Mock Data
- Pastikan Firebase config sudah diisi dengan benar
- Cek Console browser, seharusnya tidak ada warning "Firebase initialization failed"

---

## 💡 Tips Optimization

1. **Rate Limiting**: Tambahkan delay/throttling di frontend agar tidak spam database
2. **Caching**: Gunakan Firebase local cache untuk reduce read operations
3. **Indexing**: Buat index untuk query yang sering dipakai
4. **Region**: Pilih Firebase region yang dekat dengan mayoritas user

---

## 📈 Monitoring

Di Firebase Console, Anda bisa monitor:
- **Database usage**: Realtime > Usage
- **Concurrent connections**: Realtime > Usage
- **Data transfer**: Realtime > Usage
- **Rules evaluation**: Realtime > Rules

---

## 🆓 Firebase Free Tier Limits

- **Concurrent connections**: 100
- **GB stored**: 1 GB
- **GB downloaded**: 10 GB/month

Untuk website dengan traffic tinggi, pertimbangkan upgrade ke Blaze plan (pay-as-you-go).

---

**Happy Popping! 😺**
