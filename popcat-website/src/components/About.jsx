import { useState } from 'react'

const About = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating About Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-dark-card rounded-full flex items-center justify-center border-2 border-accent-cyan/30 hover:border-accent-cyan transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent-cyan/50 group"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 stroke-text-gray group-hover:stroke-accent-cyan transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </button>

      {/* About Modal/Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-dark-card max-w-2xl w-full rounded-3xl border-2 border-accent-cyan/30 shadow-2xl p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-bg/50 hover:bg-accent-cyan/20 transition-colors duration-300 flex items-center justify-center group"
            >
              <svg
                className="w-6 h-6 stroke-text-gray group-hover:stroke-accent-cyan transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Tentang $POPCAT
              </h2>

              <div className="text-6xl mb-6">😺</div>

              <div className="text-text-gray space-y-4 text-left">
                <p className="leading-relaxed">
                  <span className="font-semibold text-accent-cyan">$POPCAT</span> adalah meme internet yang berasal dari foto kucing bernama Oatmeal dengan mulut terbuka yang terlihat lucu dan menggemaskan.
                </p>

                <p className="leading-relaxed">
                  Game ini menjadi viral di seluruh dunia, di mana pemain dari berbagai negara berkompetisi untuk mengumpulkan klik terbanyak. Setiap klik mewakili suara "pop" yang dihasilkan oleh $POPCAT.
                </p>

                <p className="leading-relaxed">
                  <span className="font-semibold text-accent-purple">Collect your Pop!</span> adalah ekspresi bahasa Indonesia yang menggambarkan gerakan $POPCAT yang lucu dan menghibur.
                </p>

                <div className="pt-4 border-t border-accent-cyan/20 mt-6">
                  <p className="text-sm text-center italic">
                    Klik sebanyak-banyaknya dan jadilah $POPCAT Legend! 🏆
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default About
