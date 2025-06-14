import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Made with love */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>in {currentYear}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Built with Next.js and love</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/y0shih"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right side - Quote */}
        <div className="flex-1 max-w-2xl text-right">
          <blockquote className="text-sm text-gray-400 italic leading-relaxed">
            &ldquo;What if changing the world was just about being here, by showing up no matter how many times we get told we don&apos;t belong, by staying true even when we&apos;re shamed into being false, by believing in ourselves even when we&apos;re told we&apos;re too different? And if we all held on to that, if we refuse to budge and fall in line, if we stood our ground for long enough, just maybe… The world can&apos;t help but change around us.&rdquo;
            <footer className="mt-2 text-xs text-gray-500">-Mr.Robot Season 4, episode 13</footer>
          </blockquote>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 