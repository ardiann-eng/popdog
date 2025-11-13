// Firebase configuration
// IMPORTANT: Replace these values with your own Firebase project config
// Get this from Firebase Console > Project Settings > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcq39Uqs8t6RrfTlV23Kb-UY6LHq8XW-Y",
  authDomain: "popcat-global.firebaseapp.com",
  databaseURL: "https://popcat-global-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "popcat-global",
  storageBucket: "popcat-global.firebasestorage.app",
  messagingSenderId: "687859343026",
  appId: "1:687859343026:web:f4280cde889ba1152633ab",
  measurementId: "G-DCQVCMJTSP"
}

// Initialize Firebase (lazy)
let app
let database
let auth
let isAuthInitialized = false

const initializeFirebase = async () => {
  try {
    const { initializeApp } = await import('firebase/app')
    const { getDatabase } = await import('firebase/database')
    const { getAuth, signInAnonymously } = await import('firebase/auth')

    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
    auth = getAuth(app)

    // Sign in anonymously untuk memenuhi security rules
    if (!isAuthInitialized) {
      try {
        await signInAnonymously(auth)
        console.log('✅ User signed in anonymously to Firebase')
        isAuthInitialized = true
      } catch (authError) {
        console.error('❌ Error signing in anonymously:', authError)
      }
    }

    return { app, database, auth }
  } catch (error) {
    console.warn('Firebase initialization failed. Using mock data mode.', error)
    return { app: null, database: null, auth: null }
  }
}

// Auto-initialize if config is filled
if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
  initializeFirebase().then(({ app: firebaseApp, database: firebaseDatabase, auth: firebaseAuth }) => {
    app = firebaseApp
    database = firebaseDatabase
    auth = firebaseAuth
  })
}

export { app, database, auth, initializeFirebase }
