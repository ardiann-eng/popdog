const RefLinks = () => {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-4">
      {/* Twitter/X Link */}
      <a
        href="https://x.com/i/communities/1988971794511065254"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 bg-dark-card rounded-full flex items-center justify-center border-2 border-accent-cyan/30 hover:border-accent-cyan transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent-cyan/50">
          {/* X (Twitter) Icon */}
          <svg
            className="w-6 h-6 md:w-7 md:h-7 fill-text-gray group-hover:fill-accent-cyan transition-colors duration-300"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <span className="absolute -bottom-8 right-0 text-xs text-text-gray opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Twitter
        </span>
      </a>

      {/* Telegram Link */}
      <a
        href="https://t.me/popdogmemessol"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 bg-dark-card rounded-full flex items-center justify-center border-2 border-accent-purple/30 hover:border-accent-purple transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent-purple/50">
          {/* Telegram Icon */}
          <svg
            className="w-6 h-6 md:w-7 md:h-7 fill-text-gray group-hover:fill-accent-purple transition-colors duration-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
        </div>
        <span className="absolute -bottom-8 right-0 text-xs text-text-gray opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Telegram
        </span>
      </a>
    </div>
  )
}

export default RefLinks
