import { useState, useEffect } from 'react'

const Achievement = ({ totalPops }) => {
  const [achievements, setAchievements] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState(null)

  // Define all achievements
  const achievementList = [
    { id: 'first_pop', name: 'Beginner', description: 'First Click!', threshold: 1, icon: '🎯', badge: '🏅' },
    { id: 'warm_up', name: 'Warming Up', description: 'Got 1.000 pops', threshold: 1000, icon: '🔥', badge: '🥉' },
    { id: 'getting_serious', name: 'Getting Serious', description: 'Got 10.000 pops', threshold: 10000, icon: '💪', badge: '🥈' },
    { id: 'dedicated', name: 'High Dedication', description: 'Got 100.000 pops', threshold: 100000, icon: '⚡', badge: '🥇' },
    { id: 'pop_master', name: 'Pop Master', description: 'Got 1.000.000 pops', threshold: 1000000, icon: '👑', badge: '🏆' },
    { id: 'legend', name: 'Popcat Legend', description: 'Got 10.000.000 pops', threshold: 10000000, icon: '🌟', badge: '💎' },
  ]

  // Check for new achievements
  useEffect(() => {
    const unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]')

    // Check if any new achievements should be unlocked
    achievementList.forEach(achievement => {
      if (totalPops >= achievement.threshold && !unlockedAchievements.includes(achievement.id)) {
        // Unlock achievement
        const updatedAchievements = [...unlockedAchievements, achievement.id]
        localStorage.setItem('achievements', JSON.stringify(updatedAchievements))
        setAchievements(updatedAchievements)

        // Show notification
        setCurrentAchievement(achievement)
        setShowNotification(true)

        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false)
        }, 5000)
      }
    })

    setAchievements(unlockedAchievements)
  }, [totalPops])

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <>
      {/* Achievement Notification */}
      {showNotification && currentAchievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-accent-cyan to-accent-purple p-6 rounded-2xl shadow-2xl border-2 border-white/20 max-w-sm">
            <div className="text-center">
              <div className="text-6xl mb-3 animate-bounce">{currentAchievement.badge}</div>
              <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">{currentAchievement.icon}</span>
                <p className="text-xl font-semibold text-white">{currentAchievement.name}</p>
              </div>
              <p className="text-sm text-white/90 mb-3">{currentAchievement.description}</p>
              <div className="bg-white/20 rounded-lg px-4 py-2 inline-block">
                <p className="text-xs text-white/80">Total Pops: <span className="font-bold">{formatNumber(totalPops)}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Progress Bar - Bottom Right */}
      <div className="fixed bottom-20 right-4 z-30 hidden md:block">
        <div className="bg-dark-card/95 backdrop-blur-md rounded-2xl border-2 border-accent-cyan/30 p-4 shadow-xl max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg font-bold text-accent-cyan">Achievements</h3>
          </div>

          <div className="space-y-2">
            {achievementList.map(achievement => {
              const isUnlocked = achievements.includes(achievement.id)
              const progress = Math.min((totalPops / achievement.threshold) * 100, 100)

              return (
                <div key={achievement.id} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </span>
                      <p className={`text-xs font-semibold ${isUnlocked ? 'text-accent-cyan' : 'text-text-gray'}`}>
                        {achievement.name}
                      </p>
                    </div>
                    {isUnlocked && <span className="text-lg">{achievement.badge}</span>}
                  </div>

                  {/* Progress bar */}
                  {!isUnlocked && (
                    <div className="relative w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-cyan to-accent-purple transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}

                  {!isUnlocked && (
                    <p className="text-xs text-text-gray/60 mt-1">
                      {formatNumber(totalPops)} / {formatNumber(achievement.threshold)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Achievement
