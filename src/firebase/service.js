// Lazy import Firebase only when needed
let firebaseDB = null
let database = null

const loadFirebase = async () => {
  try {
    const { ref, onValue, set, runTransaction, get } = await import('firebase/database')
    const { database: db } = await import('./config.js')
    firebaseDB = { ref, onValue, set, runTransaction, get }
    database = db
    return true
  } catch (error) {
    console.warn('Firebase not available. Using mock data mode.')
    return false
  }
}

// Mock data untuk development (jika Firebase belum di-setup)
// Angka random panjang yang realistic
const MOCK_DATA = {
  countries: {
    'US': { code: 'US', totalPops: 775276119, popsPerSecond: 12847 },
    'BR': { code: 'BR', totalPops: 658392847, popsPerSecond: 10932 },
    'JP': { code: 'JP', totalPops: 523847291, popsPerSecond: 9234 },
    'IN': { code: 'IN', totalPops: 498273651, popsPerSecond: 8892 },
    'ID': { code: 'ID', totalPops: 421956783, popsPerSecond: 8123 },
    'GB': { code: 'GB', totalPops: 387294658, popsPerSecond: 7456 },
    'DE': { code: 'DE', totalPops: 352817493, popsPerSecond: 6891 },
    'FR': { code: 'FR', totalPops: 318562947, popsPerSecond: 6234 },
    'CA': { code: 'CA', totalPops: 287493615, popsPerSecond: 5678 },
    'AU': { code: 'AU', totalPops: 256738294, popsPerSecond: 5234 },
    'IT': { code: 'IT', totalPops: 234567891, popsPerSecond: 4892 },
    'ES': { code: 'ES', totalPops: 213948576, popsPerSecond: 4456 },
    'MX': { code: 'MX', totalPops: 192837465, popsPerSecond: 4123 },
    'KR': { code: 'KR', totalPops: 178492563, popsPerSecond: 3892 },
    'NL': { code: 'NL', totalPops: 165738294, popsPerSecond: 3567 },
    'PL': { code: 'PL', totalPops: 152648391, popsPerSecond: 3289 },
    'SE': { code: 'SE', totalPops: 143857629, popsPerSecond: 3012 },
    'TR': { code: 'TR', totalPops: 132946578, popsPerSecond: 2845 },
    'TH': { code: 'TH', totalPops: 124738291, popsPerSecond: 2634 },
    'VN': { code: 'VN', totalPops: 115629384, popsPerSecond: 2456 },
  },
  global: {
    totalPops: 5837492683,
  }
}

let USE_MOCK_DATA = true

// Initialize Firebase check
const initFirebase = async () => {
  const loaded = await loadFirebase()
  USE_MOCK_DATA = !loaded || !database
  return !USE_MOCK_DATA
}

// Subscribe to global pops
export const subscribeToGlobalPops = (callback) => {
  if (USE_MOCK_DATA || !database || !firebaseDB) {
    callback(MOCK_DATA.global.totalPops)
    // Simulate real-time updates dengan increment random
    const interval = setInterval(() => {
      MOCK_DATA.global.totalPops += Math.floor(Math.random() * 5000) + 2000
      callback(MOCK_DATA.global.totalPops)
    }, 2000)
    return () => clearInterval(interval)
  }

  const globalRef = firebaseDB.ref(database, 'global/totalPops')
  const unsubscribe = firebaseDB.onValue(globalRef, (snapshot) => {
    callback(snapshot.val() || 0)
  })
  return unsubscribe
}

