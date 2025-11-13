import { useState } from 'react'
import closedImage from '../image/closed.png'
import openImage from '../image/open.png'

const POPCATImage = ({ isPopping, onPop, totalPops }) => {
  const [floatingNumbers, setFloatingNumbers] = useState([])

  const handleClick = (e) => {
    // Call the original onPop handler
    onPop()

    // Create floating +1 animation
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newNumber = {
      id: Date.now() + Math.random(),
      x: x,
      y: y
    }

    setFloatingNumbers(prev => [...prev, newNumber])

    // Remove the number after animation completes
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== newNumber.id))
    }, 1000)
  }

  return (
    <div
      className="cursor-pointer select-none transition-all duration-150 ease-out hover:scale-110 active:scale-90 hover:rotate-1"
      onClick={handleClick}
      onTouchStart={(e) => {
        handleClick(e)
      }}
    >
      <div className={`relative w-64 h-64 md:w-96 md:h-96 ${isPopping ? 'animate-pop' : ''}`}>
        {/* Glow effect saat diklik */}
        {isPopping && (
          <div className="absolute inset-0 bg-accent-cyan rounded-full blur-2xl opacity-50 animate-ping"></div>
        )}

        {/* $POPCAT Image Container */}
        <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-dark-card shadow-2xl border-2 border-accent-cyan/30">
          {/* Real POPCAT Image */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark-bg">
            <img
              src={isPopping ? openImage : closedImage}
              alt="Popcat"
              className={`w-full h-full object-contain transition-all duration-100 ${isPopping ? 'animate-bounce' : ''}`}
              draggable="false"
            />
          </div>
        </div>

        {/* Click ripple effect */}
        {isPopping && (
          <div className="absolute inset-0 rounded-3xl border-4 border-accent-cyan animate-ping opacity-75"></div>
        )}

        {/* Floating +1 numbers */}
        {floatingNumbers.map(num => (
          <div
            key={num.id}
            className="absolute pointer-events-none text-3xl font-bold text-accent-cyan animate-float-up"
            style={{
              left: `${num.x}px`,
              top: `${num.y}px`,
            }}
          >
            +1
          </div>
        ))}
      </div>
    </div>
  )
}

export default POPCATImage
