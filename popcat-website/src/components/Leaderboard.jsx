import { useState, useEffect } from 'react'

const Leaderboard = ({ data, userCountry }) => {
  const [activeTab, setActiveTab] = useState('total') // 'total' or 'pps'
  const [isExpanded, setIsExpanded] = useState(false)

  // Format angka dengan separator koma (tanpa K/M/B)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Get country flag image URL
  const getFlagUrl = (countryCode) => {
    if (!countryCode) return null
    // Using flagcdn.com for high-quality flag images
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`
  }

  // Get country name from code
  const getCountryName = (code) => {
    const countries = {
      'ID': 'Indonesia',
      'US': 'United States',
      'BR': 'Brazil',
      'IN': 'India',
      'JP': 'Japan',
      'GB': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'IT': 'Italy',
      'CA': 'Canada',
      'AU': 'Australia',
      'ES': 'Spain',
      'MX': 'Mexico',
      'KR': 'South Korea',
      'NL': 'Netherlands',
      'PL': 'Poland',
      'SE': 'Sweden',
      'TR': 'Turkey',
      'TH': 'Thailand',
      'VN': 'Vietnam',
      'PH': 'Philippines',
      'MY': 'Malaysia',
      'SG': 'Singapore',
      'RU': 'Russia',
      'CN': 'China',
    }
    return countries[code] || code
  }

  // Sort data berdasarkan tab aktif
  const sortedData = [...data].sort((a, b) => {
    if (activeTab === 'total') {
      return b.totalPops - a.totalPops
    } else {
      return b.popsPerSecond - a.popsPerSecond
    }
  })

  // Get top 20
  const top20 = sortedData.slice(0, 20)

  // Preview mode: show only top 5
  const displayData = isExpanded ? top20 : top20.slice(0, 5)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md px-4 pb-4">
        <div className={`bg-dark-card/95 backdrop-blur-md rounded-t-3xl border-2 border-b-0 border-accent-cyan/30 shadow-2xl transition-all duration-500 ${
          isExpanded ? 'max-h-[80vh]' : 'max-h-[170px]'
        }`}>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 px-6 flex items-center justify-between hover:bg-dark-bg/30 transition-colors rounded-t-3xl group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Leaderboard
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-gray hidden md:block">
                {isExpanded ? 'Tutup' : 'Lihat Semua'}
              </span>
              <svg
                className={`w-6 h-6 text-accent-cyan transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>

          {/* Tabs */}
          <div className="px-6 pb-3">
            <div className="flex gap-2 bg-dark-bg/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('total')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeTab === 'total'
                    ? 'bg-accent-cyan text-dark-bg shadow-lg'
                    : 'text-text-gray hover:text-accent-cyan'
                }`}
              >
                Total Pops
              </button>
              <button
                onClick={() => setActiveTab('pps')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeTab === 'pps'
                    ? 'bg-accent-purple text-dark-bg shadow-lg'
                    : 'text-text-gray hover:text-accent-purple'
                }`}
              >
                Pops/Second
              </button>
            </div>
          </div>

      {/* Leaderboard List */}
      <div className={`px-6 pb-4 space-y-2 overflow-y-auto pr-2 custom-scrollbar ${
        isExpanded ? 'max-h-[calc(80vh-140px)]' : 'max-h-[120px]'
      }`}>
        {displayData.length === 0 ? (
          <div className="text-center py-12 text-text-gray">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-sm">Loading leaderboard...</p>
          </div>
        ) : (
          displayData.map((country, index) => {
            const isUserCountry = country.code === userCountry
            const rank = index + 1
            const isTop3 = rank <= 3

            return (
              <div
                key={country.code}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isUserCountry
                    ? 'bg-accent-cyan/20 border-2 border-accent-cyan shadow-lg'
                    : 'bg-dark-bg/50 border border-accent-cyan/10 hover:bg-dark-bg/80'
                }`}
              >
                {/* Rank */}
                <div className={`flex-shrink-0 w-10 text-center font-bold ${
                  isTop3 ? 'text-2xl' : 'text-base'
                }`}>
                  {rank === 1 && '🥇'}
                  {rank === 2 && '🥈'}
                  {rank === 3 && '🥉'}
                  {rank > 3 && <span className="text-text-gray text-sm">{rank}</span>}
                </div>

                {/* Logo & Country */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    {/* Country Flag - Larger */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-dark-bg flex items-center justify-center border-2 border-accent-cyan/20 overflow-hidden">
                      <img
                        src={getFlagUrl(country.code)}
                        alt={`${country.code} flag`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to country code text if image fails
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = `<span class="text-xs font-bold text-accent-cyan">${country.code}</span>`
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm md:text-base truncate ${
                        isUserCountry ? 'text-accent-cyan' : 'text-text-gray'
                      }`}>
                        {getCountryName(country.code)}
                      </p>
                      <p className="text-xs text-text-gray/60">{country.code}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right flex-shrink-0">
                  {activeTab === 'total' ? (
                    <>
                      <p className={`font-bold text-sm md:text-base ${
                        isUserCountry ? 'text-accent-cyan' : 'text-accent-purple'
                      }`}>
                        {formatNumber(country.totalPops)}
                      </p>
                      <p className="text-xs text-text-gray/60">pops</p>
                    </>
                  ) : (
                    <>
                      <p className={`font-bold text-sm md:text-base ${
                        isUserCountry ? 'text-accent-cyan' : 'text-accent-purple'
                      }`}>
                        {formatNumber(country.popsPerSecond)}
                      </p>
                      <p className="text-xs text-text-gray/60">pops/s</p>
                    </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Footer Info */}
      {isExpanded && (
        <div className="px-6 pb-3 pt-2 border-t border-accent-cyan/20">
          <p className="text-xs text-text-gray/60 text-center">
            Real-time data • Updated every second
          </p>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