// Subscribe to leaderboard data
export const subscribeToLeaderboard = (callback) => {
  if (USE_MOCK_DATA || !database || !firebaseDB) {
    const countriesArray = Object.values(MOCK_DATA.countries)
    callback(countriesArray)

    // Simulate real-time updates dengan increment random realistic
    const interval = setInterval(() => {
      Object.keys(MOCK_DATA.countries).forEach(code => {
        // Increment random yang berbeda per negara
        const increment = Math.floor(Math.random() * 500) + 200
        MOCK_DATA.countries[code].totalPops += increment
        // Pops per second juga berubah sedikit
        MOCK_DATA.countries[code].popsPerSecond += Math.floor(Math.random() * 20) - 10
        // Pastikan tidak negatif
        MOCK_DATA.countries[code].popsPerSecond = Math.max(100, MOCK_DATA.countries[code].popsPerSecond)
      })
      callback(Object.values(MOCK_DATA.countries))
    }, 3000)
    return () => clearInterval(interval)
  }

  const leaderboardRef = firebaseDB.ref(database, 'countries')
  const unsubscribe = firebaseDB.onValue(leaderboardRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      const countriesArray = Object.values(data)
      callback(countriesArray)
    } else {
      callback([])
    }
  })
  return unsubscribe
}

// Increment pop for a country
// NOTE: This updates Firebase aggregate (for leaderboard & global counter)
// Personal "Your Pops" counter is handled separately with localStorage
export const incrementPop = async (countryCode) => {
  if (USE_MOCK_DATA || !database || !firebaseDB) {
    if (!MOCK_DATA.countries[countryCode]) {
      MOCK_DATA.countries[countryCode] = {
        code: countryCode,
        totalPops: 0,
        popsPerSecond: 0,
      }
    }
    MOCK_DATA.countries[countryCode].totalPops += 1
    MOCK_DATA.global.totalPops += 1
    return
  }

  // Update country pops (for leaderboard)
  const countryRef = firebaseDB.ref(database, `countries/${countryCode}/totalPops`)
  await firebaseDB.runTransaction(countryRef, (currentValue) => {
    return (currentValue || 0) + 1
  })

  // Update global pops
  const globalRef = firebaseDB.ref(database, 'global/totalPops')
  await firebaseDB.runTransaction(globalRef, (currentValue) => {
    return (currentValue || 0) + 1
  })

  // Update country code
  const countryCodeRef = firebaseDB.ref(database, `countries/${countryCode}/code`)
  await firebaseDB.set(countryCodeRef, countryCode)
}

// Initialize country if not exists
export const initializeCountry = async (countryCode) => {
  if (USE_MOCK_DATA || !database || !firebaseDB) return

  const countryRef = firebaseDB.ref(database, `countries/${countryCode}`)
  const snapshot = await firebaseDB.get(countryRef)

  if (!snapshot.exists()) {
    // Generate random initial pops (100k - 1M)
    const randomPops = Math.floor(Math.random() * 900000) + 100000
    await firebaseDB.set(countryRef, {
      code: countryCode,
      totalPops: randomPops,
      popsPerSecond: Math.floor(Math.random() * 5000) + 1000,
    })
  }
}

// Initialize database with random data for all countries (one-time setup)
export const initializeDatabaseWithRandomData = async () => {
  if (USE_MOCK_DATA || !database || !firebaseDB) return

  const globalRef = firebaseDB.ref(database, 'global/totalPops')
  const globalSnapshot = await firebaseDB.get(globalRef)

  // Only initialize if database is empty
  if (!globalSnapshot.exists()) {
    console.log('🎲 Initializing database with random data...')

    let totalGlobalPops = 0

    // Initialize all countries from MOCK_DATA with random values
    for (const [code, mockCountry] of Object.entries(MOCK_DATA.countries)) {
      const countryRef = firebaseDB.ref(database, `countries/${code}`)
      const randomPops = mockCountry.totalPops + Math.floor(Math.random() * 100000)

      await firebaseDB.set(countryRef, {
        code: code,
        totalPops: randomPops,
        popsPerSecond: mockCountry.popsPerSecond + Math.floor(Math.random() * 1000),
      })

      totalGlobalPops += randomPops
    }

    // Set global total
    await firebaseDB.set(globalRef, totalGlobalPops)
    console.log('✅ Database initialized with random data!')
  }
}

