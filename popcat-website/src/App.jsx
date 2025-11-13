import { useState, useEffect } from 'react'
import POPCATImage from './components/POPCATImage'
import TotalPopsCounter from './components/TotalPopsCounter'
import Leaderboard from './components/Leaderboard'
import RefLinks from './components/RefLinks'
import About from './components/About'
import Achievement from './components/Achievement'
import {
  subscribeToGlobalPops,
  subscribeToLeaderboard,
  incrementPop,
  initializeCountry,
  startPopsPerSecondCalculation,
  startAutoIncrement,
  USE_MOCK_DATA
} from './firebase/service'

function App() {
  // DATA STRUCTURE:
  // 1. totalPops (YOUR POPS) = localStorage (personal, manual clicks only)
  // 2. globalPops (GLOBAL POPS) = Firebase (auto-increment + all users)
  // 3. leaderboardData = Firebase (auto-increment + all users per country)

  const [totalPops, setTotalPops] = useState(0) // Personal counter - localStorage
  const [globalPops, setGlobalPops] = useState(0) // Global counter - Firebase
  const [isPopping, setIsPopping] = useState(false)
  const [userCountry, setUserCountry] = useState('ID') // Default Indonesia
  const [leaderboardData, setLeaderboardData] = useState([])

  // Auto-detect negara user
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          setUserCountry(data.country_code)
          // Initialize country in Firebase
          initializeCountry(data.country_code)
        }
      })
      .catch(() => {
        // Fallback ke Indonesia jika gagal
        setUserCountry('ID')
        initializeCountry('ID')
      })
  }, [])

  // Subscribe to global pops dari Firebase
  useEffect(() => {
    const unsubscribe = subscribeToGlobalPops((pops) => {
      setGlobalPops(pops)
    })

    return () => unsubscribe()
  }, [])

  // Subscribe to leaderboard data dari Firebase
  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((data) => {
      setLeaderboardData(data)
    })

    return () => unsubscribe()
  }, [])

  // Start PPS calculation and Auto-increment
  useEffect(() => {
    if (!USE_MOCK_DATA) {
      startPopsPerSecondCalculation()
      startAutoIncrement()
    }
  }, [])

  // Load personal pops dari localStorage (YOUR POPS - PERSONAL DATA)
  useEffect(() => {
    if (!userCountry) return

    const savedPops = localStorage.getItem(`totalPops_${userCountry}`)
    if (savedPops) {
      setTotalPops(parseInt(savedPops))
    } else {
      setTotalPops(0) // Start from 0 for new users
    }
  }, [userCountry])

  // Save personal pops to localStorage whenever it changes
  useEffect(() => {
    if (userCountry) {
      localStorage.setItem(`totalPops_${userCountry}`, totalPops.toString())
    }
  }, [totalPops, userCountry])

  const handlePop = async () => {
    // Increment personal counter (localStorage)
    setTotalPops(prev => prev + 1)
    setIsPopping(true)

    // Increment country & global counter in Firebase (for leaderboard)
    try {
      await incrementPop(userCountry)
    } catch (error) {
      console.error('Failed to increment pop:', error)
    }

    // Reset animasi setelah 150ms
    setTimeout(() => {
      setIsPopping(false)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-cyan opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>

      {/* Social Media Links */}
      <RefLinks />

      {/* Header with Total Pops */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            $POPCAT
          </h1>
          <p className="text-text-gray text-sm md:text-base font-light mb-4">
            Collect your Pop! 😺
          </p>
        </div>

        {/* Total Pops Counter - Moved to Top */}
        <TotalPopsCounter
          totalPops={totalPops}
          globalPops={globalPops}
          userCountry={userCountry}
        />
      </div>

      {/* Main Content - Centered Popcat */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-[60vh]">
        <POPCATImage isPopping={isPopping} onPop={handlePop} totalPops={totalPops} />

        {/* Click instruction */}
        <p className="mt-6 text-text-gray text-sm md:text-base animate-pulse">
          Klik atau tekan $POPCAT untuk memulai!
        </p>
      </div>

      {/* Leaderboard Toggle - Bottom Center */}
      <Leaderboard
        data={leaderboardData}
        userCountry={userCountry}
      />

      {/* Achievement System */}
      <Achievement totalPops={totalPops} />

      {/* About Section */}
      <About />
    </div>
  )
}

export default App
