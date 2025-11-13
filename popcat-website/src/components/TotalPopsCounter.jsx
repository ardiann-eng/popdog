const TotalPopsCounter = ({ totalPops, globalPops, userCountry }) => {
  // Format angka dengan separator ribuan (semua format pakai koma)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="text-center px-4">
      {/* Global Stats */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
        {/* Global Total Pops */}
        <div className="bg-dark-card px-6 py-3 rounded-2xl border-2 border-accent-cyan/30 shadow-lg flex-1 min-w-[200px]">
          <p className="text-text-gray text-xs uppercase tracking-wider mb-1">
            🌍 Global Pops
          </p>
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            {formatNumber(globalPops)}
          </p>
        </div>

        {/* Your Pops */}
        <div className="bg-dark-card px-6 py-3 rounded-2xl border-2 border-accent-purple/30 shadow-lg flex-1 min-w-[200px]">
          <p className="text-text-gray text-xs uppercase tracking-wider mb-1">
            {userCountry ? `${userCountry} Your Pops` : 'Your Pops'}
          </p>
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
            {formatNumber(totalPops)}
          </p>
        </div>
      </div>

      {/* Fun messages based on pops count */}
      <div className="mt-3 text-text-gray text-xs md:text-sm italic">
        {totalPops === 0 && "Mulai klik sekarang!"}
        {totalPops > 0 && totalPops < 10 && "Keep going!"}
        {totalPops >= 10 && totalPops < 50 && "Niceee!"}
        {totalPops >= 50 && totalPops < 100 && "Wow, impressive!"}
        {totalPops >= 100 && totalPops < 500 && "Legend in the making!"}
        {totalPops >= 500 && totalPops < 1000 && "$POPCAT Master! 🔥"}
        {totalPops >= 1000 && "ABSOLUTE LEGEND! 🏆"}
      </div>
    </div>
  )
}

export default TotalPopsCounter