// NOTE: Personal counter (Your Pops) menggunakan localStorage, bukan Firebase
// Firebase country pops hanya untuk aggregate leaderboard saja

// Calculate pops per second for all countries
export const calculatePopsPerSecond = async () => {
  if (USE_MOCK_DATA || !database || !firebaseDB) return

  const countriesRef = firebaseDB.ref(database, 'countries')
  const snapshot = await firebaseDB.get(countriesRef)

  if (snapshot.exists()) {
    const countries = snapshot.val()
    const previousPops = {}

    // Store current pops
    Object.keys(countries).forEach(code => {
      previousPops[code] = countries[code].totalPops || 0
    })

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get new pops and calculate difference
    const newSnapshot = await firebaseDB.get(countriesRef)
    const newCountries = newSnapshot.val()

    Object.keys(newCountries).forEach(async (code) => {
      const diff = (newCountries[code].totalPops || 0) - (previousPops[code] || 0)
      const ppsRef = firebaseDB.ref(database, `countries/${code}/popsPerSecond`)
      await firebaseDB.set(ppsRef, Math.max(0, diff))
    })
  }
}

// Auto-calculate PPS every second
let ppsInterval = null
export const startPopsPerSecondCalculation = () => {
  if (USE_MOCK_DATA || ppsInterval || !database || !firebaseDB) return

  ppsInterval = setInterval(() => {
    calculatePopsPerSecond()
  }, 1000)
}

export const stopPopsPerSecondCalculation = () => {
  if (ppsInterval) {
    clearInterval(ppsInterval)
    ppsInterval = null
  }
}

// Auto-increment simulation: Simulate global activity every 2-3 seconds
// NOTE: This ONLY affects Firebase data (leaderboard & global counter)
// User's personal "Your Pops" counter is NOT affected (localStorage only)
let autoIncrementInterval = null
export const startAutoIncrement = () => {
  if (USE_MOCK_DATA || autoIncrementInterval || !database || !firebaseDB) return

  console.log('🚀 Starting auto-increment simulation (every 2-3 seconds)')
  console.log('   → Only affects: Global Pops & Leaderboard')
  console.log('   → Does NOT affect: Your Pops (personal counter)')

  const incrementAllCountries = async () => {
    try {
      const countriesRef = firebaseDB.ref(database, 'countries')
      const snapshot = await firebaseDB.get(countriesRef)

      if (snapshot.exists()) {
        const countries = snapshot.val()
        let totalIncrement = 0

        // Increment each country by random amount
        for (const code of Object.keys(countries)) {
          const increment = Math.floor(Math.random() * 500) + 200 // 200-700 per country
          const countryRef = firebaseDB.ref(database, `countries/${code}/totalPops`)

          await firebaseDB.runTransaction(countryRef, (currentValue) => {
            return (currentValue || 0) + increment
          })

          totalIncrement += increment
        }

        // Update global total
        const globalRef = firebaseDB.ref(database, 'global/totalPops')
        await firebaseDB.runTransaction(globalRef, (currentValue) => {
          return (currentValue || 0) + totalIncrement
        })
      }
    } catch (error) {
      console.error('Error in auto-increment:', error)
    }
  }

  // Run every 2-3 seconds (random interval for more realistic feel)
  const scheduleNext = () => {
    const delay = Math.floor(Math.random() * 1000) + 2000 // 2000-3000ms
    autoIncrementInterval = setTimeout(async () => {
      await incrementAllCountries()
      scheduleNext()
    }, delay)
  }

  scheduleNext()
}

export const stopAutoIncrement = () => {
  if (autoIncrementInterval) {
    clearTimeout(autoIncrementInterval)
    autoIncrementInterval = null
  }
}

// Try to initialize Firebase on module load
initFirebase().then(() => {
  // Initialize database with random data if needed
  initializeDatabaseWithRandomData().catch(err => {
    console.log('Database already initialized or error:', err)
  })
}).catch(() => {
  console.log('Running in Mock Data Mode')
})

export { USE_MOCK_DATA, initFirebase }
